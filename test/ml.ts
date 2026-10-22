import { parseReference } from "../src/reference";
import { formatPassages } from "../src/format";
import { BUILT_IN_TRANSLATIONS, hasBook, noticeFor, isCopyrighted, Translation } from "../src/sources";
import { DEFAULT_SETTINGS } from "../src/settings";
for (const q of ["约翰福音3:16","约3:16","約翰福音3章16節","ヨハネによる福音書3:16","ヨハ3章16節","林前13:4-7","1コリ13:4-7","诗23","詩篇23"]) { const r=parseReference(q); console.log(q,"→",r.book.ko,r.chapter,JSON.stringify(r.ranges)); }
const B=(id:string)=>BUILT_IN_TRANSLATIONS.find(t=>t.id===id)!;
console.log("SBLGNT has Gen?", hasBook(B("SBLGNT"),1), "John?", hasBook(B("SBLGNT"),43), "WLC has John?", hasBook(B("WLC"),43));
const ref=parseReference("요 3:16");
const v=[{verse:16,text:"…"}];
const ps=["CUV","JPKJV","SBLGNT","DHNT"].map(id=>({translation:B(id),verses:v}));
console.log(formatPassages(ref, ps, DEFAULT_SETTINGS));
console.log("\n"+formatPassages(ref, ps, {...DEFAULT_SETTINGS, group:true, bookName:"short"}));
const c=(name:string,code?:string):Translation=>({id:name,name,abbr:name,lang:"zh",source:"bolls",code});
for (const x of [c("和合本(简)","CUNPS"),c("新共同訳","JPNICT"),c("NA28","NA28"),c("LXX","LXX"),c("BHS","BHS-W4")]) console.log(x.name, isCopyrighted(x), noticeFor(x)?.text.slice(0,50));
const zs = {...B("CUV"), script:"simplified" as const, id:"x", name:"和合本(简)"};
console.log(formatPassages(ref,[{translation:zs,verses:v}],DEFAULT_SETTINGS));
