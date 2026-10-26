import { requestUrl } from "obsidian";
import { BOOKS, BookInfo } from "../books";
import { t } from "../i18n";
import type { Translation } from "../sources";
import { cleanText, Verse } from "../text";

/**
 * Free Use Bible API by AO Lab (https://bible.helloao.org).
 * No key; 1,000+ freely licensed translations served as static JSON.
 * Each translation carries its own licence notice, which Versedrop shows as the citation.
 */
const BASE = "https://bible.helloao.org";

/** One entry of /api/available_translations.json */
export interface HelloAoTranslation {
	id: string;
	name: string;
	englishName: string;
	shortName?: string;
	/** ISO 639-3 code, e.g. deu, spa, kor */
	language: string;
	languageName?: string;
	languageEnglishName?: string;
	textDirection: "ltr" | "rtl";
	website: string;
	licenseUrl: string;
	licenseNotice?: string | null;
	numberOfBooks: number;
}

interface HelloAoBook {
	/** USFM code */
	id: string;
	name: string;
	commonName: string;
}

/** ISO 639-3 → the codes Versedrop uses for its language buttons. Others keep their 3-letter code. */
const LANG_CODES: Record<string, string> = {
	kor: "ko",
	eng: "en",
	zho: "zh",
	cmn: "zh",
	jpn: "ja",
	grc: "grc",
	hbo: "he",
	heb: "he",
	deu: "de",
	spa: "es",
	fra: "fr",
	por: "pt",
	rus: "ru",
	ita: "it",
	nld: "nl",
	lat: "la",
};

export function toLang(iso3: string): string {
	const code = iso3.toLowerCase();
	return LANG_CODES[code] ?? code;
}

async function getJson(url: string): Promise<unknown> {
	const res = await requestUrl({ url, throw: false });
	if (res.status === 404) return null;
	if (res.status !== 200) throw new Error(t.errHttp("HelloAO", res.status));
	try {
		return JSON.parse(res.text) as unknown;
	} catch {
		throw new Error(t.errResponse("HelloAO"));
	}
}

let catalog: Promise<HelloAoTranslation[]> | null = null;

/** The list of every translation (≈1,300 entries), fetched once per session. */
export function loadCatalog(): Promise<HelloAoTranslation[]> {
	if (!catalog) {
		catalog = getJson(`${BASE}/api/available_translations.json`)
			.then((body) => (body as { translations?: HelloAoTranslation[] } | null)?.translations ?? [])
			.catch((e: unknown) => {
				catalog = null; // try again next time
				throw e instanceof Error ? e : new Error(String(e));
			});
	}
	return catalog;
}

async function loadBooks(id: string): Promise<HelloAoBook[]> {
	const body = (await getJson(`${BASE}/api/${encodeURIComponent(id)}/books.json`)) as { books?: HelloAoBook[] } | null;
	return body?.books ?? [];
}

/**
 * Text of one verse: plain strings and formatted text joined as they are (segments carry their own
 * spacing, e.g. "said, " + "“I am" + "”"); line breaks become spaces; footnote markers are dropped.
 */
export function verseText(content: unknown[]): string {
	const parts: string[] = [];
	for (const item of content) {
		if (typeof item === "string") parts.push(item);
		else if (item && typeof item === "object") {
			const o = item as Record<string, unknown>;
			if (typeof o.text === "string") parts.push(o.text);
			else if (o.lineBreak === true) parts.push(" ");
		}
	}
	return parts.join("");
}

/** Verses from a chapter response; a verse split by a heading or poem line is joined back together. */
export function parseHelloAoChapter(body: unknown): Verse[] {
	const content = (body as { chapter?: { content?: unknown[] } } | null)?.chapter?.content;
	if (!Array.isArray(content)) return [];
	const byNumber = new Map<number, string[]>();
	for (const item of content) {
		const o = item as { type?: string; number?: number; content?: unknown[] };
		if (o?.type !== "verse" || typeof o.number !== "number" || !Array.isArray(o.content)) continue;
		const list = byNumber.get(o.number) ?? [];
		list.push(verseText(o.content));
		byNumber.set(o.number, list);
	}
	return [...byNumber.entries()]
		.sort((a, b) => a[0] - b[0])
		.map(([verse, texts]) => ({ verse, text: cleanText(texts.join(" ")) }))
		.filter((v) => v.text);
}

/** One chapter; empty if the translation doesn't contain the book. */
export async function fetchHelloAoChapter(id: string, book: BookInfo, chapter: number): Promise<Verse[]> {
	if (!id) throw new Error(t.errNoCode);
	const body = await getJson(`${BASE}/api/${encodeURIComponent(id)}/${book.usfm}/${chapter}.json`);
	return parseHelloAoChapter(body);
}

/**
 * Citation for a HelloAO translation: its own licence notice, or — when the catalog has none —
 * the translation's name with its licence link, since many of these licences require attribution.
 */
export function helloAoCitation(entry: Pick<HelloAoTranslation, "name" | "englishName" | "licenseNotice" | "licenseUrl" | "website">): string {
	const notice = entry.licenseNotice?.trim();
	if (notice) return notice;
	const name = entry.englishName && entry.englishName !== entry.name ? `${entry.name} (${entry.englishName})` : entry.name;
	const url = entry.licenseUrl || entry.website;
	return url ? `${name} — ${t.haLicense}: ${url}` : name;
}

const OT = new Set(BOOKS.filter((b) => b.num <= 39).map((b) => b.usfm));

/** Builds a Versedrop translation from a catalog entry, with the translation's own book names. */
export async function translationFromHelloAo(entry: HelloAoTranslation): Promise<Translation> {
	const books = (await loadBooks(entry.id)).filter((b) => BOOKS.some((x) => x.usfm === b.id));
	const bookNames: Record<string, string> = {};
	for (const b of books) bookNames[b.id] = b.name || b.commonName;
	const hasOT = books.some((b) => OT.has(b.id));
	const hasNT = books.some((b) => !OT.has(b.id));
	return {
		id: `helloao-${entry.id}`,
		name: entry.name,
		abbr: entry.shortName || entry.id,
		lang: toLang(entry.language),
		langLabel: entry.languageName || entry.languageEnglishName,
		source: "helloao",
		code: entry.id,
		citation: helloAoCitation(entry),
		link: entry.licenseUrl || entry.website,
		testament: hasOT && !hasNT ? "OT" : hasNT && !hasOT ? "NT" : undefined,
		bookNames: Object.keys(bookNames).length ? bookNames : undefined,
		dir: entry.textDirection,
	};
}

const norm = (s: string | undefined) => (s ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");

/**
 * The HelloAO copy of a built-in public-domain translation, used when bolls.life is unreachable.
 *
 * Only exact matches count: the same language, and the same Latin-letter abbreviation as the
 * catalog's short name, or as its id (optionally prefixed with the language code, e.g. "eng_kjv").
 * Translations whose abbreviation has no Latin letters (개역한글, 和合本 …) get no mirror, because
 * a loose match could silently insert a different translation under their name.
 */
export function pickMirror(tr: Pick<Translation, "lang" | "abbr" | "code">, list: HelloAoTranslation[]): string | null {
	const keys = [norm(tr.abbr), norm(tr.code)].filter((k) => k.length >= 2);
	if (!keys.length || !/[A-Za-z]/.test(tr.abbr ?? "")) return null;
	const candidates = list.filter((c) => toLang(c.language) === tr.lang);
	const byShort = candidates.find((c) => keys.includes(norm(c.shortName)));
	if (byShort) return byShort.id;
	const byId = candidates.find((c) => {
		const id = norm(c.id);
		const prefix = norm(c.language);
		return keys.some((k) => id === k || id === `${prefix}${k}`);
	});
	return byId?.id ?? null;
}

export async function findMirror(tr: Translation): Promise<string | null> {
	return pickMirror(tr, await loadCatalog());
}

/** Search-friendly text for a catalog entry. */
export function catalogText(c: HelloAoTranslation): string {
	return [c.id, c.name, c.englishName, c.shortName, c.language, c.languageName, c.languageEnglishName].filter(Boolean).join(" ").toLowerCase();
}
