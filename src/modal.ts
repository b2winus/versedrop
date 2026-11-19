import { App, Editor, Modal, Notice, setIcon } from "obsidian";
import type VersedropPlugin from "./main";
import { formatPassages, Passage, refLabel } from "./format";
import { langLabel, t } from "./i18n";
import { BibleReference, parseReference } from "./reference";
import { hasBook, isCopyrighted, Lang, LANGS, noticeFor, Translation, Verse } from "./sources";

export interface ModalOptions {
	/** Translations to insert (from a preset) instead of the default "Insert these" list */
	picked?: string[];
}

interface Card {
	translation: Translation;
	checkbox: HTMLInputElement;
	verses: Verse[] | null;
}

/**
 * Search window. The translations in "Insert these" (or a preset) are shown and ticked; the rest of
 * "My translations" stay folded under "Other translations" and are only fetched when opened.
 * Ticking in the window is for this insertion only — defaults are changed in settings.
 */
export class VerseModal extends Modal {
	private input!: HTMLInputElement;
	private messageEl!: HTMLElement;
	private mainEl!: HTMLElement;
	private othersToggle!: HTMLButtonElement;
	private othersEl!: HTMLElement;
	private insertBtn!: HTMLButtonElement;
	private ref: BibleReference | null = null;
	private cards: Card[] = [];
	private searchToken = 0;

	/** Ids to insert, in insertion order */
	private picked: string[];
	/** Ids ticked by hand in this window (other translations) */
	private extra = new Set<string>();
	private othersOpen = false;
	/** Languages shown under "Other translations" (all of them after each search; chips narrow it) */
	private langs = new Set<Lang>();

	constructor(app: App, private plugin: VersedropPlugin, private editor: Editor, private initial = "", opts: ModalOptions = {}) {
		super(app);
		this.picked = opts.picked ?? plugin.settings.picked;
	}

	onOpen(): void {
		const { contentEl, modalEl } = this;
		modalEl.addClass("versedrop-modal");
		this.titleEl.setText(t.modalTitle);

		const row = contentEl.createDiv({ cls: "versedrop-search" });
		this.input = row.createEl("input", { type: "text", placeholder: t.placeholder, cls: "versedrop-input" });
		this.input.value = this.initial;
		const searchBtn = row.createEl("button", { text: t.search, cls: "mod-cta" });
		searchBtn.addEventListener("click", () => this.search());

		this.messageEl = contentEl.createDiv({ cls: "versedrop-message" });
		const results = contentEl.createDiv({ cls: "versedrop-results" });
		this.mainEl = results.createDiv({ cls: "versedrop-main" });
		this.othersToggle = results.createEl("button", { cls: "versedrop-others-toggle" });
		this.othersToggle.hide();
		this.othersToggle.addEventListener("click", () => {
			this.othersOpen = !this.othersOpen;
			this.renderOthers();
		});
		this.othersEl = results.createDiv({ cls: "versedrop-others" });

		const footer = contentEl.createDiv({ cls: "versedrop-footer" });
		const instant = this.plugin.settings.searchMode === "instant";
		footer.createSpan({ text: instant ? t.hintInstant : t.hint, cls: "versedrop-hint" });
		this.insertBtn = footer.createEl("button", { text: t.insert, cls: "mod-cta" });
		this.insertBtn.disabled = true;
		this.insertBtn.addEventListener("click", () => this.insert());

		this.input.addEventListener("keydown", (e) => {
			if (e.key !== "Enter" || e.isComposing) return;
			e.preventDefault();
			if (e.metaKey || e.ctrlKey) this.insert();
			else this.search();
		});
		this.scope.register(["Mod"], "Enter", (e) => {
			e.preventDefault();
			this.insert();
			return false;
		});

		this.input.focus();
		if (this.initial) this.search();
	}

	onClose(): void {
		this.contentEl.empty();
	}

	/** Translations to insert that contain this book, in "Insert these" order. */
	private mainTranslations(ref: BibleReference): Translation[] {
		const all = this.plugin.allTranslations();
		return this.picked.map((id) => all.find((tr) => tr.id === id)).filter((tr): tr is Translation => !!tr && hasBook(tr, ref.book.num));
	}

	private otherTranslations(ref: BibleReference): Translation[] {
		const main = new Set(this.picked);
		return this.plugin.allTranslations().filter((tr) => !main.has(tr.id) && hasBook(tr, ref.book.num));
	}

	private search(): void {
		const q = this.input.value.trim();
		if (!q) return;
		try {
			this.ref = parseReference(q);
		} catch (e) {
			this.ref = null;
			this.cards = [];
			this.mainEl.empty();
			this.othersEl.empty();
			this.othersToggle.hide();
			this.showMessage((e as Error).message, true);
			this.updateInsertState();
			return;
		}
		const main = this.mainTranslations(this.ref);
		if (this.plugin.settings.searchMode === "instant" && main.length) {
			void this.insertDirect(this.ref, main);
			return;
		}
		this.renderResults();
	}

	private renderResults(): void {
		const ref = this.ref;
		if (!ref) return;
		++this.searchToken;
		this.mainEl.empty();
		this.cards = [];
		this.extra.clear();

		const main = this.mainTranslations(ref);
		const others = this.otherTranslations(ref);
		this.langs = new Set(others.map((tr) => tr.lang));
		const shown = main.length ? main : others;
		if (!shown.length) {
			this.showMessage(this.plugin.allTranslations().length ? t.noTranslationsForBook : t.noTranslations, true);
			this.othersToggle.hide();
			this.othersEl.empty();
			this.updateInsertState();
			return;
		}
		const labels = [...new Set(shown.map((tr) => refLabel(ref, tr.lang, "full", tr.script, tr.bookNames)))].join(" · ");
		// Nothing in "Insert these" has this book (e.g. a Greek NT for Genesis): open the others.
		if (!main.length) {
			this.showMessage(this.picked.length ? `${labels} — ${t.pickedNoBook}` : `${labels} — ${t.pickedEmpty}`, false);
			this.othersOpen = true;
		} else this.showMessage(labels, false);

		for (const tr of main) this.addCard(this.mainEl, tr, true);
		this.renderOthers();
		this.updateInsertState();
	}

	/** The folded "Other translations" section: language chips + cards, fetched only when open. */
	private renderOthers(): void {
		const ref = this.ref;
		this.othersEl.empty();
		this.cards = this.cards.filter((c) => this.picked.includes(c.translation.id));
		if (!ref) return;
		const others = this.otherTranslations(ref);
		if (!others.length) {
			this.othersToggle.hide();
			this.updateInsertState();
			return;
		}
		this.othersToggle.show();
		this.othersToggle.empty();
		setIcon(this.othersToggle.createSpan({ cls: "versedrop-others-icon" }), this.othersOpen ? "chevron-down" : "chevron-right");
		this.othersToggle.appendText(this.othersOpen ? t.othersHide : t.othersShow(others.length));
		if (!this.othersOpen) {
			this.updateInsertState();
			return;
		}

		const langs = [...LANGS.filter((l) => others.some((tr) => tr.lang === l)), ...[...new Set(others.map((tr) => tr.lang))].filter((l) => !LANGS.includes(l)).sort()];
		if (langs.length > 1) {
			const chips = this.othersEl.createDiv({ cls: "versedrop-langs" });
			for (const l of langs) {
				const b = chips.createEl("button", { text: langLabel(l, others.find((tr) => tr.lang === l)?.langLabel), cls: "versedrop-lang" });
				b.toggleClass("is-active", this.langs.has(l));
				b.addEventListener("click", () => {
					if (this.langs.has(l)) {
						if (langs.filter((x) => this.langs.has(x)).length <= 1) return; // keep at least one
						this.langs.delete(l);
					} else this.langs.add(l);
					this.renderOthers();
				});
			}
		}
		const list = this.othersEl.createDiv({ cls: "versedrop-others-list" });
		for (const tr of others.filter((x) => this.langs.has(x.lang))) this.addCard(list, tr, this.extra.has(tr.id));
		this.updateInsertState();
	}

	private addCard(parent: HTMLElement, tr: Translation, checked: boolean): void {
		const ref = this.ref as BibleReference;
		const token = this.searchToken;
		const cardEl = parent.createDiv({ cls: "versedrop-card" });
		const head = cardEl.createEl("label", { cls: "versedrop-card-head" });
		const checkbox = head.createEl("input", { type: "checkbox" });
		checkbox.checked = checked;
		head.createSpan({ text: tr.name, cls: "versedrop-card-name" });
		if (tr.abbr && tr.abbr !== tr.name) head.createSpan({ text: tr.abbr, cls: "versedrop-card-abbr" });
		const body = cardEl.createDiv({ cls: "versedrop-card-body", text: t.loading });
		body.setAttr("lang", tr.lang);
		body.setAttr("dir", tr.dir ?? (tr.lang === "he" ? "rtl" : "auto"));

		const card: Card = { translation: tr, checkbox, verses: null };
		this.cards.push(card);
		const main = this.picked.includes(tr.id);
		checkbox.addEventListener("change", () => {
			cardEl.toggleClass("is-picked", checkbox.checked);
			if (!main) {
				if (checkbox.checked) this.extra.add(tr.id);
				else this.extra.delete(tr.id);
			}
			this.updateInsertState();
		});
		cardEl.toggleClass("is-picked", checkbox.checked);

		this.plugin.source
			.getPassage(tr, ref)
			.then((verses) => {
				if (token !== this.searchToken) return;
				card.verses = verses;
				body.empty();
				if (!verses.length) {
					body.addClass("is-empty");
					body.setText(t.noVerses);
				} else {
					let chapter = verses[0].chapter;
					for (const v of verses) {
						const p = body.createSpan({ cls: "versedrop-verse" });
						if (v.chapter !== undefined && v.chapter !== chapter) {
							p.createEl("strong", { cls: "versedrop-chapter", text: `${v.chapter} ` });
							chapter = v.chapter;
						}
						p.createEl("sup", { text: String(v.verse) });
						p.appendText(v.text + " ");
					}
					const notice = isCopyrighted(tr) ? noticeFor(tr) : undefined;
					if (notice) cardEl.createDiv({ cls: "versedrop-card-notice", text: notice.text });
				}
				this.updateInsertState();
			})
			.catch((err: Error) => {
				if (token !== this.searchToken) return;
				card.verses = [];
				body.empty();
				body.addClass("is-error");
				setIcon(body.createSpan({ cls: "versedrop-error-icon" }), "alert-triangle");
				body.appendText(err.message);
				this.updateInsertState();
			});
	}

	private updateInsertState(): void {
		this.insertBtn.disabled = !this.cards.some((c) => c.checkbox.checked && c.verses && c.verses.length);
	}

	private showMessage(text: string, isError: boolean): void {
		this.messageEl.setText(text);
		this.messageEl.toggleClass("is-error", isError);
	}

	/** "Insert right away": fetch the translations to insert and insert without showing cards. */
	private async insertDirect(ref: BibleReference, list: Translation[]): Promise<void> {
		this.showMessage(t.loading, false);
		const results = await Promise.allSettled(list.map((tr) => this.plugin.source.getPassage(tr, ref)));
		const passages: Passage[] = [];
		const failed: string[] = [];
		results.forEach((r, i) => {
			if (r.status === "fulfilled" && r.value.length) passages.push({ translation: list[i], verses: r.value });
			else failed.push(list[i].name);
		});
		if (failed.length) new Notice(t.directFailed(failed.join(", ")), 6000);
		if (!passages.length) {
			// Nothing came back: show the window's results so another translation can be picked.
			this.renderResults();
			return;
		}
		this.finish(ref, passages);
	}

	private insert(): void {
		if (!this.ref) return;
		// "Insert these" order first, then translations ticked under "Other translations".
		const ticked = this.cards.filter((c) => c.checkbox.checked && c.verses && c.verses.length);
		const rank = (c: Card) => {
			const i = this.picked.indexOf(c.translation.id);
			return i === -1 ? this.picked.length : i;
		};
		const chosen: Passage[] = ticked.sort((a, b) => rank(a) - rank(b)).map((c) => ({ translation: c.translation, verses: c.verses as Verse[] }));
		if (!chosen.length) {
			new Notice(t.noneSelected);
			return;
		}
		this.finish(this.ref, chosen);
	}

	private finish(ref: BibleReference, passages: Passage[]): void {
		const limit = this.plugin.settings.quoteWarn;
		const heavy = passages.filter((p) => isCopyrighted(p.translation) && p.verses.length > limit);
		if (limit > 0 && heavy.length) new Notice(t.quoteWarn(heavy.map((p) => p.translation.name).join(", "), limit), 10000);
		this.plugin.insertIntoEditor(this.editor, formatPassages(ref, passages, this.plugin.settings));
		this.close();
	}
}
