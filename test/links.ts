import { parseReference } from "../src/reference";
import { logosUrl, accordanceUrl } from "../src/links";
import { formatPassages } from "../src/format";
import { parseAccordanceOutput } from "../src/accordance";
import { DEFAULT_SETTINGS } from "../src/settings";

for (const [r, lv, am] of [["요 3:16","",""],["1 Cor 13:4-7","ESV","ESVS"],["롬 8:28, 31-39","NASB95",""],["시 23","",""],["아 2:1","","KJV"],["딛 2:11-14","","개역개정"]]) {
  const ref = parseReference(r);
  console.log(r.padEnd(16), logosUrl(ref, lv), " | ", accordanceUrl(ref, am));
}
const SEP="\u001e";
console.log(parseAccordanceOutput(`16\tFor God so loved the world${SEP}17\t17 For God sent not${SEP}18\tErr: bad${SEP}`));
console.log(parseAccordanceOutput(`16\tJohn 3:16 For God so loved${SEP}`));

const ref = parseReference("요 3:16");
const acc = { translation:{id:"c1",name:"개역개정",abbr:"개역개정",lang:"ko" as const,source:"accordance" as const,module:"KRV-NK"}, verses:[{verse:16,text:"하나님이 세상을 이처럼 사랑하사"}]};
const kjv = { translation:{id:"KJV",name:"King James Version",abbr:"KJV",lang:"en" as const,source:"bolls" as const}, verses:[{verse:16,text:"For God so loved the world"}]};
console.log("\n" + formatPassages(ref, [acc, kjv], {...DEFAULT_SETTINGS, appLinks:"both", logosVersion:"ESV", accordanceModule:"KJVS"}));
console.log("\n" + formatPassages(ref, [acc, kjv], {...DEFAULT_SETTINGS, appLinks:"logos", group:true}));
