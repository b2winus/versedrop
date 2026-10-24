import { Platform } from "obsidian";
import { t } from "./i18n";

/**
 * Bridge to the Accordance Bible app on macOS — without running any shell command.
 *
 * Accordance answers the Apple event «event AccdTxRf» {module, reference, citation} with the
 * text of a reference in one of the user's modules. Versedrop can't send Apple events itself,
 * so the user creates a small macOS Shortcut ("Versedrop Accordance") that runs the AppleScript
 * below. Versedrop starts it through the `shortcuts://` URL scheme with an x-callback-url, and
 * the Shortcut hands the text back through `obsidian://versedrop-accordance`.
 */

export const DEFAULT_SHORTCUT_NAME = "Versedrop Accordance";
export const CALLBACK_ACTION = "versedrop-accordance";

/** The AppleScript users paste into the Shortcut's "Run AppleScript" action. */
export const SHORTCUT_APPLESCRIPT = `on run {input, parameters}
	-- Request from Versedrop: "module|chapter reference|verses" (verses: 16,17,18 or all)
	set oldDelims to AppleScript's text item delimiters
	set AppleScript's text item delimiters to "|"
	set req to text items of ((item 1 of input) as text)
	set AppleScript's text item delimiters to oldDelims
	set moduleName to item 1 of req
	set chapterRef to item 2 of req
	set verseList to item 3 of req
	set out to ""
	if verseList is "all" then
		set prevText to ""
		repeat with v from 1 to 200
			tell application "Accordance" to set r to «event AccdTxRf» {moduleName, chapterRef & ":" & v, false}
			if r is "" or r starts with "Err" or r is prevText then exit repeat
			set out to out & v & tab & r & linefeed
			set prevText to r
		end repeat
	else
		set AppleScript's text item delimiters to ","
		set vs to text items of verseList
		set AppleScript's text item delimiters to oldDelims
		repeat with v in vs
			tell application "Accordance" to set r to «event AccdTxRf» {moduleName, chapterRef & ":" & (v as text), false}
			set out to out & (v as text) & tab & r & linefeed
		end repeat
	end if
	return out
end run
`;

export function accordanceAvailable(): boolean {
	return Platform.isDesktopApp && Platform.isMacOS;
}

const RECORD_SEPARATOR = String.fromCharCode(30);

export interface RawVerse {
	verse: number;
	text: string;
}

/** Parses the Shortcut output ("16<TAB>text" per line); drops verses Accordance reported as errors. */
export function parseAccordanceOutput(out: string): { verses: RawVerse[]; errors: number } {
	const verses: RawVerse[] = [];
	let errors = 0;
	// Records are separated by a newline before "<number><TAB>", or by the ASCII record separator.
	const records = out.split(RECORD_SEPARATOR).flatMap((part) => part.split(/\r?\n(?=\s*\d+\t)/));
	for (const rec of records) {
		const tab = rec.indexOf("\t");
		if (tab < 0) continue;
		const verse = parseInt(rec.slice(0, tab).trim(), 10);
		let text = rec.slice(tab + 1).trim();
		if (!verse) continue;
		if (!text || text.startsWith("Err")) {
			errors++;
			continue;
		}
		// Some modules echo the verse number or reference in front of the text.
		text = text.replace(new RegExp(`^(?:[^\\d\\s]*\\s?\\d+:)?${verse}\\s+`), "");
		verses.push({ verse, text });
	}
	return { verses, errors };
}

interface Pending {
	resolve: (out: string) => void;
	reject: (err: Error) => void;
	timer: number;
}

/**
 * Runs the user's Shortcut and waits for its x-callback.
 * Requests run one at a time, because Shortcuts handles one URL-launched run at a time.
 */
export class AccordanceBridge {
	private pending = new Map<string, Pending>();
	private queue: Promise<unknown> = Promise.resolve();

	constructor(private shortcutName: () => string) {}

	/** Called by the obsidian://versedrop-accordance protocol handler. */
	handleCallback(params: Record<string, string>): void {
		const p = this.pending.get(params.id ?? "");
		if (!p) return;
		this.pending.delete(params.id);
		window.clearTimeout(p.timer);
		if (params.status === "ok") p.resolve(params.result ?? "");
		else if (params.status === "cancel") p.reject(new Error(t.accCancelled));
		else p.reject(new Error(`${t.accFailed} ${params.errorMessage ?? ""}`.trim()));
	}

	/**
	 * @param chapterRef English reference without verse, e.g. "1 Corinthians 13"
	 * @param verses     verse numbers to fetch, or "all" for the whole chapter
	 */
	fetch(module: string, chapterRef: string, verses: number[] | "all"): Promise<RawVerse[]> {
		const run = this.queue.then(() => this.fetchNow(module, chapterRef, verses));
		this.queue = run.catch(() => undefined);
		return run;
	}

	private async fetchNow(module: string, chapterRef: string, verses: number[] | "all"): Promise<RawVerse[]> {
		if (!accordanceAvailable()) throw new Error(t.accMacOnly);
		if (!module.trim()) throw new Error(t.accNoModule);

		const request = [module.trim(), chapterRef, verses === "all" ? "all" : verses.join(",")].join("|");
		const output = await this.runShortcut(request);
		const { verses: result, errors } = parseAccordanceOutput(output);
		if (!result.length && errors) throw new Error(t.accBadModule(module.trim()));
		if (!result.length && !output.trim()) throw new Error(t.accEmpty);
		return result;
	}

	private runShortcut(input: string): Promise<string> {
		const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
		const back = (status: string) => `obsidian://${CALLBACK_ACTION}?id=${id}&status=${status}`;
		const url =
			"shortcuts://x-callback-url/run-shortcut" +
			`?name=${encodeURIComponent(this.shortcutName().trim() || DEFAULT_SHORTCUT_NAME)}` +
			`&input=text&text=${encodeURIComponent(input)}` +
			`&x-success=${encodeURIComponent(back("ok"))}` +
			`&x-error=${encodeURIComponent(back("error"))}` +
			`&x-cancel=${encodeURIComponent(back("cancel"))}`;

		return new Promise<string>((resolve, reject) => {
			const timer = window.setTimeout(() => {
				this.pending.delete(id);
				reject(new Error(t.accTimeout));
			}, 45000);
			this.pending.set(id, { resolve, reject, timer });
			window.open(url);
		});
	}
}
