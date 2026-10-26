import { requestUrl } from "obsidian";
import { apiBookName } from "../books";
import { t } from "../i18n";
import { BibleReference, inRanges } from "../reference";
import { cleanText, Verse } from "../text";

/** Parses ESV API plain text ("[16] For God so loved … [17] For God did not …") into verses. */
export function parseEsvText(passages: string[]): Verse[] {
	const out: Verse[] = [];
	for (const p of passages) {
		const parts = p.split(/\[(\d+)\]/);
		for (let i = 1; i < parts.length; i += 2) {
			const verse = parseInt(parts[i], 10);
			const text = cleanText(parts[i + 1] ?? "").replace(/\s*\(ESV\)\s*$/, "");
			if (verse && text) out.push({ verse, text });
		}
	}
	return out;
}

/** Crossway allows at most 500 ESV verses to be stored locally. */
const ESV_CACHE_LIMIT = 500;

/** ESV API (api.esv.org) with the user's own key; the cache stays within Crossway's 500-verse limit. */
export class EsvClient {
	private cache = new Map<string, Verse[]>();
	private cached = 0;

	constructor(private key: () => string) {}

	clear(): void {
		this.cache.clear();
		this.cached = 0;
	}

	async fetch(ref: BibleReference): Promise<Verse[]> {
		const key = this.key().trim();
		if (!key) throw new Error(t.esvNoKey);
		const book = apiBookName(ref.book);
		const q = ref.ranges.length
			? ref.ranges.map((r) => `${book} ${ref.chapter}:${r.start}-${r.end}`).join("; ")
			: `${book} ${ref.chapter}`;
		const cached = this.cache.get(q);
		if (cached) return cached;

		const params = new URLSearchParams({
			q,
			"include-passage-references": "false",
			"include-verse-numbers": "true",
			"include-first-verse-numbers": "true",
			"include-footnotes": "false",
			"include-headings": "false",
			"include-short-copyright": "false",
			"include-copyright": "false",
			"include-selahs": "true",
			"indent-paragraphs": "0",
			"indent-poetry": "false",
		});
		const res = await requestUrl({
			url: `https://api.esv.org/v3/passage/text/?${params.toString()}`,
			headers: { Authorization: `Token ${key}` },
			throw: false,
		});
		if (res.status === 401 || res.status === 403) throw new Error(t.esvBadKey);
		if (res.status === 429) throw new Error(t.esvThrottled);
		if (res.status !== 200) throw new Error(t.errHttp("ESV API", res.status));
		const data = res.json as { passages?: string[] };
		const verses = parseEsvText(data.passages ?? []).filter((v) => inRanges(v.verse, ref.ranges));

		if (this.cached + verses.length > ESV_CACHE_LIMIT) {
			this.cache.clear();
			this.cached = 0;
		}
		if (verses.length) {
			this.cache.set(q, verses);
			this.cached += verses.length;
		}
		return verses;
	}
}
