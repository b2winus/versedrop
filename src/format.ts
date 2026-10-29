import { BookInfo } from "./books";
import { BibleReference, passageLabel, versesLabel } from "./reference";
import { accordanceUrl, logosUrl } from "./links";
import { isCopyrighted, noticeFor, Translation, Verse } from "./sources";

export type OutputStyle = "callout" | "quote" | "plain";
export type VerseNumberStyle = "none" | "plain" | "sup";
export type AppLinks = "none" | "logos" | "accordance" | "both";
export type CitationMode = "copyrighted" | "all" | "off";

export interface FormatOptions {
	style: OutputStyle;
	calloutType: string;
	group: boolean;
	bookName: "full" | "short";
	verseNumbers: VerseNumberStyle;
	versePerLine: boolean;
	headerTemplate: string;
	appLinks: AppLinks;
	/** Logos version for ref.ly links, e.g. ESV (empty = user's preferred Bible) */
	logosVersion: string;
	/** Accordance module for accord:// links, e.g. ESVS (empty = default text) */
	accordanceModule: string;
	/** When to add a copyright notice under quotations */
	citations: CitationMode;
}

export interface Passage {
	translation: Translation;
	verses: Verse[];
}

/**
 * Book name in the translation's language. Korean, Chinese and Japanese use Versedrop's tables;
 * other languages use the translation's own book names when it has them (HelloAO), else English.
 * Greek and Hebrew texts use English names.
 */
export function bookLabel(book: BookInfo, lang: string, style: "full" | "short", script?: string, names?: Record<string, string>): string {
	const full = style === "full";
	const own = lang !== "en" && lang !== "grc" && lang !== "he" ? names?.[book.usfm] : undefined;
	switch (lang) {
		case "ko":
			return full ? book.ko : book.koShort;
		case "zh":
			return script === "traditional" ? (full ? book.zhT : book.zhTShort) : full ? book.zh : book.zhShort;
		case "ja":
			return full ? book.ja : book.jaShort;
		default:
			return own ?? (full ? book.en : book.enShort);
	}
}

export function refLabel(ref: BibleReference, lang: string, bookName: "full" | "short", script?: string, names?: Record<string, string>): string {
	const name = bookLabel(ref.book, lang, bookName, script, names);
	const cjk = lang === "ko" || lang === "zh" || lang === "ja";
	const sep = cjk && bookName === "short" ? "" : " ";
	return `${name}${sep}${passageLabel(ref)}`;
}

function header(ref: BibleReference, tr: Translation, o: FormatOptions): string {
	const book = bookLabel(ref.book, tr.lang, o.bookName, tr.script, tr.bookNames);
	const vars: Record<string, string> = {
		ref: refLabel(ref, tr.lang, o.bookName, tr.script, tr.bookNames),
		book,
		chapter: ref.span ? `${ref.chapter}-${ref.span.endChapter}` : String(ref.chapter),
		verses: ref.span ? passageLabel(ref).replace(/^\d+:?/, "") : versesLabel(ref.ranges),
		version: tr.name,
		abbr: tr.linkAbbr && tr.link ? `[${tr.abbr}](${tr.link})` : tr.abbr,
	};
	return o.headerTemplate.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m).trim();
}

/** " · [Logos](…) · [Accordance](…)" or "" depending on settings. */
function appLinks(ref: BibleReference, o: FormatOptions, tr?: Translation): string {
	const out: string[] = [];
	if (o.appLinks === "logos" || o.appLinks === "both") out.push(`[Logos](${logosUrl(ref, o.logosVersion)})`);
	if (o.appLinks === "accordance" || o.appLinks === "both") {
		const module = tr?.source === "accordance" && tr.module ? tr.module : o.accordanceModule;
		out.push(`[Accordance](${accordanceUrl(ref, module)})`);
	}
	return out.length ? ` · ${out.join(" · ")}` : "";
}

/** The copyright notice line for a translation, or "" when none should be shown. */
export function noticeLine(tr: Translation, o: FormatOptions): string {
	const n = noticeFor(tr);
	const show = tr.noticeRequired || (o.citations === "all") || (o.citations === "copyrighted" && isCopyrighted(tr));
	if (!show) return "";
	if (!n) return o.citations === "all" ? `*${tr.name} — public domain*` : "";
	const host = n.link ? n.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
	return `*${n.text}*${n.link ? ` [${host}](${n.link})` : ""}`;
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function verseNo(n: number, style: VerseNumberStyle): string {
	if (style === "none") return "";
	if (style === "sup") return String(n).replace(/\d/g, (d) => SUP[+d]);
	return `${n} `;
}

/** Turns verses into lines (or a single paragraph), marking gaps between non-contiguous ranges with an ellipsis. */
function bodyLines(verses: Verse[], o: FormatOptions): string[] {
	const pieces: string[] = [];
	let prev = -1;
	let prevChapter = verses[0]?.chapter;
	for (const v of verses) {
		const newChapter = v.chapter !== undefined && v.chapter !== prevChapter;
		if (prev !== -1 && (newChapter ? v.verse !== 1 : v.verse !== prev + 1)) pieces.push("…");
		// A new chapter is marked "4:1" (plain numbers) or with a bold chapter number.
		const no = newChapter && o.verseNumbers === "plain" ? `${v.chapter}:${v.verse} ` : verseNo(v.verse, o.verseNumbers);
		const mark = newChapter && o.verseNumbers !== "plain" ? `**${v.chapter}** ` : "";
		pieces.push(`${mark}${no}${v.text}`);
		prev = v.verse;
		prevChapter = v.chapter;
	}
	return o.versePerLine ? pieces : [pieces.join(" ")];
}

function wrap(headerText: string, links: string, lines: string[], notices: string[], o: FormatOptions): string {
	const q = (l: string) => (l ? `> ${l}` : ">");
	const tail = notices.length ? ["", ...notices] : [];
	if (o.style === "callout") {
		const type = o.calloutType.trim() || "quote";
		return [`> [!${type}] ${headerText}${links}`, ...lines.map(q), ...tail.map(q)].join("\n");
	}
	if (o.style === "quote") {
		return [...lines.map(q), `> — ${headerText}${links}`, ...tail.map(q)].join("\n");
	}
	const body = [`**${headerText}**${links}`, ...lines].join(o.versePerLine ? "  \n" : "\n");
	return notices.length ? `${body}\n\n${notices.join("  \n")}` : body;
}

export function formatPassages(ref: BibleReference, passages: Passage[], o: FormatOptions): string {
	const usable = passages.filter((p) => p.verses.length);
	if (!usable.length) return "";

	if (!o.group || usable.length === 1) {
		return usable
			.map((p) => {
				const n = noticeLine(p.translation, o);
				return wrap(header(ref, p.translation, o), appLinks(ref, o, p.translation), bodyLines(p.verses, o), n ? [n] : [], o);
			})
			.join("\n\n");
	}

	// Grouped: one block titled by the reference (in each language used), each translation as a labelled section.
	const title = [...new Set(usable.map((p) => refLabel(ref, p.translation.lang, o.bookName, p.translation.script, p.translation.bookNames)))].join(" · ");
	const lines: string[] = [];
	usable.forEach((p, i) => {
		if (i > 0) lines.push("");
		const tr = p.translation;
		lines.push(tr.linkAbbr && tr.link ? `**${tr.name}** ([${tr.abbr}](${tr.link}))` : `**${tr.name}**`);
		lines.push(...bodyLines(p.verses, o));
	});
	const accTr = usable.find((p) => p.translation.source === "accordance")?.translation;
	const links = appLinks(ref, o, accTr);
	const notices = [...new Set(usable.map((p) => noticeLine(p.translation, o)).filter(Boolean))];
	if (o.style === "plain") {
		const body = [`**${title}**${links}`, "", ...lines].join("\n");
		return notices.length ? `${body}\n\n${notices.join("  \n")}` : body;
	}
	return wrap(title, links, lines, notices, o);
}
