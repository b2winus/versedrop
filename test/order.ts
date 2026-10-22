import { sortByOrder, DEFAULT_SETTINGS } from "../src/settings";
import { BUILT_IN_TRANSLATIONS } from "../src/sources";
const list = [...BUILT_IN_TRANSLATIONS.filter(t=>["KRV","KJV","NET","ESV"].includes(t.id)), {id:"custom-a",name:"개역개정",abbr:"개역개정",lang:"ko" as const,source:"accordance" as const}];
console.log(sortByOrder(list, ["custom-a","NET","KRV"]).map(t=>t.id).join(" > "));
console.log("default order:", DEFAULT_SETTINGS.order.join(","));
