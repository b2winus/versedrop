import { App, ButtonComponent, Modal, Notice } from "obsidian";
import type VersedropPlugin from "./main";
import { catalogText, HelloAoTranslation, loadCatalog, toLang, translationFromHelloAo } from "./adapters/helloao";
import { langLabel, t } from "./i18n";
import { LANGS } from "./sources";

/** Rows rendered at once; narrowing the search shows the rest. */
const MAX_ROWS = 80;

/**
 * Browses the HelloAO catalog by language and name, and adds a translation to "My translations"
 * with its own book names and licence notice.
 */
export class HelloAoBrowser extends Modal {
	private catalog: HelloAoTranslation[] = [];
	private lang = "all";
	private query = "";
	private statusEl!: HTMLElement;
	private listEl!: HTMLElement;
	private chips = new Map<string, HTMLButtonElement>();
	private timer = 0;

	constructor(
		app: App,
		private plugin: VersedropPlugin,
		private onAdded: () => void,
	) {
		super(app);
	}

	onOpen(): void {
		const { contentEl } = this;
		this.modalEl.addClass("versedrop-helloao");
		this.titleEl.setText(t.haTitle);
		contentEl.createEl("p", { text: t.haIntro, cls: "versedrop-helloao-intro" });

		const chipRow = contentEl.createDiv({ cls: "versedrop-langs" });
		for (const code of ["all", "de", "es", "fr", "pt", "ru", "it", "nl", "la", ...LANGS.filter((l) => !["de", "es", "fr", "pt", "ru", "it", "nl", "la"].includes(l))]) {
			const b = chipRow.createEl("button", { text: code === "all" ? t.haAllLangs : langLabel(code), cls: "versedrop-lang" });
			b.addEventListener("click", () => {
				this.lang = code;
				this.paintChips();
				this.render();
			});
			this.chips.set(code, b);
		}
		this.paintChips();

		const input = contentEl.createEl("input", { type: "search", placeholder: t.haSearch, cls: "versedrop-input versedrop-helloao-search" });
		input.addEventListener("input", () => {
			window.clearTimeout(this.timer);
			this.timer = window.setTimeout(() => {
				this.query = input.value.trim().toLowerCase();
				this.render();
			}, 150);
		});

		this.statusEl = contentEl.createDiv({ cls: "versedrop-message" });
		this.listEl = contentEl.createDiv({ cls: "versedrop-helloao-list" });
		this.statusEl.setText(t.haLoading);
		window.setTimeout(() => input.focus(), 0);

		loadCatalog()
			.then((list) => {
				// Whole Bibles first, then by name.
				this.catalog = [...list].sort((a, b) => Number(b.numberOfBooks >= 66) - Number(a.numberOfBooks >= 66) || a.name.localeCompare(b.name));
				this.render();
			})
			.catch((e: unknown) => this.statusEl.setText(t.haFailed(e instanceof Error ? e.message : String(e))));
	}

	onClose(): void {
		window.clearTimeout(this.timer);
		this.contentEl.empty();
	}

	private paintChips(): void {
		for (const [code, b] of this.chips) b.toggleClass("is-active", code === this.lang);
	}

	private render(): void {
		if (!this.catalog.length) return;
		const words = this.query.split(/\s+/).filter(Boolean);
		const matches = this.catalog.filter((c) => {
			if (this.lang !== "all" && toLang(c.language) !== this.lang) return false;
			if (!words.length) return true;
			const text = catalogText(c);
			return words.every((w) => text.includes(w));
		});

		this.listEl.empty();
		if (!matches.length) {
			this.statusEl.setText(t.haNone);
			return;
		}
		const shown = matches.slice(0, MAX_ROWS);
		this.statusEl.setText(t.haCount(shown.length, matches.length));
		const added = new Set(this.plugin.settings.custom.map((c) => c.id));
		for (const entry of shown) this.renderRow(entry, added.has(`helloao-${entry.id}`));
	}

	private renderRow(entry: HelloAoTranslation, isAdded: boolean): void {
		const row = this.listEl.createDiv({ cls: "versedrop-helloao-row" });
		const info = row.createDiv({ cls: "versedrop-helloao-info" });
		const title = info.createDiv({ cls: "versedrop-helloao-name", text: entry.name });
		if (entry.textDirection === "rtl") title.setAttr("dir", "rtl");
		const lang = langLabel(toLang(entry.language), entry.languageName || entry.languageEnglishName);
		const meta = [entry.englishName !== entry.name ? entry.englishName : "", lang, t.haBooks(entry.numberOfBooks), entry.shortName || entry.id].filter(Boolean);
		info.createDiv({ cls: "versedrop-helloao-meta", text: meta.join(" · ") });
		const notice = entry.licenseNotice?.trim();
		if (notice) info.createDiv({ cls: "versedrop-helloao-license", text: `${t.haLicense}: ${notice.length > 140 ? `${notice.slice(0, 140)}…` : notice}` });

		const button = new ButtonComponent(row).setButtonText(isAdded ? t.haAdded : t.haAdd);
		if (isAdded) button.setDisabled(true);
		else
			button.setCta().onClick(() => {
				button.setDisabled(true).setButtonText(t.haAdding);
				void this.add(entry)
					.then(() => {
						button.setButtonText(t.haAdded).removeCta();
					})
					.catch((e: unknown) => {
						new Notice(e instanceof Error ? e.message : String(e), 8000);
						button.setDisabled(false).setButtonText(t.haAdd);
					});
			});
	}

	private async add(entry: HelloAoTranslation): Promise<void> {
		const tr = await translationFromHelloAo(entry);
		const s = this.plugin.settings;
		if (!s.custom.some((c) => c.id === tr.id)) {
			s.custom.push(tr);
			s.order = [...s.order.filter((id) => id !== tr.id), tr.id];
		}
		await this.plugin.saveSettings();
		this.onAdded();
		new Notice(t.haAddedNotice(tr.name));
	}
}
