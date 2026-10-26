import { requestUrl } from "obsidian";
import { apiBookName, BookInfo } from "../books";
import { t } from "../i18n";
import { cleanText, Verse } from "../text";

/** Parses the NET Bible API JSON ([{ bookname, chapter, verse, text }]) for one chapter. */
export function parseNetJson(rows: unknown, chapter: number): Verse[] {
	if (!Array.isArray(rows)) return [];
	return (rows as Record<string, unknown>[])
		.filter((r) => parseInt(String(r.chapter), 10) === chapter)
		.map((r) => ({ verse: parseInt(String(r.verse), 10), text: cleanText(typeof r.text === "string" ? r.text : "") }))
		.filter((v) => v.verse && v.text);
}

/** One chapter from the NET Bible's official API (labs.bible.org). */
export async function fetchNetChapter(book: BookInfo, chapter: number): Promise<Verse[]> {
	const passage = `${apiBookName(book)} ${chapter}`;
	const url = `https://labs.bible.org/api/?passage=${encodeURIComponent(passage)}&type=json&formatting=plain`;
	const res = await requestUrl({ url, throw: false });
	if (res.status !== 200) throw new Error(t.errHttp("NET Bible", res.status));
	let rows: unknown;
	try {
		rows = res.json;
	} catch {
		throw new Error(t.errResponse("NET Bible"));
	}
	return parseNetJson(rows, chapter);
}
