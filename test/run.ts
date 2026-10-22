import { parseReference } from "../src/reference";
import { formatPassages } from "../src/format";
import { cleanText, indexLocalBible } from "../src/sources";
import { DEFAULT_SETTINGS } from "../src/settings";

const cases = ["요 3:16","요3:16-18","요한복음 3장 16절","요 3장 16~18절","고전 13:4-7","시 23","롬 8:28, 31-39",
 "John 3:16","Jn 3.16","1 Cor 13:4-7","1Cor13:4","Ps 23","Song of Songs 2:1","요일 1:9","딛 2:11-14","잠 19:20-21",
 "Phlm 1:6","Phil 4:13","Jonah 1:17","Rev. 21:4","삼상 17:45","계 22:20"];
for (const c of cases) { const r = parseReference(c); console.log(c.padEnd(20), "→", r.book.ko, r.chapter, JSON.stringify(r.ranges)); }
for (const bad of ["xyz 3:16","요","요 3:18-16"]) { try { parseReference(bad); console.log("NO ERROR", bad);} catch(e){ console.log("err ok:", bad, "→", (e as Error).message);} }

console.log("\nclean:", cleanText('For<S>1063</S> God<S>2316</S> so<S>3779</S> loved<S>25</S> the world<S>2889</S>, that ... <sup>again: or, from above</sup>'));
console.log("clean:", cleanText("<천지 창조> 태초에 하나님이 천지를 창조하시니라 &amp; done"));

const ref = parseReference("요 3:16-17, 19");
const kr = { translation: { id:"KRV", name:"개역한글", abbr:"개역한글", lang:"ko" as const, source:"bolls" as const }, verses:[{verse:16,text:"하나님이 세상을 이처럼 사랑하사"},{verse:17,text:"하나님이 그 아들을"},{verse:19,text:"그 정죄는 이것이니"}] };
const en = { translation: { id:"KJV", name:"King James Version", abbr:"KJV", lang:"en" as const, source:"bolls" as const }, verses:[{verse:16,text:"For God so loved the world"},{verse:17,text:"For God sent not"},{verse:19,text:"And this is the condemnation"}] };
console.log("\n--- callout, separate ---\n" + formatPassages(ref, [kr, en], DEFAULT_SETTINGS));
console.log("\n--- callout, grouped, per line ---\n" + formatPassages(ref, [kr, en], {...DEFAULT_SETTINGS, group:true, versePerLine:true}));
console.log("\n--- quote, short names, plain nums ---\n" + formatPassages(ref, [kr], {...DEFAULT_SETTINGS, style:"quote", bookName:"short", verseNumbers:"plain"}));
console.log("\n--- plain ---\n" + formatPassages(parseReference("Ps 23:1"), [en], {...DEFAULT_SETTINGS, style:"plain"}));

const flat = indexLocalBible({"창1:1":" <천지 창조> 태초에 하나님이 천지를 창조하시니라","창1:2":"땅이 혼돈하고","요3:16":"하나님이 세상을"});
console.log("\nflat:", [...flat.entries()]);
const nested = indexLocalBible({"43":{"3":{"16":"nested text"}}});
console.log("nested:", [...nested.entries()]);
const arr = indexLocalBible([{book:43,chapter:3,verse:16,text:"array text"}]);
console.log("array:", [...arr.entries()]);
