# Changelog

Each release's notes on GitHub are filled in from the matching section below.
Requires Obsidian 1.13+ since 0.6.0.

## 0.8.6

- New **Interface language** option (Settings → General): Same as Obsidian, 한국어, English, 简体中文 or 繁體中文. The settings page switches right away; command names in the command palette follow after Obsidian restarts.

## 0.8.5

Same features as 0.8.4, released properly: 0.8.4 was published without its files because the leftover ESV adapter stopped the build. The adapter is removed and releases are now built and attached automatically.

## 0.8.4

Simpler settings and a tidier search window.

- The first settings screen shows only **Insert these** and the search-window option. Everything else is one click away under **More**: My translations (with the JSON folder), How passages look, Hotkeys and presets, Logos · Accordance links, Help. Each entry shows its current value.
- **How passages look** has a live preview of John 3:16-17 that changes as you adjust the block style, verse numbers, book names and notices.
- Search window: the reference is shown as a heading, the Insert button shows how many translations go in, and the footer is separated from the results.

## 0.8.3

- **ESV no longer needs an API key.** It stays in the + menu and now comes from bolls.life (like 새번역): off by default, © Crossway notice under every quotation, for personal study. The ESV API key setting is gone and a saved key is cleared.
- **Save to folder** now has a full-width path field under its description, so long paths stay readable.
- README: how to use ESV, and NIV through Accordance modules or Logos links.

## 0.8.2

Review fixes and automated releases.

- The import-folder check now uses Obsidian's configured config folder (`Vault#configDir`) instead of assuming `.obsidian`, and also refuses a renamed config folder.
- Releases are built by GitHub Actions from this repository, with artifact attestations for `main.js`, `styles.css` and `manifest.json`, and release notes taken from this changelog.
- README: what the plugin can see and change in your vault, and how to verify a release.

## 0.8.1

Cleaner settings and search window.

- New **Insert these** list at the top of settings: the translations inserted when you find a passage, in that order (drag to reorder, + to add). Replaces the ☑ boxes.
- The search window shows only those translations, already ticked. The rest stay folded under **Other translations** and load only when opened. Ticks in the window apply to that insertion only.
- New option **After finding a passage**: *Preview, then insert* or *Insert right away* (Enter inserts immediately).
- **My translations** rows are one short line (language · source).
- New installs start with a shorter list: 개역한글, KJV, BSB, NET. Existing lists are unchanged.

## 0.8.0

Chinese.

- Interface and help in Simplified and Traditional Chinese, following Obsidian's language setting.
- New built-in 和合本（简体）: the public-domain 1919 Chinese Union Version, converted to simplified characters on your device (OpenCC).
- Copyright notices for 和合本修订版, 新译本, 当代译本, 中文标准译本, 现代中文译本 and 吕振中译本; CNVS now maps to 新译本.
- HelloAO Chinese translations show book names in their own script. README has a 中文 section.

## 0.7.5

- Deuterocanonical books (Tobit, Judith, Wisdom, Sirach, Baruch, 1–2 Maccabees, Greek additions to Esther and Daniel) in translations that contain them: JSON files, HelloAO and Accordance.
- Korean (공동번역 and Catholic), English, Chinese and Japanese book names; `단 13` falls back to the additions where they are a separate book.

## 0.7.4

- JSON files shaped `{"version": …, "data": [{ bookCode, chapter, verse, text }]}`; book codes win over numbers; the translation name is read from the file.
- Repeated or empty verses are tidied up; separate notices for 표준새번역, 공동번역 and 공동번역 개정판.

## 0.7.3

- Choose or create the vault folder that imported JSON files are saved to.

## 0.7.2

- Passages that cross chapters (`John 3:16-4:3`, `Gen 1-2`), up to 10 chapters.
- Description and README cover the 1,000+ languages available.
