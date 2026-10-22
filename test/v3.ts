import { parseReference } from "../src/reference";
import { formatPassages } from "../src/format";
import { parseEsvText, parseNetJson, noticeFor, isCopyrighted, BUILT_IN_TRANSLATIONS, Translation } from "../src/sources";
import { DEFAULT_SETTINGS } from "../src/settings";

console.log("default enabled:", DEFAULT_SETTINGS.enabled.join(","));
console.log("ESV parse:", parseEsvText(["\n  [16] “For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. [17] For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.\n\n (ESV)"]));
console.log("NET parse:", parseNetJson([{bookname:"John",chapter:"3",verse:"16",text:"For this is the way God loved the world: He gave his one and only Son,"},{bookname:"John",chapter:"3",verse:"17",text:"For God did not send"}], 3));

const custom = (name: string, module?: string): Translation => ({ id: name, name, abbr: name, lang: "ko", source: "accordance", module });
for (const c of [custom("개역개정","KRV-NK"), custom("NIV","NIV11"), custom("ESV","ESVS"), custom("My Bible","XYZ"), custom("공동번역")]) {
  console.log(c.name.padEnd(10), isCopyrighted(c), noticeFor(c)?.text.slice(0, 60));
}
const B = (id: string) => BUILT_IN_TRANSLATIONS.find((t) => t.id === id)!;
const ref = parseReference("요 3:16-17");
const v = [{ verse: 16, text: "본문 16" }, { verse: 17, text: "본문 17" }];
const nk = { translation: custom("개역개정","KRV-NK"), verses: v };
const krv = { translation: B("KRV"), verses: v };
const net = { translation: B("NET"), verses: v };
const esv = { translation: B("ESV"), verses: v };
console.log("\n--- default (copyrighted only) ---\n" + formatPassages(ref, [krv, nk, net], DEFAULT_SETTINGS));
console.log("\n--- off (NET/ESV still) ---\n" + formatPassages(ref, [nk, esv], { ...DEFAULT_SETTINGS, citations: "off" }));
console.log("\n--- grouped, all ---\n" + formatPassages(ref, [krv, nk, net], { ...DEFAULT_SETTINGS, citations: "all", group: true }));
console.log("\n--- plain ---\n" + formatPassages(ref, [nk], { ...DEFAULT_SETTINGS, style: "plain" }));
console.log("\n--- quote ---\n" + formatPassages(ref, [nk], { ...DEFAULT_SETTINGS, style: "quote" }));
