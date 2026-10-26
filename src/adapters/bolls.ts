import { requestUrl } from "obsidian";
import { t } from "../i18n";
import { cleanText, Verse } from "../text";

/** One chapter from bolls.life (https://bolls.life). Book numbers are 1–66. */
export async function fetchBollsChapter(code: string, book: number, chapter: number): Promise<Verse[]> {
	if (!code) throw new Error(t.errNoCode);
	const url = `https://bolls.life/get-text/${encodeURIComponent(code)}/${book}/${chapter}/`;
	const res = await requestUrl({ url, throw: false });
	if (res.status !== 200) throw new Error(t.errHttp("bolls.life", res.status));
	const rows = res.json as { verse: number; text: string }[];
	if (!Array.isArray(rows)) throw new Error(t.errResponse("bolls.life"));
	return rows.map((r) => ({ verse: r.verse, text: cleanText(r.text ?? "") }));
}
