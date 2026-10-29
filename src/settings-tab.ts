import {
	AbstractInputSuggest,
	App,
	FuzzySuggestModal,
	Menu,
	Modal,
	Notice,
	PluginSettingTab,
	Setting,
	SettingDefinition,
	SettingDefinitionItem,
	SettingDefinitionPage,
	SettingPage,
	SuggestModal,
	TFile,
	TFolder,
	TextComponent,
	normalizePath,
} from "obsidian";
import type VersedropPlugin from "./main";
import { accordanceAvailable } from "./accordance";
import { knownCitation } from "./citations";
import { HelpTopic, langLabel, t } from "./i18n";
import { HelloAoBrowser } from "./helloao-browser";
import { hotkeysFor, openHotkeySettings } from "./hotkeys";
import { parseReference } from "./reference";
import { DEFAULT_SETTINGS, Preset, sortByOrder } from "./settings";
import { BUILT_IN_TRANSLATIONS, LANGS, Translation } from "./sources";

const SUPPORT_URL = "https://buymeacoffee.com/4h9fg59wsgd";
/** Default vault folder that imported Bible JSON files are copied into. */
const IMPORT_FOLDER = DEFAULT_SETTINGS.importFolder;

/** Cleans a folder path typed by the user: "/My Bibles/" → "My Bibles"; "" or "/" → vault root (""). */
export function cleanFolderPath(raw: string): string {
	const p = raw.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
	return p ? normalizePath(p) : "";
}

/** Why a folder path can't be used, or null when it's fine. */
export function folderPathProblem(path: string): string | null {
	if (path.split("/").some((part) => part.startsWith(".") || part.trim() === "")) return t.sFolderHidden;
	if (/[*?"<>|:]/.test(path)) return t.sFolderBadChars;
	return null;
}

/** Creates a folder and any missing parent folders. Returns false if a file is in the way. */
export async function ensureFolder(app: App, path: string): Promise<boolean> {
	if (!path) return true;
	let cur = "";
	for (const part of path.split("/")) {
		cur = cur ? `${cur}/${part}` : part;
		const existing = app.vault.getAbstractFileByPath(cur);
		if (existing instanceof TFolder) continue;
		if (existing) return false;
		await app.vault.createFolder(cur);
	}
	return true;
}

function vaultFolders(app: App): TFolder[] {
	return app.vault
		.getAllLoadedFiles()
		.filter((f): f is TFolder => f instanceof TFolder && !f.isRoot() && !f.path.split("/").some((p) => p.startsWith(".")))
		.sort((a, b) => a.path.localeCompare(b.path));
}

/** Autocompletes folder paths while typing. */
class FolderSuggest extends AbstractInputSuggest<TFolder> {
	protected getSuggestions(query: string): TFolder[] {
		const q = query.toLowerCase();
		return vaultFolders(this.app).filter((f) => f.path.toLowerCase().includes(q));
	}

	renderSuggestion(folder: TFolder, el: HTMLElement): void {
		el.setText(folder.path);
	}

	selectSuggestion(folder: TFolder, evt: MouseEvent | KeyboardEvent): void {
		super.selectSuggestion(folder, evt);
		this.setValue(folder.path);
		this.close();
	}
}

type FolderChoice = { folder: TFolder } | { create: string } | { root: true };

/** Lists vault folders to pick one; typing a name that doesn't exist offers to create it. */
class FolderModal extends SuggestModal<FolderChoice> {
	constructor(
		app: App,
		private onPick: (path: string) => void,
	) {
		super(app);
		this.setPlaceholder(t.sFolderPickPlaceholder);
		this.setInstructions([
			{ command: "↵", purpose: t.sFolderPickEnter },
			{ command: "esc", purpose: t.sCancel },
		]);
	}

	getSuggestions(query: string): FolderChoice[] {
		const q = query.trim().toLowerCase();
		const folders = vaultFolders(this.app).filter((f) => f.path.toLowerCase().includes(q));
		const out: FolderChoice[] = [];
		const typed = cleanFolderPath(query);
		if (typed && !folders.some((f) => f.path.toLowerCase() === typed.toLowerCase())) out.push({ create: typed });
		if (!q) out.push({ root: true });
		return [...out, ...folders.map((folder) => ({ folder }))];
	}

	renderSuggestion(c: FolderChoice, el: HTMLElement): void {
		if ("create" in c) {
			el.addClass("versedrop-folder-create");
			el.createSpan({ text: `＋ ${t.sFolderCreateItem(c.create)}` });
		} else if ("root" in c) el.setText(t.sFolderRoot);
		else el.setText(c.folder.path);
	}

	onChooseSuggestion(c: FolderChoice): void {
		if ("create" in c) {
			const problem = folderPathProblem(c.create);
			if (problem) {
				new Notice(problem, 8000);
				return;
			}
			void ensureFolder(this.app, c.create).then((ok) => {
				if (!ok) new Notice(t.sFolderFileInWay(c.create), 8000);
				else {
					new Notice(t.sFolderCreated(c.create), 5000);
					this.onPick(c.create);
				}
			});
		} else this.onPick("root" in c ? "" : c.folder.path);
	}
}

/**
 * Adds the "save imported files to" controls to a setting: a path field with folder suggestions,
 * a folder picker (which can also create folders) and a "create this folder" button.
 */
function renderImportFolder(setting: Setting, app: App, plugin: VersedropPlugin): void {
	const describe = () => {
		const path = plugin.settings.importFolder;
		const problem = path ? folderPathProblem(path) : null;
		const shown = path || t.sFolderRoot;
		const state = problem
			? problem
			: !path || app.vault.getAbstractFileByPath(path) instanceof TFolder
				? t.sFolderExists
				: t.sFolderWillCreate;
		setting.setDesc(`${t.sImportFolderDesc} ${t.sFolderNow(shown)} — ${state}`);
	};
	const set = (raw: string) => {
		plugin.settings.importFolder = cleanFolderPath(raw);
		void plugin.saveSettings();
		describe();
	};
	let input: HTMLInputElement | null = null;
	setting.addText((x) => {
		input = x.inputEl;
		x.setPlaceholder(t.sFolderRoot)
			.setValue(plugin.settings.importFolder)
			.onChange((v) => set(v));
		new FolderSuggest(app, x.inputEl).onSelect((f) => set(f.path));
	});
	setting.addExtraButton((b) =>
		b
			.setIcon("folder-search")
			.setTooltip(t.sFolderPick)
			.onClick(() =>
				new FolderModal(app, (path) => {
					if (input) input.value = path;
					set(path);
				}).open(),
			),
	);
	setting.addExtraButton((b) =>
		b
			.setIcon("folder-plus")
			.setTooltip(t.sFolderCreate)
			.onClick(() => {
				const path = plugin.settings.importFolder;
				const problem = path ? folderPathProblem(path) : null;
				if (problem) return void new Notice(problem, 8000);
				if (!path || app.vault.getAbstractFileByPath(path) instanceof TFolder) return void new Notice(t.sFolderAlready(path || t.sFolderRoot), 5000);
				void ensureFolder(app, path).then((ok) => {
					new Notice(ok ? t.sFolderCreated(path) : t.sFolderFileInWay(path), 6000);
					describe();
				});
			}),
	);
	setting.addExtraButton((b) =>
		b
			.setIcon("rotate-ccw")
			.setTooltip(t.sFolderReset(IMPORT_FOLDER))
			.onClick(() => {
				if (input) input.value = IMPORT_FOLDER;
				set(IMPORT_FOLDER);
			}),
	);
	describe();
}

function jsonFiles(app: App): TFile[] {
	return app.vault
		.getFiles()
		.filter((f) => f.extension.toLowerCase() === "json" && !f.path.startsWith(".") && !f.path.includes("/."))
		.sort((a, b) => a.path.localeCompare(b.path));
}

/** Autocompletes JSON file paths while typing in the path field. */
class JsonFileSuggest extends AbstractInputSuggest<TFile> {
	protected getSuggestions(query: string): TFile[] {
		const q = query.toLowerCase();
		return jsonFiles(this.app).filter((f) => f.path.toLowerCase().includes(q));
	}

	renderSuggestion(file: TFile, el: HTMLElement): void {
		el.setText(file.path);
	}

	selectSuggestion(file: TFile, evt: MouseEvent | KeyboardEvent): void {
		super.selectSuggestion(file, evt);
		this.setValue(file.path);
		this.close();
	}
}

/** Lists every JSON file in the vault to pick one. */
class JsonFileModal extends FuzzySuggestModal<TFile> {
	constructor(
		app: App,
		private onPick: (file: TFile) => void,
	) {
		super(app);
		this.setPlaceholder(t.sPickInVaultPlaceholder);
		this.emptyStateText = t.sNoJsonInVault;
	}

	getItems(): TFile[] {
		return jsonFiles(this.app);
	}

	getItemText(file: TFile): string {
		return file.path;
	}

	onChooseItem(file: TFile): void {
		this.onPick(file);
	}
}

/** Settings tab built on Obsidian's declarative settings API (1.13+), so every option is searchable. */
export class VersedropSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: VersedropPlugin) {
		super(app, plugin);
	}

	// ── storage for `control` definitions ──────────────────────────
	getControlValue(key: string): unknown {
		return (this.plugin.settings as unknown as Record<string, unknown>)[key];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		const s = this.plugin.settings as unknown as Record<string, unknown>;
		if (key === "calloutType") value = String(value).trim() || "quote";
		if (key === "headerTemplate") value = String(value) || DEFAULT_SETTINGS.headerTemplate;
		if (key === "logosVersion" || key === "accordanceModule") value = String(value).trim();
		if (key === "quoteWarn") {
			const n = Number(value);
			value = Number.isFinite(n) && n >= 0 ? Math.floor(n) : DEFAULT_SETTINGS.quoteWarn;
		}
		s[key] = value;
		await this.plugin.saveSettings();
		this.refreshDomState();
	}

	/** Saves and rebuilds the definitions (for added, removed or reordered items). */
	private async saveAndRebuild(): Promise<void> {
		await this.plugin.saveSettings();
		this.update();
	}

	getSettingDefinitions(): SettingDefinitionItem[] {
		const s = this.plugin.settings;
		const list = this.orderedTranslations();
		const linkShown = (kind: "logos" | "accordance") => s.appLinks === kind || s.appLinks === "both";

		return [
			// ── My translations ──────────────────────────────────────
			{
				type: "list",
				heading: t.sMyTranslations,
				emptyState: t.sNoTranslations,
				items: list.map((tr) => this.translationItem(tr)),
				onReorder: (from, to) => void this.reorder(list, from, to),
				onDelete: (index) => void this.removeTranslation(list[index]),
				addItem: { name: t.sAddTranslation, action: (el) => this.openAddMenu(el) },
			},
			// ── ESV key (only when ESV is in the list) ───────────────
			{
				type: "group",
				heading: "ESV",
				visible: () => this.plugin.settings.enabled.includes("ESV"),
				items: [
					{
						name: t.sEsvKey,
						desc: t.sEsvKeyDesc,
						aliases: ["api key", "crossway"],
						render: (setting) => {
							setting.addText((x) => {
								x.inputEl.type = "password";
								x.setPlaceholder("API key")
									.setValue(s.esvApiKey)
									.onChange((v) => {
										s.esvApiKey = v.trim();
										this.plugin.source.clearCache();
										void this.plugin.saveSettings();
									});
							});
							setting.addExtraButton((b) =>
								b
									.setIcon("external-link")
									.setTooltip("api.esv.org")
									.onClick(() => window.open("https://api.esv.org/account/create-application/")),
							);
						},
					},
				],
			},
			// ── JSON files ───────────────────────────────────────────
			{
				type: "group",
				heading: t.sJsonFiles,
				items: [
					{
						name: t.sImportFolder,
						desc: t.sImportFolderDesc,
						aliases: ["folder", "폴더", "json", "import"],
						render: (setting) => renderImportFolder(setting, this.app, this.plugin),
					},
				],
			},
			// ── Hotkeys ──────────────────────────────────────────────
			{
				type: "group",
				heading: t.sHotkeys,
				items: [
					this.hotkeyItem("insert-passage", t.cmdInsert, t.sCmdInsertDesc),
					this.hotkeyItem("insert-direct", t.cmdDirect, t.sCmdDirectDesc),
				],
			},
			// ── Presets ──────────────────────────────────────────────
			{
				type: "list",
				heading: t.sPresets,
				emptyState: t.sPresetAddDesc,
				items: s.presets.map((p) => this.presetItem(p)),
				onReorder: (from, to) => {
					const [moved] = s.presets.splice(from, 1);
					s.presets.splice(to, 0, moved);
					void this.saveAndRebuild();
				},
				onDelete: (index) => {
					const [removed] = s.presets.splice(index, 1);
					if (removed) this.plugin.unregisterPreset(removed);
					void this.saveAndRebuild();
				},
				addItem: {
					name: t.sPresetAdd,
					action: () => {
						const p: Preset = { id: Date.now().toString(36), name: "", translations: [...s.picked] };
						s.presets.push(p);
						this.plugin.registerPreset(p);
						void this.saveAndRebuild();
						new PresetModal(this.app, this.plugin, p, () => this.update()).open();
					},
				},
			},
			// ── Logos / Accordance links ─────────────────────────────
			{
				type: "group",
				heading: t.sLinks,
				items: [
					{
						name: t.sAppLinks,
						desc: t.sLinksDesc,
						aliases: ["logos", "accordance", "ref.ly"],
						control: {
							type: "dropdown",
							key: "appLinks",
							options: { none: t.sLinksNone, logos: t.sLinksLogos, accordance: t.sLinksAccordance, both: t.sLinksBoth },
						},
					},
					{
						name: t.sLogosVersion,
						desc: t.sLogosVersionDesc,
						visible: () => linkShown("logos"),
						control: { type: "text", key: "logosVersion", placeholder: "ESV" },
					},
					{
						name: t.sAccModule,
						desc: t.sAccModuleDesc,
						visible: () => linkShown("accordance"),
						control: { type: "text", key: "accordanceModule", placeholder: "ESVS" },
					},
				],
			},
			// ── Output ───────────────────────────────────────────────
			{
				type: "group",
				heading: t.sOutput,
				items: [
					{
						name: t.sCitations,
						desc: t.sCitationsDesc,
						aliases: ["copyright", "저작권"],
						control: {
							type: "dropdown",
							key: "citations",
							options: { copyrighted: t.sCitCopyrighted, all: t.sCitAll, off: t.sCitOff },
						},
					},
					{ name: t.sQuoteWarn, desc: t.sQuoteWarnDesc, control: { type: "number", key: "quoteWarn", min: 0, step: 1 } },
					{
						name: t.sStyle,
						control: {
							type: "dropdown",
							key: "style",
							options: { callout: t.sStyleCallout, quote: t.sStyleQuote, plain: t.sStylePlain },
						},
					},
					{
						name: t.sCalloutType,
						desc: t.sCalloutTypeDesc,
						visible: () => this.plugin.settings.style === "callout",
						control: { type: "text", key: "calloutType", placeholder: "quote" },
					},
					{ name: t.sGroup, desc: t.sGroupDesc, control: { type: "toggle", key: "group" } },
					{ name: t.sHeader, desc: t.sHeaderDesc, control: { type: "text", key: "headerTemplate", placeholder: DEFAULT_SETTINGS.headerTemplate } },
					{
						name: t.sBookName,
						control: { type: "dropdown", key: "bookName", options: { full: t.sBookFull, short: t.sBookShort } },
					},
					{
						name: t.sVerseNum,
						control: {
							type: "dropdown",
							key: "verseNumbers",
							options: { none: t.sVerseNumNone, plain: t.sVerseNumPlain, sup: t.sVerseNumSup },
						},
					},
					{ name: t.sPerLine, control: { type: "toggle", key: "versePerLine" } },
					{
						name: t.sClearCache,
						desc: t.sClearCacheDesc,
						action: () => {
							this.plugin.source.clearCache();
							new Notice(t.sCleared);
						},
					},
				],
			},
			// ── Support & help ───────────────────────────────────────
			{
				type: "group",
				heading: t.sHelp,
				items: [
					...t.help.map(
						(topic): SettingDefinitionPage => ({
							type: "page",
							name: topic.title,
							page: () => new HelpPage(topic),
						}),
					),
					{
						name: `☕ ${t.sSupport}`,
						desc: t.sSupportDesc,
						aliases: ["buy me a coffee", "donate", "후원"],
						action: () => window.open(SUPPORT_URL),
					},
				],
			},
		];
	}

	// ── My translations ────────────────────────────────────────────
	private orderedTranslations(): Translation[] {
		const s = this.plugin.settings;
		const enabled = new Set(s.enabled);
		return sortByOrder([...BUILT_IN_TRANSLATIONS.filter((tr) => enabled.has(tr.id)), ...s.custom], s.order);
	}

	private translationItem(tr: Translation): SettingDefinition {
		const s = this.plugin.settings;
		const lang = langLabel(tr.lang, tr.langLabel);
		const custom = !tr.builtIn;
		const kind =
			tr.source === "bolls"
				? `bolls.life ${tr.code ?? ""}`
				: tr.source === "helloao"
					? `HelloAO ${tr.code ?? ""}`
					: tr.source === "file"
						? `JSON ${tr.path ?? ""}`
						: `Accordance ${tr.module ?? ""}`;
		const name = custom ? tr.name || t.sUnnamed : `${tr.name}${tr.abbr !== tr.name ? ` (${tr.abbr})` : ""}`;
		const desc = custom ? `${lang} · ${kind.trim()}` : `${lang} · ${tr.note ?? ""}`;

		return {
			name,
			desc,
			aliases: [tr.abbr, tr.code ?? "", tr.module ?? ""].filter(Boolean),
			render: (setting) => {
				const on = s.picked.includes(tr.id);
				setting.addExtraButton((x) =>
					x
						.setIcon(on ? "check-square" : "square")
						.setTooltip(t.sDefaultPick)
						.onClick(() => {
							s.picked = on ? s.picked.filter((p) => p !== tr.id) : [...s.picked, tr.id];
							void this.saveAndRebuild();
						}),
				);
				if (custom) {
					setting.addExtraButton((x) =>
						x
							.setIcon("pencil")
							.setTooltip(t.sEdit)
							.onClick(() => new TranslationModal(this.app, this.plugin, tr, () => this.update()).open()),
					);
				}
			},
		};
	}

	private async reorder(list: Translation[], from: number, to: number): Promise<void> {
		const ids = list.map((tr) => tr.id);
		const [moved] = ids.splice(from, 1);
		ids.splice(to, 0, moved);
		this.plugin.settings.order = ids;
		await this.saveAndRebuild();
	}

	private async removeTranslation(tr: Translation | undefined): Promise<void> {
		if (!tr) return;
		const s = this.plugin.settings;
		if (tr.builtIn) s.enabled = s.enabled.filter((id) => id !== tr.id);
		else s.custom = s.custom.filter((c) => c.id !== tr.id);
		s.picked = s.picked.filter((id) => id !== tr.id);
		s.order = s.order.filter((id) => id !== tr.id);
		await this.saveAndRebuild();
	}

	/** Menu of built-in translations not yet added, grouped by language, then ways to add your own. */
	private openAddMenu(el: HTMLElement): void {
		const s = this.plugin.settings;
		const enabled = new Set(s.enabled);
		const menu = new Menu();
		for (const lang of LANGS) {
			const avail = BUILT_IN_TRANSLATIONS.filter((tr) => tr.lang === lang && !enabled.has(tr.id));
			if (!avail.length) continue;
			menu.addItem((i) => i.setTitle(t.langName[lang]).setIsLabel(true));
			for (const tr of avail) {
				menu.addItem((i) =>
					i.setTitle(tr.abbr !== tr.name ? `${tr.abbr} — ${tr.name}` : tr.name).onClick(() => {
						s.enabled = [...new Set([...s.enabled, tr.id])];
						s.order = [...s.order.filter((x) => x !== tr.id), tr.id];
						void this.saveAndRebuild();
					}),
				);
			}
			menu.addSeparator();
		}
		menu.addItem((i) => i.setTitle(t.sOwnGroup).setIsLabel(true));
		menu.addItem((i) =>
			i
				.setTitle(t.sAddHelloAo)
				.setIcon("languages")
				.onClick(() => new HelloAoBrowser(this.app, this.plugin, () => void this.saveAndRebuild()).open()),
		);
		menu.addItem((i) => {
			i.setTitle(t.sAddAccordance)
				.setIcon("book-open")
				.onClick(() => this.addCustom("accordance"));
			if (!accordanceAvailable()) i.setDisabled(true);
		});
		menu.addItem((i) => i.setTitle(t.sAddBolls).setIcon("globe").onClick(() => this.addCustom("bolls")));
		menu.addItem((i) => i.setTitle(t.sAddFile).setIcon("file-json").onClick(() => this.addCustom("file")));
		const r = el.getBoundingClientRect();
		menu.showAtPosition({ x: r.left, y: r.bottom });
	}

	private addCustom(source: Translation["source"]): void {
		const s = this.plugin.settings;
		const tr: Translation = { id: `custom-${Date.now().toString(36)}`, name: "", abbr: "", lang: "ko", source };
		s.custom.push(tr);
		s.order.push(tr.id);
		void this.saveAndRebuild();
		new TranslationModal(this.app, this.plugin, tr, () => this.update()).open();
	}

	// ── Hotkeys & presets ──────────────────────────────────────────
	private hotkeyItem(commandId: string, name: string, desc: string): SettingDefinition {
		return {
			name,
			desc,
			aliases: ["hotkey", "shortcut", "단축키"],
			render: (setting) => renderHotkeyControl(this.plugin, setting, commandId),
		};
	}

	private presetItem(p: Preset): SettingDefinition {
		const names = this.plugin
			.allTranslations()
			.filter((tr) => p.translations.includes(tr.id))
			.map((tr) => tr.abbr || tr.name);
		return {
			name: `${t.cmdPreset(p.name || t.sUnnamed)}`,
			desc: names.join(" · ") || t.sPresetDesc,
			aliases: ["preset", "프리셋"],
			render: (setting) => {
				renderHotkeyControl(this.plugin, setting, this.plugin.presetCommandId(p));
				setting.addExtraButton((x) =>
					x
						.setIcon("pencil")
						.setTooltip(t.sEdit)
						.onClick(() => new PresetModal(this.app, this.plugin, p, () => this.update()).open()),
				);
			},
		};
	}
}

/** Shows the command's current hotkey and a button that opens Obsidian's Hotkeys screen. */
function renderHotkeyControl(plugin: VersedropPlugin, setting: Setting, commandId: string): void {
	const keys = hotkeysFor(plugin.app, `${plugin.manifest.id}:${commandId}`);
	setting.controlEl.createSpan({ cls: `versedrop-hotkey${keys ? "" : " is-empty"}`, text: keys || t.sNoHotkey });
	setting.addButton((b) =>
		b.setButtonText(keys ? t.sChangeHotkey : t.sSetHotkey).onClick(() => openHotkeySettings(plugin.app, "Versedrop")),
	);
}

/** A help topic shown as its own settings page. */
class HelpPage extends SettingPage {
	constructor(private topic: HelpTopic) {
		super();
		this.title = topic.title;
	}

	display(): void {
		this.containerEl.empty();
		const box = this.containerEl.createDiv({ cls: "versedrop-help" });
		for (const p of this.topic.paras) box.createEl("p", { text: p });
	}
}

/** Edits a translation the user added (Accordance module, bolls.life code or JSON file). */
export class TranslationModal extends Modal {
	private nameInput: TextComponent | null = null;
	constructor(
		app: App,
		private plugin: VersedropPlugin,
		private tr: Translation,
		private onDone: () => void,
	) {
		super(app);
	}

	onOpen(): void {
		const { contentEl } = this;
		const tr = this.tr;
		const save = () => void this.plugin.saveSettings();
		const kind = tr.source === "bolls" ? t.sKindBolls : tr.source === "helloao" ? t.sKindHelloAo : tr.source === "file" ? t.sKindFile : t.sKindAccordance;
		this.titleEl.setText(`${t.sEdit} · ${kind}`);

		new Setting(contentEl).setName(t.sName).addText((x) =>
			(this.nameInput = x)
				.setPlaceholder(t.sNamePlaceholder)
				.setValue(tr.name)
				.onChange((v) => {
					tr.name = v.trim();
					// HelloAO translations keep their own short name (e.g. LUT1912) for headers.
					if (tr.source !== "helloao" || !tr.abbr) tr.abbr = v.trim();
					save();
				}),
		);

		const usesCode = tr.source === "bolls" || tr.source === "helloao";
		const label = tr.source === "bolls" ? t.sCode : tr.source === "helloao" ? "HelloAO ID" : tr.source === "file" ? t.sPath : t.sModule;
		const current = (usesCode ? tr.code : tr.source === "file" ? tr.path : tr.module) ?? "";
		const src = new Setting(contentEl).setName(label).addText((x) => {
			this.pathInput = x.inputEl;
			x.setValue(current).onChange((v) => {
				const val = v.trim();
				if (usesCode) tr.code = val;
				else if (tr.source === "file") tr.path = val;
				else tr.module = val;
				this.plugin.source.clearCache();
				save();
			});
			if (tr.source === "file") {
				x.setPlaceholder(t.sPathPlaceholder);
				new JsonFileSuggest(this.app, x.inputEl).onSelect((file) => void this.useFile(file.path));
			}
		});
		if (tr.source === "helloao") {
			src.setDesc(t.haInfo(tr.code ?? ""));
			if (tr.link) {
				const link = tr.link;
				src.addButton((b) => b.setButtonText(t.haOpenLicense).onClick(() => window.open(link)));
			}
		}
		if (tr.source === "file") {
			src.setDesc(t.sPathDesc);
			src.addExtraButton((b) =>
				b
					.setIcon("folder-search")
					.setTooltip(t.sPickInVault)
					.onClick(() => new JsonFileModal(this.app, (file) => void this.useFile(file.path)).open()),
			);
			src.addExtraButton((b) =>
				b
					.setIcon("upload")
					.setTooltip(t.sImportFile)
					.onClick(() => this.importFromComputer()),
			);
			new Setting(contentEl)
				.setName(t.sImportFile)
				.setDesc(t.sImportFileDesc)
				.addButton((b) => b.setButtonText(t.sChooseFile).setCta().onClick(() => this.importFromComputer()))
				.addButton((b) =>
					b.setButtonText(t.sPickInVault).onClick(() => new JsonFileModal(this.app, (file) => void this.useFile(file.path)).open()),
				);
			renderImportFolder(new Setting(contentEl).setName(t.sImportFolder), this.app, this.plugin);
		}
		if (tr.source === "accordance") {
			src.addButton((b) =>
				b.setButtonText(t.sTest).onClick(() => {
					b.setDisabled(true);
					const waiting = new Notice(t.accRunning, 0);
					void this.testCoverage(tr)
						.then((msg) => {
							new Notice(msg, 10000);
							this.renderCoverage();
						})
						.catch((e: Error) => new Notice(e.message, 15000))
						.finally(() => {
							waiting.hide();
							b.setDisabled(false);
						});
				}),
			);
		}

		new Setting(contentEl).setName(t.sLang).addDropdown((d) =>
			d
				.addOptions(Object.fromEntries([...LANGS, ...(LANGS.includes(tr.lang) ? [] : [tr.lang])].map((l) => [l, langLabel(l, tr.langLabel)])))
				.setValue(tr.lang)
				.onChange((v) => {
					tr.lang = v;
					save();
				}),
		);

		this.coverageEl = contentEl.createDiv();
		this.renderCoverage();

		const known = knownCitation(tr.name, tr.module, tr.code);
		new Setting(contentEl)
			.setName(t.sCitation)
			.setDesc(known && !tr.citation ? t.sCitationKnown : t.sCitationDesc)
			.addText((x) => {
				x.inputEl.addClass("versedrop-citation-input");
				x.setPlaceholder(known?.text ?? t.sCitationPlaceholder)
					.setValue(tr.citation ?? "")
					.onChange((v) => {
						tr.citation = v.trim();
						save();
					});
			});

		new Setting(contentEl).addButton((b) => b.setButtonText(t.sDone).setCta().onClick(() => this.close()));
	}

	private coverageEl!: HTMLElement;
	private pathInput?: HTMLInputElement;

	/** Sets the JSON path, checks the file and reports what it contains. */
	private async useFile(path: string): Promise<void> {
		const tr = this.tr;
		tr.path = path;
		if (this.pathInput) this.pathInput.value = path;
		this.plugin.source.clearCache();
		try {
			const info = await this.plugin.source.inspectFile(path);
			tr.testament = info.ot && info.nt ? undefined : info.ot ? "OT" : "NT";
			tr.deutero = info.deutero || undefined;
			if (!tr.name) {
				// Use the name the file declares ("version": "개역개정"), else the file name.
				const base = info.meta.name ?? path.split("/").pop()?.replace(/\.json$/i, "") ?? "";
				tr.name = base;
				tr.abbr = base;
				this.nameInput?.setValue(base);
			}
			const scope = (info.ot && info.nt ? t.sTestAll : info.ot ? t.sTestOT : t.sTestNT) + (info.deutero ? ` + ${t.sDeutero}` : "");
			new Notice(t.fileOk(info.chapters, info.verses, scope), 8000);
			this.renderCoverage();
		} catch (e) {
			new Notice((e as Error).message, 12000);
		}
		await this.plugin.saveSettings();
	}

	/** Lets the user pick a JSON file from their computer, copies it into the vault and uses it. */
	private importFromComputer(): void {
		const input = createEl("input", { attr: { type: "file", accept: ".json,application/json" } });
		input.addEventListener("change", () => {
			const file = input.files?.[0];
			if (!file) return;
			void file.text().then(async (text) => {
				try {
					JSON.parse(text.replace(/^\uFEFF/, ""));
				} catch {
					new Notice(t.errJson(file.name), 10000);
					return;
				}
				const folder = cleanFolderPath(this.plugin.settings.importFolder);
				const problem = folder ? folderPathProblem(folder) : null;
				if (problem) {
					new Notice(problem, 10000);
					return;
				}
				if (!(await ensureFolder(this.app, folder))) {
					new Notice(t.sFolderFileInWay(folder), 10000);
					return;
				}
				const safe = file.name.replace(/[\\/:*?"<>|]/g, "_");
				let path = normalizePath(folder ? `${folder}/${safe}` : safe);
				const existing = this.app.vault.getAbstractFileByPath(path);
				if (existing instanceof TFile) await this.app.vault.modify(existing, text);
				else {
					if (existing) path = normalizePath(folder ? `${folder}/${Date.now()}-${safe}` : `${Date.now()}-${safe}`);
					await this.app.vault.create(path, text);
				}
				new Notice(t.fileImported(path), 6000);
				await this.useFile(path);
			});
		});
		input.click();
	}


	/** "Contains" dropdown: whole Bible, OT only or NT only (hides cards for books the module lacks). */
	private renderCoverage(): void {
		const tr = this.tr;
		this.coverageEl.empty();
		new Setting(this.coverageEl)
			.setName(t.sTestament)
			.setDesc(t.sTestamentDesc)
			.addDropdown((d) =>
				d
					.addOptions({ all: t.sTestAll, OT: t.sTestOT, NT: t.sTestNT })
					.setValue(tr.testament ?? "all")
					.onChange((v) => {
						tr.testament = v === "all" ? undefined : (v as "OT" | "NT");
						void this.plugin.saveSettings();
					}),
			);
		// bolls.life numbers deuterocanonical books its own way, so only files, HelloAO and Accordance offer this.
		if (tr.source !== "bolls")
			new Setting(this.coverageEl)
				.setName(t.sDeuteroToggle)
				.setDesc(t.sDeuteroToggleDesc)
				.addToggle((x) =>
					x.setValue(!!tr.deutero).onChange((v) => {
						tr.deutero = v || undefined;
						void this.plugin.saveSettings();
					}),
				);
	}

	/**
	 * Tries an OT and an NT verse (Hebrew modules are usually OT only, Greek ones NT or LXX),
	 * then records which testaments the module covers.
	 */
	private async testCoverage(tr: Translation): Promise<string> {
		this.plugin.source.clearCache();
		const probe = { ...tr, id: `${tr.id}-test`, testament: undefined };
		const order = tr.lang === "he" ? ["Gen 1:1", "John 1:1"] : ["John 3:16", "Gen 1:1"];
		const found: Record<string, string> = {};
		let lastError: Error | null = null;
		for (const q of order) {
			try {
				const verses = await this.plugin.source.getPassage(probe, parseReference(q));
				if (verses.length) found[q.startsWith("Gen") ? "OT" : "NT"] = `${q} ${verses[0].text}`;
			} catch (e) {
				lastError = e as Error;
				// Stop early on errors that are not about a missing book (permission, Accordance missing …)
				if (!/찾지 못했어요|found no text/.test(lastError.message)) throw lastError;
			}
		}
		const ot = !!found.OT;
		const nt = !!found.NT;
		if (!ot && !nt) throw lastError ?? new Error(t.accBadModule(tr.module ?? ""));
		tr.testament = ot && nt ? undefined : ot ? "OT" : "NT";
		// Deuterocanon: try Tobit 1:1 (modules such as NRSV with Apocrypha, 공동번역)
		if (!nt || ot) {
			try {
				const v = await this.plugin.source.getPassage({ ...probe, deutero: true }, parseReference("Tob 1:1"));
				tr.deutero = v.length ? true : undefined;
			} catch {
				tr.deutero = undefined;
			}
		}
		await this.plugin.saveSettings();
		const sample = (found.NT ?? found.OT ?? "").slice(0, 70);
		const scope = (ot && nt ? t.sTestAll : ot ? t.sTestOT : t.sTestNT) + (tr.deutero ? ` + ${t.sDeutero}` : "");
		return t.accTestCoverage(tr.module ?? "", scope, sample);
	}

	onClose(): void {
		this.contentEl.empty();
		void this.plugin.saveSettings().then(() => this.onDone());
	}
}

/** Edits a preset: its name and which translations it inserts. */
class PresetModal extends Modal {
	constructor(
		app: App,
		private plugin: VersedropPlugin,
		private preset: Preset,
		private onDone: () => void,
	) {
		super(app);
	}

	onOpen(): void {
		const { contentEl } = this;
		const p = this.preset;
		this.titleEl.setText(t.sPresets);

		new Setting(contentEl).setName(t.sName).addText((x) =>
			x
				.setPlaceholder(t.sPresetNamePlaceholder)
				.setValue(p.name)
				.onChange((v) => {
					p.name = v.trim();
				}),
		);

		new Setting(contentEl).setName(t.sPresetTranslations).setDesc(t.sPresetDesc);
		const chips = contentEl.createDiv({ cls: "versedrop-chips" });
		const chosen = new Set(p.translations);
		for (const tr of this.plugin.allTranslations()) {
			const chip = chips.createEl("button", { text: tr.abbr || tr.name, cls: "versedrop-chip" });
			chip.setAttr("title", tr.name);
			const paint = () => {
				chip.toggleClass("is-active", chosen.has(tr.id));
				chip.setAttr("aria-pressed", String(chosen.has(tr.id)));
			};
			paint();
			chip.addEventListener("click", () => {
				if (chosen.has(tr.id)) chosen.delete(tr.id);
				else chosen.add(tr.id);
				paint();
				p.translations = this.plugin
					.allTranslations()
					.map((x) => x.id)
					.filter((id) => chosen.has(id));
			});
		}

		new Setting(contentEl).addButton((b) => b.setButtonText(t.sDone).setCta().onClick(() => this.close()));
	}

	onClose(): void {
		this.contentEl.empty();
		this.plugin.unregisterPreset(this.preset);
		this.plugin.registerPreset(this.preset);
		void this.plugin.saveSettings().then(() => this.onDone());
	}
}
