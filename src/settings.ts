import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type VersedropPlugin from "./main";
import { accordanceAvailable } from "./accordance";
import { AppLinks, CitationMode, FormatOptions } from "./format";
import { t } from "./i18n";
import { parseReference } from "./reference";
import { hotkeysFor, openHotkeySettings } from "./hotkeys";
import { knownCitation } from "./citations";
import { BUILT_IN_TRANSLATIONS, Lang, LANGS, Translation } from "./sources";

/** A named set of translations with its own command (and hotkey). */
export interface Preset {
	id: string;
	name: string;
	translations: string[];
}

export interface VersedropSettings extends FormatOptions {
	/** Languages selected in the search window (remembered) */
	languages: Lang[];
	/** Built-in translation ids shown in the search window */
	enabled: string[];
	/** Translation ids checked for insertion by default */
	picked: string[];
	custom: Translation[];
	/** Translation sets that get their own command */
	presets: Preset[];
	/** Display order of translation ids (built-in and custom) */
	order: string[];
	/** Personal ESV API key (api.esv.org) */
	esvApiKey: string;
	/** Warn when a copyrighted translation is quoted beyond this many verses at once (0 = never) */
	quoteWarn: number;
	/** Built-in ids known when settings were last saved (to switch on new defaults after updates) */
	seenBuiltIns?: string[];
}

export const DEFAULT_SETTINGS: VersedropSettings = {
	languages: ["ko", "en"],
	enabled: BUILT_IN_TRANSLATIONS.filter((tr) => tr.defaultOn).map((tr) => tr.id),
	picked: ["KRV", "KJV"],
	custom: [],
	presets: [],
	order: BUILT_IN_TRANSLATIONS.filter((tr) => tr.defaultOn).map((tr) => tr.id),
	style: "callout",
	calloutType: "quote",
	group: false,
	bookName: "full",
	verseNumbers: "sup",
	versePerLine: false,
	headerTemplate: "{ref} ({abbr})",
	appLinks: "none",
	logosVersion: "",
	accordanceModule: "",
	citations: "copyrighted",
	esvApiKey: "",
	quoteWarn: 50,
};

export class VersedropSettingTab extends PluginSettingTab {
	/** Custom translations whose editor is open */
	private expanded = new Set<string>();

	constructor(app: App, private plugin: VersedropPlugin) {
		super(app, plugin);
	}

	private async save(redraw = false): Promise<void> {
		await this.plugin.saveSettings();
		if (redraw) this.display();
	}

	display(): void {
		const { containerEl } = this;
		const s = this.plugin.settings;
		containerEl.empty();
		containerEl.addClass("versedrop-settings");

		// ── My translations ───────────────────────────────────────
		new Setting(containerEl).setName(t.sMyTranslations).setDesc(t.sMyTranslationsDesc).setHeading();
		const list = this.orderedTranslations();
		if (!list.length) containerEl.createDiv({ cls: "versedrop-empty", text: t.sNoTranslations });
		list.forEach((tr, i) => this.translationRow(containerEl, tr, i, list.length));
		this.addRow(containerEl);

		// ── Hotkeys & presets ─────────────────────────────────────
		new Setting(containerEl).setName(t.sHotkeys).setDesc(t.sHotkeysDesc).setHeading();
		this.hotkeyRow(containerEl, "insert-passage", t.cmdInsert, t.sCmdInsertDesc);
		this.hotkeyRow(containerEl, "insert-direct", t.cmdDirect, t.sCmdDirectDesc);
		for (const p of s.presets) this.presetRow(containerEl, p);
		new Setting(containerEl).setDesc(t.sPresetAddDesc).addButton((b) =>
			b.setButtonText(t.sPresetAdd).onClick(async () => {
				const p: Preset = { id: Date.now().toString(36), name: "", translations: [...s.picked] };
				s.presets.push(p);
				this.plugin.registerPreset(p);
				await this.save(true);
			}),
		);

		// ── App links ─────────────────────────────────────────────
		new Setting(containerEl).setName(t.sLinks).setDesc(t.sLinksDesc).setHeading();
		new Setting(containerEl).setName(t.sAppLinks).addDropdown((d) =>
			d
				.addOptions({ none: t.sLinksNone, logos: t.sLinksLogos, accordance: t.sLinksAccordance, both: t.sLinksBoth })
				.setValue(s.appLinks)
				.onChange(async (v) => {
					s.appLinks = v as AppLinks;
					await this.save(true);
				}),
		);
		if (s.appLinks === "logos" || s.appLinks === "both") {
			new Setting(containerEl)
				.setName(t.sLogosVersion)
				.setDesc(t.sLogosVersionDesc)
				.addText((x) =>
					x
						.setPlaceholder("ESV")
						.setValue(s.logosVersion)
						.onChange(async (v) => {
							s.logosVersion = v.trim();
							await this.save();
						}),
				);
		}
		if (s.appLinks === "accordance" || s.appLinks === "both") {
			new Setting(containerEl)
				.setName(t.sAccModule)
				.setDesc(t.sAccModuleDesc)
				.addText((x) =>
					x
						.setPlaceholder("ESVS")
						.setValue(s.accordanceModule)
						.onChange(async (v) => {
							s.accordanceModule = v.trim();
							await this.save();
						}),
				);
		}

		// ── Output ────────────────────────────────────────────────
		new Setting(containerEl).setName(t.sOutput).setHeading();
		new Setting(containerEl)
			.setName(t.sCitations)
			.setDesc(t.sCitationsDesc)
			.addDropdown((d) =>
				d
					.addOptions({ copyrighted: t.sCitCopyrighted, all: t.sCitAll, off: t.sCitOff })
					.setValue(s.citations)
					.onChange(async (v) => {
						s.citations = v as CitationMode;
						await this.save();
					}),
			);
		new Setting(containerEl)
			.setName(t.sQuoteWarn)
			.setDesc(t.sQuoteWarnDesc)
			.addText((x) => {
				x.inputEl.type = "number";
				x.inputEl.min = "0";
				x.setValue(String(s.quoteWarn)).onChange(async (v) => {
					const n = parseInt(v, 10);
					s.quoteWarn = Number.isFinite(n) && n >= 0 ? n : DEFAULT_SETTINGS.quoteWarn;
					await this.save();
				});
			});
		new Setting(containerEl).setName(t.sStyle).addDropdown((d) =>
			d
				.addOptions({ callout: t.sStyleCallout, quote: t.sStyleQuote, plain: t.sStylePlain })
				.setValue(s.style)
				.onChange(async (v) => {
					s.style = v as VersedropSettings["style"];
					await this.save(true);
				}),
		);
		if (s.style === "callout") {
			new Setting(containerEl)
				.setName(t.sCalloutType)
				.setDesc(t.sCalloutTypeDesc)
				.addText((x) =>
					x.setValue(s.calloutType).onChange(async (v) => {
						s.calloutType = v.trim() || "quote";
						await this.save();
					}),
				);
		}
		new Setting(containerEl)
			.setName(t.sGroup)
			.setDesc(t.sGroupDesc)
			.addToggle((x) =>
				x.setValue(s.group).onChange(async (v) => {
					s.group = v;
					await this.save();
				}),
			);
		new Setting(containerEl)
			.setName(t.sHeader)
			.setDesc(t.sHeaderDesc)
			.addText((x) =>
				x.setValue(s.headerTemplate).onChange(async (v) => {
					s.headerTemplate = v || DEFAULT_SETTINGS.headerTemplate;
					await this.save();
				}),
			);
		new Setting(containerEl).setName(t.sBookName).addDropdown((d) =>
			d
				.addOptions({ full: t.sBookFull, short: t.sBookShort })
				.setValue(s.bookName)
				.onChange(async (v) => {
					s.bookName = v as "full" | "short";
					await this.save();
				}),
		);
		new Setting(containerEl).setName(t.sVerseNum).addDropdown((d) =>
			d
				.addOptions({ none: t.sVerseNumNone, plain: t.sVerseNumPlain, sup: t.sVerseNumSup })
				.setValue(s.verseNumbers)
				.onChange(async (v) => {
					s.verseNumbers = v as VersedropSettings["verseNumbers"];
					await this.save();
				}),
		);
		new Setting(containerEl).setName(t.sPerLine).addToggle((x) =>
			x.setValue(s.versePerLine).onChange(async (v) => {
				s.versePerLine = v;
				await this.save();
			}),
		);
		new Setting(containerEl)
			.setName(t.sClearCache)
			.setDesc(t.sClearCacheDesc)
			.addButton((b) =>
				b.setButtonText(t.sClear).onClick(() => {
					this.plugin.source.clearCache();
					new Notice(t.sCleared);
				}),
			);

		// ── Support ───────────────────────────────────────────────
		new Setting(containerEl)
			.setName(t.sSupport)
			.setDesc(t.sSupportDesc)
			.addButton((b) =>
				b
					.setButtonText("☕ Buy Me a Coffee")
					.onClick(() => window.open("https://buymeacoffee.com/4h9fg59wsgd")),
			);

		// ── Help ──────────────────────────────────────────────────
		new Setting(containerEl).setName(t.sHelp).setHeading();
		const help = containerEl.createDiv({ cls: "versedrop-help" });
		for (const topic of t.help) {
			const d = help.createEl("details");
			d.createEl("summary", { text: topic.title });
			for (const p of topic.paras) d.createEl("p", { text: p });
		}
	}

	private pickButton(row: Setting, id: string): void {
		const s = this.plugin.settings;
		const on = s.picked.includes(id);
		row.addExtraButton((x) =>
			x
				.setIcon(on ? "check-square" : "square")
				.setTooltip(t.sDefaultPick)
				.onClick(async () => {
					s.picked = on ? s.picked.filter((p) => p !== id) : [...s.picked, id];
					await this.save(true);
				}),
		);
	}

	/** Ids in display order: built-ins that are on and custom translations, following `order`. */
	private orderedTranslations(): Translation[] {
		const s = this.plugin.settings;
		const enabled = new Set(s.enabled);
		const all = [...BUILT_IN_TRANSLATIONS.filter((tr) => enabled.has(tr.id)), ...s.custom];
		return sortByOrder(all, s.order);
	}

	private translationRow(el: HTMLElement, tr: Translation, index: number, total: number): void {
		const s = this.plugin.settings;
		const lang = t.langName[tr.lang];
		const custom = !tr.builtIn;
		const kind = tr.source === "bolls" ? "bolls.life" : tr.source === "file" ? "JSON" : tr.source === "accordance" ? "Accordance" : "";
		const title = custom
			? tr.name || t.sUnnamed
			: `${tr.name}${tr.abbr !== tr.name ? ` (${tr.abbr})` : ""}`;
		const desc = custom ? `${lang} · ${kind}${tr.source === "bolls" ? ` ${tr.code ?? ""}` : tr.source === "accordance" ? ` ${tr.module ?? ""}` : ""}` : `${lang} · ${tr.note ?? ""}`;

		const row = new Setting(el).setName(title).setDesc(desc).setClass("versedrop-tr-row");
		this.pickButton(row, tr.id);
		row.addExtraButton((x) =>
			x
				.setIcon("arrow-up")
				.setTooltip(t.sMoveUp)
				.setDisabled(index === 0)
				.onClick(() => this.move(tr.id, -1)),
		).addExtraButton((x) =>
			x
				.setIcon("arrow-down")
				.setTooltip(t.sMoveDown)
				.setDisabled(index === total - 1)
				.onClick(() => this.move(tr.id, 1)),
		);
		if (custom) {
			const open = this.expanded.has(tr.id);
			row.addExtraButton((x) =>
				x
					.setIcon(open ? "chevron-up" : "pencil")
					.setTooltip(t.sEdit)
					.onClick(() => {
						if (open) this.expanded.delete(tr.id);
						else this.expanded.add(tr.id);
						this.display();
					}),
			);
		}
		row.addExtraButton((x) =>
			x
				.setIcon("x")
				.setTooltip(t.sRemove)
				.onClick(async () => {
					if (custom) s.custom = s.custom.filter((c) => c.id !== tr.id);
					else s.enabled = s.enabled.filter((id) => id !== tr.id);
					s.picked = s.picked.filter((id) => id !== tr.id);
					s.order = s.order.filter((id) => id !== tr.id);
					await this.save(true);
				}),
		);

		if (tr.source === "esv") this.esvKeyRow(el);
		if (custom && this.expanded.has(tr.id)) this.customEditor(el, tr);
	}

	private esvKeyRow(el: HTMLElement): void {
		const s = this.plugin.settings;
		new Setting(el)
			.setName(t.sEsvKey)
			.setDesc(t.sEsvKeyDesc)
			.setClass("versedrop-sub-row")
			.addText((x) => {
				x.inputEl.type = "password";
				x.setPlaceholder("API key")
					.setValue(s.esvApiKey)
					.onChange(async (v) => {
						s.esvApiKey = v.trim();
						this.plugin.source.clearCache();
						await this.save();
					});
			})
			.addExtraButton((b) =>
				b
					.setIcon("external-link")
					.setTooltip("api.esv.org")
					.onClick(() => window.open("https://api.esv.org/account/create-application/")),
			);
	}

	private customEditor(el: HTMLElement, tr: Translation): void {
		const placeholder = tr.source === "bolls" ? t.sCode : tr.source === "file" ? t.sPath : t.sModule;
		const current = (tr.source === "bolls" ? tr.code : tr.source === "file" ? tr.path : tr.module) ?? "";
		const box = el.createDiv({ cls: "versedrop-editor" });

		new Setting(box).setName(t.sName).addText((x) =>
			x
				.setPlaceholder(t.sNamePlaceholder)
				.setValue(tr.name)
				.onChange(async (v) => {
					tr.name = v.trim();
					tr.abbr = v.trim();
					await this.save();
				}),
		);
		const src = new Setting(box).setName(placeholder).addText((x) =>
			x.setValue(current).onChange(async (v) => {
				const val = v.trim();
				if (tr.source === "bolls") tr.code = val;
				else if (tr.source === "file") tr.path = val;
				else tr.module = val;
				this.plugin.source.clearCache();
				await this.save();
			}),
		);
		if (tr.source === "accordance") {
			src.addButton((b) =>
				b.setButtonText(t.sTest).onClick(async () => {
					b.setDisabled(true);
					try {
						const verses = await this.plugin.source.getPassage({ ...tr, id: `${tr.id}-test` }, parseReference("John 3:16"));
						const text = verses[0]?.text ?? "";
						new Notice(t.accTestOk(tr.module ?? "", text.length > 80 ? `${text.slice(0, 80)}…` : text), 8000);
					} catch (e) {
						new Notice((e as Error).message, 12000);
					} finally {
						b.setDisabled(false);
					}
				}),
			);
		}
		new Setting(box).setName(t.sLang).addDropdown((d) =>
			d
				.addOptions(Object.fromEntries(LANGS.map((l) => [l, t.langName[l]])))
				.setValue(tr.lang)
				.onChange(async (v) => {
					tr.lang = v as Lang;
					await this.save();
				}),
		);
		const known = knownCitation(tr.name, tr.module, tr.code);
		new Setting(box)
			.setName(t.sCitation)
			.setDesc(known && !tr.citation ? t.sCitationKnown : t.sCitationDesc)
			.addText((x) => {
				x.inputEl.addClass("versedrop-citation-input");
				x.setPlaceholder(known?.text ?? t.sCitationPlaceholder)
					.setValue(tr.citation ?? "")
					.onChange(async (v) => {
						tr.citation = v.trim();
						await this.save();
					});
			});
		new Setting(box).addButton((b) =>
			b.setButtonText(t.sDone).onClick(() => {
				this.expanded.delete(tr.id);
				this.display();
			}),
		);
	}

	/** The "Add a translation" dropdown: built-ins not yet added, then ways to add your own. */
	private addRow(el: HTMLElement): void {
		const s = this.plugin.settings;
		new Setting(el)
			.setName(t.sAddTranslation)
			.setDesc(t.sAddTranslationDesc)
			.addDropdown((d) => {
				const sel = d.selectEl;
				sel.createEl("option", { text: t.sChoose, value: "" });
				const enabled = new Set(s.enabled);
				for (const lang of LANGS) {
					const avail = BUILT_IN_TRANSLATIONS.filter((tr) => tr.lang === lang && !enabled.has(tr.id));
					if (!avail.length) continue;
					const group = sel.createEl("optgroup");
					group.label = t.langName[lang];
					for (const tr of avail) {
						const label = tr.abbr !== tr.name ? `${tr.abbr} — ${tr.name}` : tr.name;
						group.createEl("option", { text: label, value: `b:${tr.id}` });
					}
				}
				const own = sel.createEl("optgroup");
				own.label = t.sOwnGroup;
				own.createEl("option", { text: t.sAddAccordance, value: "c:accordance" }).disabled = !accordanceAvailable();
				own.createEl("option", { text: t.sAddBolls, value: "c:bolls" });
				own.createEl("option", { text: t.sAddFile, value: "c:file" });
				sel.value = "";

				d.onChange(async (v) => {
					if (v.startsWith("b:")) {
						const id = v.slice(2);
						s.enabled = [...new Set([...s.enabled, id])];
						s.order = [...s.order.filter((x) => x !== id), id];
					} else if (v.startsWith("c:")) {
						const source = v.slice(2) as Translation["source"];
						const id = `custom-${Date.now().toString(36)}`;
						s.custom.push({ id, name: "", abbr: "", lang: source === "accordance" ? "ko" : "ko", source });
						s.order.push(id);
						this.expanded.add(id);
					} else return;
					await this.save(true);
				});
			});
	}

	private hotkeyRow(el: HTMLElement, commandId: string, name: string, desc: string, cls?: string): Setting {
		const keys = hotkeysFor(this.app, `${this.plugin.manifest.id}:${commandId}`);
		const row = new Setting(el).setName(name).setDesc(desc);
		if (cls) row.setClass(cls);
		row.controlEl.createSpan({ cls: `versedrop-hotkey${keys ? "" : " is-empty"}`, text: keys || t.sNoHotkey });
		row.addButton((b) => b.setButtonText(keys ? t.sChangeHotkey : t.sSetHotkey).onClick(() => openHotkeySettings(this.app, "Versedrop")));
		return row;
	}

	private presetRow(el: HTMLElement, p: Preset): void {
		const s = this.plugin.settings;
		const box = el.createDiv({ cls: "versedrop-preset" });
		const row = this.hotkeyRow(box, this.plugin.presetCommandId(p), "", t.sPresetDesc, "versedrop-preset-row");
		row.nameEl.empty();
		const input = row.nameEl.createEl("input", { type: "text", cls: "versedrop-preset-name", placeholder: t.sPresetNamePlaceholder });
		input.value = p.name;
		input.addEventListener("change", () => {
			p.name = input.value.trim();
			this.plugin.unregisterPreset(p);
			this.plugin.registerPreset(p);
			void this.save();
		});
		row.addExtraButton((x) =>
			x
				.setIcon("x")
				.setTooltip(t.sRemove)
				.onClick(async () => {
					this.plugin.unregisterPreset(p);
					s.presets = s.presets.filter((q) => q.id !== p.id);
					await this.save(true);
				}),
		);

		const chips = box.createDiv({ cls: "versedrop-chips" });
		const chosen = new Set(p.translations);
		for (const tr of this.plugin.allTranslations()) {
			const chip = chips.createEl("button", { text: tr.abbr || tr.name, cls: "versedrop-chip" });
			chip.setAttr("aria-pressed", String(chosen.has(tr.id)));
			chip.toggleClass("is-active", chosen.has(tr.id));
			chip.setAttr("title", tr.name);
			chip.addEventListener("click", () => {
				if (chosen.has(tr.id)) chosen.delete(tr.id);
				else chosen.add(tr.id);
				chip.toggleClass("is-active", chosen.has(tr.id));
				chip.setAttr("aria-pressed", String(chosen.has(tr.id)));
				p.translations = this.plugin.allTranslations().map((x) => x.id).filter((id) => chosen.has(id));
				void this.save();
			});
		}
	}

	private async move(id: string, dir: -1 | 1): Promise<void> {
		const s = this.plugin.settings;
		const ids = this.orderedTranslations().map((tr) => tr.id);
		const i = ids.indexOf(id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= ids.length) return;
		[ids[i], ids[j]] = [ids[j], ids[i]];
		s.order = ids;
		await this.save(true);
	}
}

/** Sorts translations by their position in `order`; unknown ids keep their relative order at the end. */
export function sortByOrder(list: Translation[], order: string[]): Translation[] {
	const pos = new Map(order.map((id, i) => [id, i]));
	return list
		.map((tr, i) => ({ tr, i }))
		.sort((a, b) => (pos.get(a.tr.id) ?? 1e6 + a.i) - (pos.get(b.tr.id) ?? 1e6 + b.i))
		.map((x) => x.tr);
}
