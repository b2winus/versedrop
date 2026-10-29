import { BookInfo, findBook } from "./books";
import { t } from "./i18n";

export interface VerseRange {
	start: number;
	end: number;
}

export interface BibleReference {
	book: BookInfo;
	chapter: number;
	/** Empty means the whole chapter. */
	ranges: VerseRange[];
	/**
	 * A passage that crosses chapters: from chapter:startVerse to endChapter:endVerse
	 * (both verses unset = whole chapters, e.g. 창 1-2). `ranges` is empty then.
	 */
	span?: { endChapter: number; startVerse?: number; endVerse?: number };
}

/** Chapters per book (1–66, then 67–75 deuterocanon), generous where versifications differ (Joel, Malachi, Esther, Daniel). */
const CHAPTERS = [0, 50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 16, 42, 150, 31, 12, 8, 66, 52, 5, 48, 14, 14, 4, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22,
	14, 16, 16, 19, 51, 6, 14, 16, 15];

/** Most chapters one reference may cover (each chapter is a separate download). */
export const MAX_SPAN_CHAPTERS = 10;

/** One chapter's worth of a reference. */
export interface ChapterPart {
	chapter: number;
	ranges: VerseRange[];
}

/** Splits a reference into the chapters it touches, each with its own verse ranges. */
export function chapterParts(ref: BibleReference): ChapterPart[] {
	const span = ref.span;
	if (!span) return [{ chapter: ref.chapter, ranges: ref.ranges }];
	const parts: ChapterPart[] = [];
	for (let c = ref.chapter; c <= span.endChapter; c++) {
		const ranges: VerseRange[] = [];
		if (c === ref.chapter && span.startVerse && span.startVerse > 1) ranges.push({ start: span.startVerse, end: 999 });
		if (c === span.endChapter && span.endVerse) {
			if (ranges.length) ranges[0].end = span.endVerse;
			else ranges.push({ start: 1, end: span.endVerse });
		}
		parts.push({ chapter: c, ranges });
	}
	return parts;
}

export class RefParseError extends Error {}

/**
 * Parses references such as:
 *   요 3:16 · 요3:16-18 · 요한복음 3장 16절 · 고전 13:4-7 · 시 23 · 롬 8:28, 31-39
 *   John 3:16 · Jn 3.16 · 1 Cor 13:4-7 · Ps 23 · Rom 8:28,31-39
 *   约翰福音 3:16 · 约3:16 · 約翰福音3章16節 · ヨハネによる福音書3:16 · ヨハ3:16
 */
export function parseReference(input: string): BibleReference {
	let s = input
		.trim()
		.replace(/[：]/g, ":")
		.replace(/[~～–—]/g, "-")
		.replace(/[，、]/g, ",")
		.replace(/(\d)\s*[장편章篇]\s*/g, "$1:")
		.replace(/\s*[절節节]/g, "")
		.replace(/:\s*$/, "")
		.replace(/:\s*-/g, "-");

	const span = parseSpan(s);
	if (span) return span;

	const m = s.match(/^([1-3]?\s*[^\d\s:,-][^\d:]*?)\s*(\d+)\s*(?:[:.]\s*([\d\s,-]+))?$/);
	if (!m) throw new RefParseError(t.errFormat);

	const book = findBook(m[1]);
	if (!book) throw new RefParseError(t.errBook(m[1].trim()));

	const chapter = parseInt(m[2], 10);
	if (!chapter) throw new RefParseError(t.errChapter);

	const ranges: VerseRange[] = [];
	if (m[3]) {
		for (const part of m[3].split(",")) {
			const p = part.trim();
			if (!p) continue;
			const r = p.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
			if (!r) throw new RefParseError(t.errVerse(p));
			const start = parseInt(r[1], 10);
			const end = r[2] ? parseInt(r[2], 10) : start;
			if (!start || end < start) throw new RefParseError(t.errRange(p));
			ranges.push({ start, end });
		}
	}
	return { book, chapter, ranges };
}

/**
 * Cross-chapter forms: "요 3:16-4:3", "창 1-2", "창 1-2:3" (= 1:1-2:3).
 * Returns null for anything else so the single-chapter parser handles it ("요 3:16-18").
 */
function parseSpan(s: string): BibleReference | null {
	const m = s.match(/^([1-3]?\s*[^\d\s:,-][^\d:]*?)\s*(\d+)\s*(?:[:.]\s*(\d+))?\s*-\s*(\d+)\s*(?:[:.]\s*(\d+))?$/);
	if (!m) return null;
	const [, bookText, c1, v1, c2, v2] = m;
	if (v1 && !v2) return null; // "3:16-18" is a verse range within one chapter
	const book = findBook(bookText);
	if (!book) throw new RefParseError(t.errBook(bookText.trim()));
	const chapter = parseInt(c1, 10);
	const last = CHAPTERS[book.num] ?? 150;
	if (chapter > last) throw new RefParseError(t.errChapter);
	let endChapter = parseInt(c2, 10);
	let endVerse = v2 ? parseInt(v2, 10) : undefined;
	if (endChapter > last) {
		// "창 49-60" → through the end of the book
		endChapter = last;
		endVerse = undefined;
	}
	const startVerse = v1 ? parseInt(v1, 10) : endVerse ? 1 : undefined;
	const label = s.slice(bookText.length).trim();
	if (!chapter || !endChapter || endChapter < chapter || startVerse === 0 || endVerse === 0) throw new RefParseError(t.errRange(label));
	if (endChapter === chapter) {
		if (startVerse === undefined) return { book, chapter, ranges: [] };
		if ((endVerse ?? 0) < startVerse) throw new RefParseError(t.errRange(label));
		return { book, chapter, ranges: [{ start: startVerse, end: endVerse as number }] };
	}
	if (endChapter - chapter + 1 > MAX_SPAN_CHAPTERS) throw new RefParseError(t.errTooLong(MAX_SPAN_CHAPTERS));
	return { book, chapter, ranges: [], span: { endChapter, startVerse, endVerse } };
}

/** "3:16, 18" · "3" · "3:16-4:3" · "1-2" — everything after the book name. */
export function passageLabel(ref: BibleReference): string {
	const sp = ref.span;
	if (!sp) return `${ref.chapter}${ref.ranges.length ? `:${versesLabel(ref.ranges)}` : ""}`;
	if (sp.startVerse === undefined) return `${ref.chapter}-${sp.endChapter}`;
	return `${ref.chapter}:${sp.startVerse}-${sp.endChapter}:${sp.endVerse ?? ""}`.replace(/:$/, "");
}

export function versesLabel(ranges: VerseRange[]): string {
	return ranges.map((r) => (r.start === r.end ? `${r.start}` : `${r.start}-${r.end}`)).join(", ");
}

export function inRanges(verse: number, ranges: VerseRange[]): boolean {
	if (ranges.length === 0) return true;
	return ranges.some((r) => verse >= r.start && verse <= r.end);
}
