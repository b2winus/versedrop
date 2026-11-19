/** Verse text helpers shared by every source. */
import { Converter } from "opencc-js/t2cn";

let t2s: ((s: string) => string) | undefined;
/** Traditional → Simplified Chinese (OpenCC, character and phrase level). */
export function toSimplified(s: string): string {
	t2s ??= Converter({ from: "t", to: "cn" });
	return t2s(s);
}

export interface Verse {
	verse: number;
	text: string;
	/** Set on every verse when a passage crosses chapters */
	chapter?: number;
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** Strips Strong's numbers, footnotes, section headings and HTML from verse text. */
export function cleanText(raw: string): string {
	return raw
		.replace(/<S>[^<]*<\/S>/gi, "")
		.replace(/<sup>[\s\S]*?<\/sup>/gi, "")
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<[^>]*>/g, "")
		.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
			if (e[0] === "#") {
				const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
				return Number.isFinite(code) ? String.fromCodePoint(code) : m;
			}
			return ENTITIES[e.toLowerCase()] ?? m;
		})
		.replace(/\s+/g, " ")
		.replace(/\s+([,.;:!?])/g, "$1")
		.trim();
}
