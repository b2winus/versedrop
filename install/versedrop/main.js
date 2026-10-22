"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VersedropPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// src/books.ts
var ZH = "\u521B\u4E16\u8BB0 \u51FA\u57C3\u53CA\u8BB0 \u5229\u672A\u8BB0 \u6C11\u6570\u8BB0 \u7533\u547D\u8BB0 \u7EA6\u4E66\u4E9A\u8BB0 \u58EB\u5E08\u8BB0 \u8DEF\u5F97\u8BB0 \u6492\u6BCD\u8033\u8BB0\u4E0A \u6492\u6BCD\u8033\u8BB0\u4E0B \u5217\u738B\u7EAA\u4E0A \u5217\u738B\u7EAA\u4E0B \u5386\u4EE3\u5FD7\u4E0A \u5386\u4EE3\u5FD7\u4E0B \u4EE5\u65AF\u62C9\u8BB0 \u5C3C\u5E0C\u7C73\u8BB0 \u4EE5\u65AF\u5E16\u8BB0 \u7EA6\u4F2F\u8BB0 \u8BD7\u7BC7 \u7BB4\u8A00 \u4F20\u9053\u4E66 \u96C5\u6B4C \u4EE5\u8D5B\u4E9A\u4E66 \u8036\u5229\u7C73\u4E66 \u8036\u5229\u7C73\u54C0\u6B4C \u4EE5\u897F\u7ED3\u4E66 \u4F46\u4EE5\u7406\u4E66 \u4F55\u897F\u963F\u4E66 \u7EA6\u73E5\u4E66 \u963F\u6469\u53F8\u4E66 \u4FC4\u5DF4\u5E95\u4E9A\u4E66 \u7EA6\u62FF\u4E66 \u5F25\u8FE6\u4E66 \u90A3\u9E3F\u4E66 \u54C8\u5DF4\u8C37\u4E66 \u897F\u756A\u96C5\u4E66 \u54C8\u8BE5\u4E66 \u6492\u8FE6\u5229\u4E9A\u4E66 \u739B\u62C9\u57FA\u4E66 \u9A6C\u592A\u798F\u97F3 \u9A6C\u53EF\u798F\u97F3 \u8DEF\u52A0\u798F\u97F3 \u7EA6\u7FF0\u798F\u97F3 \u4F7F\u5F92\u884C\u4F20 \u7F57\u9A6C\u4E66 \u54E5\u6797\u591A\u524D\u4E66 \u54E5\u6797\u591A\u540E\u4E66 \u52A0\u62C9\u592A\u4E66 \u4EE5\u5F17\u6240\u4E66 \u8153\u7ACB\u6BD4\u4E66 \u6B4C\u7F57\u897F\u4E66 \u5E16\u6492\u7F57\u5C3C\u8FE6\u524D\u4E66 \u5E16\u6492\u7F57\u5C3C\u8FE6\u540E\u4E66 \u63D0\u6469\u592A\u524D\u4E66 \u63D0\u6469\u592A\u540E\u4E66 \u63D0\u591A\u4E66 \u8153\u5229\u95E8\u4E66 \u5E0C\u4F2F\u6765\u4E66 \u96C5\u5404\u4E66 \u5F7C\u5F97\u524D\u4E66 \u5F7C\u5F97\u540E\u4E66 \u7EA6\u7FF0\u4E00\u4E66 \u7EA6\u7FF0\u4E8C\u4E66 \u7EA6\u7FF0\u4E09\u4E66 \u72B9\u5927\u4E66 \u542F\u793A\u5F55".split(" ");
var ZH_SHORT = "\u521B \u51FA \u5229 \u6C11 \u7533 \u4E66 \u58EB \u5F97 \u6492\u4E0A \u6492\u4E0B \u738B\u4E0A \u738B\u4E0B \u4EE3\u4E0A \u4EE3\u4E0B \u62C9 \u5C3C \u65AF \u4F2F \u8BD7 \u7BB4 \u4F20 \u6B4C \u8D5B \u8036 \u54C0 \u7ED3 \u4F46 \u4F55 \u73E5 \u6469 \u4FC4 \u62FF \u5F25 \u9E3F \u54C8 \u756A \u8BE5 \u4E9A \u739B \u592A \u53EF \u8DEF \u7EA6 \u5F92 \u7F57 \u6797\u524D \u6797\u540E \u52A0 \u5F17 \u8153 \u897F \u5E16\u524D \u5E16\u540E \u63D0\u524D \u63D0\u540E \u591A \u95E8 \u6765 \u96C5 \u5F7C\u524D \u5F7C\u540E \u7EA6\u4E00 \u7EA6\u4E8C \u7EA6\u4E09 \u72B9 \u542F".split(" ");
var TRAD = { \u521B: "\u5275", \u8BB0: "\u8A18", \u7EAA: "\u7D00", \u6570: "\u6578", \u7EA6: "\u7D04", \u4E66: "\u66F8", \u4E9A: "\u4E9E", \u5E08: "\u5E2B", \u5386: "\u6B77", \u8BD7: "\u8A69", \u4F20: "\u50B3", \u8D5B: "\u8CFD", \u7ED3: "\u7D50", \u5F25: "\u5F4C", \u9E3F: "\u9D3B", \u8BE5: "\u8A72", \u739B: "\u746A", \u9A6C: "\u99AC", \u7F57: "\u7F85", \u95E8: "\u9580", \u6765: "\u4F86", \u72B9: "\u7336", \u542F: "\u555F", \u5F55: "\u9304", \u540E: "\u5F8C" };
var toTrad = (x) => x.replace(/./gu, (c) => {
  var _a;
  return (_a = TRAD[c]) != null ? _a : c;
});
var JA = "\u5275\u4E16\u8A18 \u51FA\u30A8\u30B8\u30D7\u30C8\u8A18 \u30EC\u30D3\u8A18 \u6C11\u6570\u8A18 \u7533\u547D\u8A18 \u30E8\u30B7\u30E5\u30A2\u8A18 \u58EB\u5E2B\u8A18 \u30EB\u30C4\u8A18 \u30B5\u30E0\u30A8\u30EB\u8A18\u4E0A \u30B5\u30E0\u30A8\u30EB\u8A18\u4E0B \u5217\u738B\u7D00\u4E0A \u5217\u738B\u7D00\u4E0B \u6B74\u4EE3\u5FD7\u4E0A \u6B74\u4EE3\u5FD7\u4E0B \u30A8\u30BA\u30E9\u8A18 \u30CD\u30D8\u30DF\u30E4\u8A18 \u30A8\u30B9\u30C6\u30EB\u8A18 \u30E8\u30D6\u8A18 \u8A69\u7BC7 \u7BB4\u8A00 \u4F1D\u9053\u306E\u66F8 \u96C5\u6B4C \u30A4\u30B6\u30E4\u66F8 \u30A8\u30EC\u30DF\u30E4\u66F8 \u54C0\u6B4C \u30A8\u30BC\u30AD\u30A8\u30EB\u66F8 \u30C0\u30CB\u30A8\u30EB\u66F8 \u30DB\u30BB\u30A2\u66F8 \u30E8\u30A8\u30EB\u66F8 \u30A2\u30E2\u30B9\u66F8 \u30AA\u30D0\u30C7\u30E4\u66F8 \u30E8\u30CA\u66F8 \u30DF\u30AB\u66F8 \u30CA\u30DB\u30E0\u66F8 \u30CF\u30D0\u30AF\u30AF\u66F8 \u30BC\u30D1\u30CB\u30E4\u66F8 \u30CF\u30AC\u30A4\u66F8 \u30BC\u30AB\u30EA\u30E4\u66F8 \u30DE\u30E9\u30AD\u66F8 \u30DE\u30BF\u30A4\u306B\u3088\u308B\u798F\u97F3\u66F8 \u30DE\u30EB\u30B3\u306B\u3088\u308B\u798F\u97F3\u66F8 \u30EB\u30AB\u306B\u3088\u308B\u798F\u97F3\u66F8 \u30E8\u30CF\u30CD\u306B\u3088\u308B\u798F\u97F3\u66F8 \u4F7F\u5F92\u884C\u4F1D \u30ED\u30FC\u30DE\u4EBA\u3078\u306E\u624B\u7D19 \u30B3\u30EA\u30F3\u30C8\u4EBA\u3078\u306E\u7B2C\u4E00\u306E\u624B\u7D19 \u30B3\u30EA\u30F3\u30C8\u4EBA\u3078\u306E\u7B2C\u4E8C\u306E\u624B\u7D19 \u30AC\u30E9\u30C6\u30E4\u4EBA\u3078\u306E\u624B\u7D19 \u30A8\u30DA\u30BD\u4EBA\u3078\u306E\u624B\u7D19 \u30D4\u30EA\u30D4\u4EBA\u3078\u306E\u624B\u7D19 \u30B3\u30ED\u30B5\u30A4\u4EBA\u3078\u306E\u624B\u7D19 \u30C6\u30B5\u30ED\u30CB\u30B1\u4EBA\u3078\u306E\u7B2C\u4E00\u306E\u624B\u7D19 \u30C6\u30B5\u30ED\u30CB\u30B1\u4EBA\u3078\u306E\u7B2C\u4E8C\u306E\u624B\u7D19 \u30C6\u30E2\u30C6\u3078\u306E\u7B2C\u4E00\u306E\u624B\u7D19 \u30C6\u30E2\u30C6\u3078\u306E\u7B2C\u4E8C\u306E\u624B\u7D19 \u30C6\u30C8\u30B9\u3078\u306E\u624B\u7D19 \u30D4\u30EC\u30E2\u30F3\u3078\u306E\u624B\u7D19 \u30D8\u30D6\u30EB\u4EBA\u3078\u306E\u624B\u7D19 \u30E4\u30B3\u30D6\u306E\u624B\u7D19 \u30DA\u30C6\u30ED\u306E\u7B2C\u4E00\u306E\u624B\u7D19 \u30DA\u30C6\u30ED\u306E\u7B2C\u4E8C\u306E\u624B\u7D19 \u30E8\u30CF\u30CD\u306E\u7B2C\u4E00\u306E\u624B\u7D19 \u30E8\u30CF\u30CD\u306E\u7B2C\u4E8C\u306E\u624B\u7D19 \u30E8\u30CF\u30CD\u306E\u7B2C\u4E09\u306E\u624B\u7D19 \u30E6\u30C0\u306E\u624B\u7D19 \u30E8\u30CF\u30CD\u306E\u9ED9\u793A\u9332".split(" ");
var JA_SHORT = "\u5275 \u51FA \u30EC\u30D3 \u6C11 \u7533 \u30E8\u30B7 \u58EB \u30EB\u30C4 \u30B5\u30E0\u4E0A \u30B5\u30E0\u4E0B \u738B\u4E0A \u738B\u4E0B \u6B74\u4E0A \u6B74\u4E0B \u30A8\u30BA \u30CD\u30D8 \u30A8\u30B9 \u30E8\u30D6 \u8A69 \u7BB4 \u4F1D \u96C5\u6B4C \u30A4\u30B6 \u30A8\u30EC \u54C0 \u30A8\u30BC \u30C0\u30CB \u30DB\u30BB \u30E8\u30A8 \u30A2\u30E2 \u30AA\u30D0 \u30E8\u30CA \u30DF\u30AB \u30CA\u30DB \u30CF\u30D0 \u30BC\u30D1 \u30CF\u30AC \u30BC\u30AB \u30DE\u30E9 \u30DE\u30BF \u30DE\u30EB \u30EB\u30AB \u30E8\u30CF \u4F7F \u30ED\u30DE 1\u30B3\u30EA 2\u30B3\u30EA \u30AC\u30E9 \u30A8\u30DA \u30D4\u30EA \u30B3\u30ED 1\u30C6\u30B5 2\u30C6\u30B5 1\u30C6\u30E2 2\u30C6\u30E2 \u30C6\u30C8 \u30D4\u30EC \u30D8\u30D6 \u30E4\u30B3 1\u30DA\u30C6 2\u30DA\u30C6 1\u30E8\u30CF 2\u30E8\u30CF 3\u30E8\u30CF \u30E6\u30C0 \u9ED9".split(" ");
var RAW = [
  // ko, koShort, en, enShort, aliases (comma-separated)
  ["\uCC3D\uC138\uAE30", "\uCC3D", "Genesis", "Gen", "ge,gn,gen,\uCC3D\uC138"],
  ["\uCD9C\uC560\uAD7D\uAE30", "\uCD9C", "Exodus", "Exod", "ex,exo,exod,\uCD9C\uC560\uAD7D"],
  ["\uB808\uC704\uAE30", "\uB808", "Leviticus", "Lev", "le,lv,lev"],
  ["\uBBFC\uC218\uAE30", "\uBBFC", "Numbers", "Num", "nu,nm,nb,num"],
  ["\uC2E0\uBA85\uAE30", "\uC2E0", "Deuteronomy", "Deut", "dt,de,deu,deut"],
  ["\uC5EC\uD638\uC218\uC544", "\uC218", "Joshua", "Josh", "jos,jsh,josh,\uC5EC\uD638\uC218\uC544\uC11C"],
  ["\uC0AC\uC0AC\uAE30", "\uC0BF", "Judges", "Judg", "jdg,jg,jdgs,judg"],
  ["\uB8FB\uAE30", "\uB8FB", "Ruth", "Ruth", "ru,rth"],
  ["\uC0AC\uBB34\uC5D8\uC0C1", "\uC0BC\uC0C1", "1 Samuel", "1 Sam", "1sa,1sm,1sam,isam,1samuel"],
  ["\uC0AC\uBB34\uC5D8\uD558", "\uC0BC\uD558", "2 Samuel", "2 Sam", "2sa,2sm,2sam,iisam,2samuel"],
  ["\uC5F4\uC655\uAE30\uC0C1", "\uC655\uC0C1", "1 Kings", "1 Kgs", "1ki,1kg,1kgs,1kin,1kings"],
  ["\uC5F4\uC655\uAE30\uD558", "\uC655\uD558", "2 Kings", "2 Kgs", "2ki,2kg,2kgs,2kin,2kings"],
  ["\uC5ED\uB300\uC0C1", "\uB300\uC0C1", "1 Chronicles", "1 Chr", "1ch,1chr,1chron,1chronicles"],
  ["\uC5ED\uB300\uD558", "\uB300\uD558", "2 Chronicles", "2 Chr", "2ch,2chr,2chron,2chronicles"],
  ["\uC5D0\uC2A4\uB77C", "\uC2A4", "Ezra", "Ezra", "ezr,\uC5D0\uC2A4\uB77C\uC11C"],
  ["\uB290\uD5E4\uBBF8\uC57C", "\uB290", "Nehemiah", "Neh", "ne,neh,\uB290\uD5E4\uBBF8\uC57C\uC11C"],
  ["\uC5D0\uC2A4\uB354", "\uC5D0", "Esther", "Esth", "est,esth,es,\uC5D0\uC2A4\uB354\uC11C"],
  ["\uC6A5\uAE30", "\uC6A5", "Job", "Job", "jb"],
  ["\uC2DC\uD3B8", "\uC2DC", "Psalms", "Ps", "ps,psa,psm,pss,psalm,psalms"],
  ["\uC7A0\uC5B8", "\uC7A0", "Proverbs", "Prov", "pr,prv,pro,prov"],
  ["\uC804\uB3C4\uC11C", "\uC804", "Ecclesiastes", "Eccl", "ec,ecc,eccl,eccles,qoh"],
  ["\uC544\uAC00", "\uC544", "Song of Songs", "Song", "song,sos,sng,songofsolomon,songofsongs,cant,\uC544\uAC00\uC11C"],
  ["\uC774\uC0AC\uC57C", "\uC0AC", "Isaiah", "Isa", "is,isa,\uC774\uC0AC\uC57C\uC11C"],
  ["\uC608\uB808\uBBF8\uC57C", "\uB818", "Jeremiah", "Jer", "je,jer,jr,\uC608\uB808\uBBF8\uC57C\uC11C"],
  ["\uC608\uB808\uBBF8\uC57C\uC560\uAC00", "\uC560", "Lamentations", "Lam", "la,lam,\uC560\uAC00"],
  ["\uC5D0\uC2A4\uAC94", "\uAC94", "Ezekiel", "Ezek", "eze,ezek,ezk,\uC5D0\uC2A4\uAC94\uC11C"],
  ["\uB2E4\uB2C8\uC5D8", "\uB2E8", "Daniel", "Dan", "da,dan,dn,\uB2E4\uB2C8\uC5D8\uC11C"],
  ["\uD638\uC138\uC544", "\uD638", "Hosea", "Hos", "ho,hos,\uD638\uC138\uC544\uC11C"],
  ["\uC694\uC5D8", "\uC69C", "Joel", "Joel", "jl,joe,\uC694\uC5D8\uC11C"],
  ["\uC544\uBAA8\uC2A4", "\uC554", "Amos", "Amos", "am,amo,\uC544\uBAA8\uC2A4\uC11C"],
  ["\uC624\uBC14\uB31C", "\uC635", "Obadiah", "Obad", "ob,oba,obad,\uC624\uBC14\uB31C\uC11C"],
  ["\uC694\uB098", "\uC698", "Jonah", "Jonah", "jon,jnh,\uC694\uB098\uC11C"],
  ["\uBBF8\uAC00", "\uBBF8", "Micah", "Mic", "mi,mic,\uBBF8\uAC00\uC11C"],
  ["\uB098\uD6D4", "\uB098", "Nahum", "Nah", "na,nah,\uB098\uD6D4\uC11C"],
  ["\uD558\uBC15\uAD6D", "\uD569", "Habakkuk", "Hab", "hab,hb,\uD558\uBC15\uAD6D\uC11C"],
  ["\uC2A4\uBC14\uB0D0", "\uC2B5", "Zephaniah", "Zeph", "zep,zeph,zp,\uC2A4\uBC14\uB0D0\uC11C"],
  ["\uD559\uAC1C", "\uD559", "Haggai", "Hag", "hag,hg,\uD559\uAC1C\uC11C"],
  ["\uC2A4\uAC00\uB7B4", "\uC2A5", "Zechariah", "Zech", "zec,zech,zc,\uC2A4\uAC00\uB7B4\uC11C"],
  ["\uB9D0\uB77C\uAE30", "\uB9D0", "Malachi", "Mal", "mal,ml,\uB9D0\uB77C\uAE30\uC11C"],
  ["\uB9C8\uD0DC\uBCF5\uC74C", "\uB9C8", "Matthew", "Matt", "mt,mat,matt,\uB9C8\uD0DC"],
  ["\uB9C8\uAC00\uBCF5\uC74C", "\uB9C9", "Mark", "Mark", "mk,mrk,mar,\uB9C8\uAC00"],
  ["\uB204\uAC00\uBCF5\uC74C", "\uB205", "Luke", "Luke", "lk,luk,\uB204\uAC00"],
  ["\uC694\uD55C\uBCF5\uC74C", "\uC694", "John", "John", "jn,jhn,joh"],
  ["\uC0AC\uB3C4\uD589\uC804", "\uD589", "Acts", "Acts", "ac,act"],
  ["\uB85C\uB9C8\uC11C", "\uB86C", "Romans", "Rom", "ro,rom,rm"],
  ["\uACE0\uB9B0\uB3C4\uC804\uC11C", "\uACE0\uC804", "1 Corinthians", "1 Cor", "1co,1cor,1corinthians"],
  ["\uACE0\uB9B0\uB3C4\uD6C4\uC11C", "\uACE0\uD6C4", "2 Corinthians", "2 Cor", "2co,2cor,2corinthians"],
  ["\uAC08\uB77C\uB514\uC544\uC11C", "\uAC08", "Galatians", "Gal", "ga,gal"],
  ["\uC5D0\uBCA0\uC18C\uC11C", "\uC5E1", "Ephesians", "Eph", "eph,ephes"],
  ["\uBE4C\uB9BD\uBCF4\uC11C", "\uBE4C", "Philippians", "Phil", "php,phil,pp"],
  ["\uACE8\uB85C\uC0C8\uC11C", "\uACE8", "Colossians", "Col", "col,co"],
  ["\uB370\uC0B4\uB85C\uB2C8\uAC00\uC804\uC11C", "\uC0B4\uC804", "1 Thessalonians", "1 Thess", "1th,1thes,1thess,1thessalonians"],
  ["\uB370\uC0B4\uB85C\uB2C8\uAC00\uD6C4\uC11C", "\uC0B4\uD6C4", "2 Thessalonians", "2 Thess", "2th,2thes,2thess,2thessalonians"],
  ["\uB514\uBAA8\uB370\uC804\uC11C", "\uB524\uC804", "1 Timothy", "1 Tim", "1ti,1tm,1tim,1timothy"],
  ["\uB514\uBAA8\uB370\uD6C4\uC11C", "\uB524\uD6C4", "2 Timothy", "2 Tim", "2ti,2tm,2tim,2timothy"],
  ["\uB514\uB3C4\uC11C", "\uB51B", "Titus", "Titus", "ti,tit"],
  ["\uBE4C\uB808\uBAAC\uC11C", "\uBAAC", "Philemon", "Phlm", "phm,phlm,philem"],
  ["\uD788\uBE0C\uB9AC\uC11C", "\uD788", "Hebrews", "Heb", "he,heb"],
  ["\uC57C\uACE0\uBCF4\uC11C", "\uC57D", "James", "Jas", "jas,jm,jam"],
  ["\uBCA0\uB4DC\uB85C\uC804\uC11C", "\uBCA7\uC804", "1 Peter", "1 Pet", "1pe,1pt,1pet,1peter"],
  ["\uBCA0\uB4DC\uB85C\uD6C4\uC11C", "\uBCA7\uD6C4", "2 Peter", "2 Pet", "2pe,2pt,2pet,2peter"],
  ["\uC694\uD55C\uC77C\uC11C", "\uC694\uC77C", "1 John", "1 John", "1jn,1jo,1jhn,1john"],
  ["\uC694\uD55C\uC774\uC11C", "\uC694\uC774", "2 John", "2 John", "2jn,2jo,2jhn,2john"],
  ["\uC694\uD55C\uC0BC\uC11C", "\uC694\uC0BC", "3 John", "3 John", "3jn,3jo,3jhn,3john"],
  ["\uC720\uB2E4\uC11C", "\uC720", "Jude", "Jude", "jud,jd"],
  ["\uC694\uD55C\uACC4\uC2DC\uB85D", "\uACC4", "Revelation", "Rev", "re,rev,rv,revelations,\uACC4\uC2DC\uB85D"]
];
var BOOKS = RAW.map(([ko2, koShort, en2, enShort, aliases], i) => ({
  num: i + 1,
  ko: ko2,
  koShort,
  en: en2,
  enShort,
  zh: ZH[i],
  zhShort: ZH_SHORT[i],
  zhT: toTrad(ZH[i]),
  zhTShort: toTrad(ZH_SHORT[i]),
  ja: JA[i],
  jaShort: JA_SHORT[i],
  aliases: aliases.split(",").filter(Boolean)
}));
function normalizeBookKey(s) {
  return s.toLowerCase().replace(/[\s.]/g, "");
}
var LOOKUP = /* @__PURE__ */ new Map();
for (const b of BOOKS) {
  for (const key of [b.ko, b.koShort, b.en, b.enShort, ...b.aliases, b.zh, b.zhT, b.zhShort, b.zhTShort, b.ja, b.jaShort]) {
    const k = normalizeBookKey(key);
    if (!LOOKUP.has(k)) LOOKUP.set(k, b);
  }
}
function findBook(name) {
  return LOOKUP.get(normalizeBookKey(name));
}

// src/i18n.ts
var ko = {
  cmdInsert: "\uC131\uACBD \uAD6C\uC808 \uAC80\uC0C9\uD574\uC11C \uC0BD\uC785",
  cmdDirect: "\uAE30\uBCF8 \uC5ED\uBCF8\uC73C\uB85C \uBC14\uB85C \uC0BD\uC785 (\uCC3D \uC5C6\uC774)",
  cmdPreset: (name) => `\uD504\uB9AC\uC14B: ${name}`,
  directNone: "\uC774 \uAD6C\uC808\uC774 \uB4E4\uC5B4 \uC788\uB294 \uAE30\uBCF8 \uC120\uD0DD \uC5ED\uBCF8\uC774 \uC5C6\uC5B4\uC694. \uC124\uC815\uC5D0\uC11C \u2611 \uAE30\uBCF8 \uC120\uD0DD\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.",
  directFailed: (names) => `\uAC00\uC838\uC624\uC9C0 \uBABB\uD55C \uC5ED\uBCF8: ${names}`,
  hotkeyFallback: "\uC124\uC815 \u2192 \uB2E8\uCD95\uD0A4\uC5D0\uC11C 'Versedrop'\uC744 \uAC80\uC0C9\uD574 \uB2E8\uCD95\uD0A4\uB97C \uC9C0\uC815\uD574 \uC8FC\uC138\uC694.",
  sHotkeys: "\uB2E8\uCD95\uD0A4\uC640 \uD504\uB9AC\uC14B",
  sHotkeysDesc: "\uBA85\uB839\uB9C8\uB2E4 \uB2E8\uCD95\uD0A4\uB97C \uC9C0\uC815\uD560 \uC218 \uC788\uC5B4\uC694. '\uB2E8\uCD95\uD0A4 \uC9C0\uC815'\uC744 \uB204\uB974\uBA74 Obsidian \uB2E8\uCD95\uD0A4 \uD654\uBA74\uC774 Versedrop\uB9CC \uAC78\uB7EC\uC11C \uC5F4\uB824\uC694. \uADF8\uACF3\uC5D0\uC11C + \uB97C \uB204\uB974\uACE0 \uC6D0\uD558\uB294 \uD0A4\uB97C \uB204\uB974\uBA74 \uB05D!",
  sCmdInsertDesc: "\uAC80\uC0C9 \uCC3D\uC744 \uC5F4\uC5B4\uC694. \uCEE4\uC11C\uAC00 \uC788\uB294 \uC904\uC774\uB098 \uC120\uD0DD\uD55C \uAE00\uC790\uAC00 \uAD6C\uC808\uC774\uBA74 \uC790\uB3D9\uC73C\uB85C \uAC80\uC0C9\uD574\uC694.",
  sCmdDirectDesc: "\uC120\uD0DD\uD55C \uAD6C\uC808(\uB610\uB294 \uCEE4\uC11C\uAC00 \uC788\uB294 \uC904\uC758 \uAD6C\uC808)\uC744 \u2611 \uAE30\uBCF8 \uC120\uD0DD \uC5ED\uBCF8\uC73C\uB85C \uCC3D \uC5C6\uC774 \uBC14\uB85C \uB123\uC5B4\uC694. \uAD6C\uC808\uC774 \uC5C6\uC73C\uBA74 \uAC80\uC0C9 \uCC3D\uC774 \uC5F4\uB824\uC694.",
  sNoHotkey: "\uC9C0\uC815 \uC548 \uB428",
  sSetHotkey: "\uB2E8\uCD95\uD0A4 \uC9C0\uC815",
  sChangeHotkey: "\uBC14\uAFB8\uAE30",
  sPresetAdd: "\uD504\uB9AC\uC14B \uCD94\uAC00",
  sPresetAddDesc: "\uC790\uC8FC \uC4F0\uB294 \uC5ED\uBCF8 \uC870\uD569\uC744 \uD504\uB9AC\uC14B\uC73C\uB85C \uB9CC\uB4E4\uBA74 \uB530\uB85C \uBA85\uB839\uC774 \uC0DD\uACA8\uC694. \uC608: '\uD55C\uC601 \uB300\uC870', '\uC6D0\uC5B4 \uB300\uC870'",
  sPresetDesc: "\uAD6C\uC808 \uC704\uC5D0\uC11C \uC2E4\uD589\uD558\uBA74 \uC544\uB798 \uC5ED\uBCF8\uC73C\uB85C \uBC14\uB85C \uB123\uACE0, \uC544\uB2C8\uBA74 \uC774 \uC5ED\uBCF8\uB4E4\uC774 \uC120\uD0DD\uB41C \uAC80\uC0C9 \uCC3D\uC774 \uC5F4\uB824\uC694.",
  sPresetNamePlaceholder: "\uD504\uB9AC\uC14B \uC774\uB984 (\uC608: \uC6D0\uC5B4 \uB300\uC870)",
  modalTitle: "\uC131\uACBD \uAD6C\uC808 \uAC00\uC838\uC624\uAE30",
  placeholder: "\uC608: \uC694 3:16, \uACE0\uC804 13:4-7, \uC2DC 23, John 3:16, \u7EA63:16",
  search: "\uAC80\uC0C9",
  insert: "\uC0BD\uC785",
  langKo: "\uD55C\uAD6D\uC5B4",
  langEn: "English",
  langBoth: "\uD568\uAED8",
  langAll: "\uC804\uCCB4",
  langName: { ko: "\uD55C\uAD6D\uC5B4", en: "\uC601\uC5B4", zh: "\uC911\uAD6D\uC5B4", ja: "\uC77C\uBCF8\uC5B4", grc: "\uD5EC\uB77C\uC5B4", he: "\uD788\uBE0C\uB9AC\uC5B4" },
  noTranslationsForBook: "\uC120\uD0DD\uD55C \uC5B8\uC5B4\uC5D0\uB294 \uC774 \uCC45\uC774 \uB4E4\uC5B4 \uC788\uB294 \uC5ED\uBCF8\uC774 \uC5C6\uC5B4\uC694. \uD5EC\uB77C\uC5B4 \uC5ED\uBCF8\uC740 \uC2E0\uC57D\uB9CC, \uD788\uBE0C\uB9AC\uC5B4 WLC\uB294 \uAD6C\uC57D\uB9CC \uC788\uC5B4\uC694.",
  loading: "\uBD88\uB7EC\uC624\uB294 \uC911\u2026",
  noVerses: "\uD574\uB2F9 \uAD6C\uC808\uC774 \uC774 \uC5ED\uBCF8\uC5D0 \uC5C6\uC5B4\uC694.",
  noneSelected: "\uC0BD\uC785\uD560 \uC5ED\uBCF8\uC744 \uD558\uB098 \uC774\uC0C1 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.",
  noTranslations: "\uC774 \uC5B8\uC5B4\uB85C \uCF1C\uC838 \uC788\uB294 \uC5ED\uBCF8\uC774 \uC5C6\uC5B4\uC694. \uC124\uC815\uC5D0\uC11C \uC5ED\uBCF8\uC744 \uCF1C \uC8FC\uC138\uC694.",
  hint: "Enter \uAC80\uC0C9 \xB7 Ctrl/Cmd+Enter \uC0BD\uC785",
  errFormat: "\uAD6C\uC808 \uD615\uC2DD\uC744 \uC54C \uC218 \uC5C6\uC5B4\uC694. \uC608: \uC694 3:16, John 3:16-18",
  errBook: (b) => `'${b}'\uC5D0 \uD574\uB2F9\uD558\uB294 \uCC45\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.`,
  errChapter: "\uC7A5 \uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC544\uC694.",
  errVerse: (p) => `\uC808 \uD45C\uAE30 '${p}'\uB97C \uC774\uD574\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694.`,
  errRange: (p) => `\uC808 \uBC94\uC704 '${p}'\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC544\uC694.`,
  // Accordance errors
  accMacOnly: "Accordance \uC5F0\uB3D9\uC740 Mac\uC758 Obsidian \uB370\uC2A4\uD06C\uD1B1 \uC571\uC5D0\uC11C\uB9CC \uC4F8 \uC218 \uC788\uC5B4\uC694.",
  accNoModule: "Accordance \uBAA8\uB4C8 \uC57D\uC5B4\uB97C \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
  accPermission: "Obsidian\uC774 Accordance\uB97C \uC81C\uC5B4\uD560 \uAD8C\uD55C\uC774 \uC5C6\uC5B4\uC694. \uC2DC\uC2A4\uD15C \uC124\uC815 \u203A \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638 \uBC0F \uBCF4\uC548 \u203A \uC790\uB3D9\uD654\uC5D0\uC11C Obsidian \uC544\uB798\uC758 Accordance\uB97C \uCF1C \uC8FC\uC138\uC694.",
  accNotFound: "Accordance \uC571\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC124\uCE58\uB418\uC5B4 \uC788\uB294\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.",
  accTimeout: "Accordance \uC751\uB2F5\uC774 \uB108\uBB34 \uB2A6\uC5B4\uC694. Accordance\uB97C \uBA3C\uC800 \uC2E4\uD589\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.",
  accFailed: "Accordance \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC5B4\uC694:",
  accBadModule: (m) => `Accordance\uAC00 '${m}' \uBAA8\uB4C8\uC5D0\uC11C \uBCF8\uBB38\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694. \uBAA8\uB4C8 \uC57D\uC5B4\uAC00 Accordance \uD654\uBA74\uC5D0 \uBCF4\uC774\uB294 \uAC83\uACFC \uB611\uAC19\uC740\uC9C0 \uD655\uC778\uD574 \uC8FC\uC138\uC694.`,
  accTestOk: (m, text) => `Accordance '${m}' \uC5F0\uACB0 \uC131\uACF5: ${text}`,
  errNoCode: "\uC5ED\uBCF8 \uCF54\uB4DC\uAC00 \uBE44\uC5B4 \uC788\uC5B4\uC694.",
  errHttp: (src, code) => `${src} \uC751\uB2F5 \uC624\uB958 (${code}). \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.`,
  errResponse: (src) => `${src} \uC751\uB2F5 \uD615\uC2DD\uC774 \uC608\uC0C1\uACFC \uB2EC\uB77C\uC694.`,
  errNoPath: "JSON \uD30C\uC77C \uACBD\uB85C\uAC00 \uBE44\uC5B4 \uC788\uC5B4\uC694.",
  errFileMissing: (p) => `\uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694: ${p}`,
  errJson: (p) => `JSON\uC744 \uC77D\uC744 \uC218 \uC5C6\uC5B4\uC694: ${p}`,
  errJsonFormat: "\uC9C0\uC6D0\uD558\uB294 \uC131\uACBD JSON \uD615\uC2DD\uC774 \uC544\uB2C8\uC5D0\uC694. \uC124\uC815\uC758 \uB3C4\uC6C0\uB9D0\uC5D0\uC11C \uD615\uC2DD\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.",
  esvNoKey: "ESV API \uD0A4\uB97C \uC124\uC815\uC5D0 \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
  esvBadKey: "ESV API \uD0A4\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC544\uC694. api.esv.org\uC5D0\uC11C \uD0A4\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.",
  esvThrottled: "ESV API \uC694\uCCAD \uD55C\uB3C4\uB97C \uB118\uC5C8\uC5B4\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.",
  quoteWarn: (names, n) => `${names}: \uC800\uC791\uAD8C \uC5ED\uBCF8\uC744 ${n}\uC808 \uB118\uAC8C \uC778\uC6A9\uD588\uC5B4\uC694. \uAC1C\uC778 \uB178\uD2B8\xB7\uC124\uAD50 \uC6D0\uACE0\uC5D0\uC11C\uC758 \uC9E7\uC740 \uC778\uC6A9\uC740 \uAD1C\uCC2E\uC9C0\uB9CC, \uACF5\uAC1C\xB7\uBC30\uD3EC\uD558\uAC70\uB098 \uB9CE\uC740 \uBD84\uB7C9\uC744 \uBAA8\uC544 \uB450\uB824\uBA74 \uC800\uC791\uAD8C\uC790 \uD5C8\uAC00\uAC00 \uD544\uC694\uD560 \uC218 \uC788\uC5B4\uC694.`,
  sEsvKey: "ESV API \uD0A4",
  sEsvKeyDesc: "api.esv.org\uC5D0\uC11C \uBB34\uB8CC\uB85C \uBC1C\uAE09\uBC1B\uC740 \uAC1C\uC778 \uD0A4 (\uBE44\uC601\uB9AC \uC6A9\uB3C4). \uD0A4\uB97C \uB123\uC5B4\uC57C ESV\uAC00 \uAC80\uC0C9 \uACB0\uACFC\uC5D0 \uB098\uD0C0\uB098\uC694. \uC624\uB978\uCABD \uC544\uC774\uCF58\uC744 \uB204\uB974\uBA74 \uBC1C\uAE09 \uD398\uC774\uC9C0\uAC00 \uC5F4\uB824\uC694.",
  sCitations: "\uCD9C\uCC98 \uD45C\uAE30",
  sCitationsDesc: "\uC778\uC6A9\uD55C \uAD6C\uC808 \uC544\uB798\uC5D0 \uC800\uC791\uAD8C \uCD9C\uCC98 \uBB38\uAD6C\uB97C \uBD99\uC5EC\uC694. ESV\xB7NET\uC740 \uC774\uC6A9 \uC870\uAC74\uC0C1 \uD56D\uC0C1 \uBD99\uC5B4\uC694.",
  sCitCopyrighted: "\uC800\uC791\uAD8C \uC5ED\uBCF8\uB9CC (\uCD94\uCC9C)",
  sCitAll: "\uBAA8\uB4E0 \uC5ED\uBCF8",
  sCitOff: "\uBD99\uC774\uC9C0 \uC54A\uC74C",
  sQuoteWarn: "\uC778\uC6A9 \uBD84\uB7C9 \uACBD\uACE0",
  sQuoteWarnDesc: "\uC800\uC791\uAD8C \uC5ED\uBCF8\uC744 \uD55C \uBC88\uC5D0 \uC774 \uC808 \uC218\uBCF4\uB2E4 \uB9CE\uC774 \uB123\uC73C\uBA74 \uC54C\uB824 \uC918\uC694. 0\uC774\uBA74 \uB044\uAE30.",
  sCitation: "\uCD9C\uCC98 \uBB38\uAD6C",
  sCitationDesc: "\uC774 \uC5ED\uBCF8\uC744 \uC778\uC6A9\uD560 \uB54C \uBD99\uC77C \uC800\uC791\uAD8C \uBB38\uAD6C. \uBE44\uC6B0\uBA74 \uCD9C\uCC98\uB97C \uBD99\uC774\uC9C0 \uC54A\uC544\uC694.",
  sCitationKnown: "\uC54C\uB824\uC9C4 \uC5ED\uBCF8\uC774\uB77C \uD68C\uC0C9 \uAE00\uC528\uC758 \uBB38\uAD6C\uAC00 \uC790\uB3D9\uC73C\uB85C \uBD99\uC5B4\uC694. \uBC14\uAFB8\uB824\uBA74 \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.",
  sCitationPlaceholder: "\uC608: \uC131\uACBD\uC804\uC11C \uAC1C\uC5ED\uAC1C\uC815\uD310 \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C",
  // settings
  sLanguage: "\uAE30\uBCF8 \uC5B8\uC5B4",
  sLanguageDesc: "\uAC80\uC0C9 \uCC3D\uC744 \uC5F4 \uB54C \uCC98\uC74C \uC120\uD0DD\uB420 \uC5B8\uC5B4",
  sTranslations: "\uAE30\uBCF8 \uC81C\uACF5 \uC5ED\uBCF8",
  sTranslationsDesc: "\uC778\uD130\uB137(bolls.life)\uC5D0\uC11C \uAC00\uC838\uC640\uC694. \uD1A0\uAE00\uC744 \uCF20 \uC5ED\uBCF8\uB9CC \uAC80\uC0C9 \uACB0\uACFC\uC5D0 \uB098\uD0C0\uB098\uACE0, \uCCB4\uD06C \uD45C\uC2DC\uD55C \uC5ED\uBCF8\uC740 \uCC98\uC74C\uBD80\uD130 \uC0BD\uC785 \uB300\uC0C1\uC73C\uB85C \uC120\uD0DD\uB3FC\uC694.",
  sShow: "\uAC80\uC0C9 \uACB0\uACFC\uC5D0 \uD45C\uC2DC",
  sDefaultPick: "\uAE30\uBCF8\uC73C\uB85C \uC120\uD0DD",
  sCustom: "\uB0B4 \uC5ED\uBCF8 \uCD94\uAC00",
  sCustomDesc: "\uAE30\uBCF8 \uC81C\uACF5 \uC678\uC758 \uC5ED\uBCF8\uC744 \uC138 \uAC00\uC9C0 \uBC29\uBC95\uC73C\uB85C \uCD94\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uC790\uC138\uD55C \uB0B4\uC6A9\uC740 \uB9E8 \uC544\uB798 \uB3C4\uC6C0\uB9D0\uC744 \uBCF4\uC138\uC694.",
  sAddBolls: "bolls.life \uC5ED\uBCF8 \uCF54\uB4DC\uB85C \uCD94\uAC00\u2026",
  sAddFile: "JSON \uD30C\uC77C\uB85C \uCD94\uAC00\u2026",
  sAddAccordance: "Accordance \uBAA8\uB4C8\uB85C \uCD94\uAC00\u2026 (Mac)",
  sAccordanceUnavailable: "\uC774 \uAE30\uAE30\uC5D0\uC11C\uB294 Accordance \uC5F0\uB3D9\uC744 \uC4F8 \uC218 \uC5C6\uC5B4\uC694 (Mac \uB370\uC2A4\uD06C\uD1B1 \uC804\uC6A9).",
  sName: "\uC774\uB984",
  sNamePlaceholder: "\uC608: \uAC1C\uC5ED\uAC1C\uC815",
  sLang: "\uC5B8\uC5B4",
  sMyTranslations: "\uB0B4 \uC5ED\uBCF8",
  sMyTranslationsDesc: "\uAC80\uC0C9 \uCC3D\uC5D0 \uB098\uC62C \uC5ED\uBCF8\uC774\uC5D0\uC694. \u2611 \uAE30\uBCF8\uC73C\uB85C \uC120\uD0DD \xB7 \u2191\u2193 \uC21C\uC11C \uBC14\uAFB8\uAE30 \xB7 \u270E \uD3B8\uC9D1 \xB7 \xD7 \uBE7C\uAE30. \uC21C\uC11C\uB300\uB85C \uAC80\uC0C9 \uCC3D\uACFC \uB178\uD2B8\uC5D0 \uB4E4\uC5B4\uAC00\uC694.",
  sNoTranslations: "\uC544\uC9C1 \uC5ED\uBCF8\uC774 \uC5C6\uC5B4\uC694. \uC544\uB798\uC5D0\uC11C \uCD94\uAC00\uD574 \uC8FC\uC138\uC694.",
  sUnnamed: "(\uC774\uB984 \uC5C6\uC74C)",
  sMoveUp: "\uC704\uB85C",
  sMoveDown: "\uC544\uB798\uB85C",
  sEdit: "\uD3B8\uC9D1",
  sDone: "\uC644\uB8CC",
  sAddTranslation: "\uC5ED\uBCF8 \uCD94\uAC00",
  sAddTranslationDesc: "\uBAA9\uB85D\uC5D0\uC11C \uACE0\uB974\uBA74 \uBC14\uB85C \uCD94\uAC00\uB3FC\uC694. \uAC1C\uC5ED\uAC1C\uC815\xB7NIV\uCC98\uB7FC \uBAA9\uB85D\uC5D0 \uC5C6\uB294 \uC5ED\uBCF8\uC740 'Accordance \uBAA8\uB4C8\uB85C \uCD94\uAC00'\uB97C \uACE0\uB974\uC138\uC694.",
  sChoose: "\uFF0B \uC5ED\uBCF8 \uC120\uD0DD\u2026",
  sOwnGroup: "\uC9C1\uC811 \uCD94\uAC00",
  sCode: "bolls.life \uCF54\uB4DC (\uC608: CUNPS)",
  sPath: "\uBCFC\uD2B8 \uB0B4 JSON \uACBD\uB85C",
  sModule: "Accordance \uBAA8\uB4C8 \uC57D\uC5B4 (\uC608: ESVS)",
  sKindBolls: "bolls.life",
  sKindFile: "JSON \uD30C\uC77C",
  sKindAccordance: "Accordance",
  sTest: "\uC5F0\uACB0 \uD655\uC778",
  sRemove: "\uC0AD\uC81C",
  sLinks: "Logos \xB7 Accordance \uB9C1\uD06C",
  sLinksDesc: "\uAD6C\uC808 \uC81C\uBAA9 \uC606\uC5D0 \uB9C1\uD06C\uB97C \uBD99\uC5EC\uC11C, \uD074\uB9AD\uD558\uBA74 \uB0B4 Logos\uB098 Accordance\uC5D0\uC11C \uADF8 \uAD6C\uC808\uC774 \uC5F4\uB824\uC694.",
  sAppLinks: "\uB9C1\uD06C \uBD99\uC774\uAE30",
  sLinksNone: "\uBD99\uC774\uC9C0 \uC54A\uC74C",
  sLinksLogos: "Logos",
  sLinksAccordance: "Accordance",
  sLinksBoth: "\uB458 \uB2E4",
  sLogosVersion: "Logos \uC5ED\uBCF8",
  sLogosVersionDesc: "Logos\uC5D0\uC11C \uC5F4 \uC5ED\uBCF8 \uC57D\uC5B4 (\uC608: ESV, NASB95). \uBE44\uC6B0\uBA74 Logos\uC758 \uAE30\uBCF8 \uC131\uACBD\uC73C\uB85C \uC5F4\uB824\uC694.",
  sAccModule: "Accordance \uB9C1\uD06C \uBAA8\uB4C8",
  sAccModuleDesc: "\uB9C1\uD06C\uB85C \uC5F4 \uBAA8\uB4C8 \uC57D\uC5B4 (\uC608: ESVS). \uBE44\uC6B0\uBA74 Accordance\uC758 \uAE30\uBCF8 \uD14D\uC2A4\uD2B8\uB85C \uC5F4\uB824\uC694. Accordance \uC5ED\uBCF8\uC73C\uB85C \uAC00\uC838\uC628 \uAD6C\uC808\uC740 \uADF8 \uBAA8\uB4C8\uB85C \uC5F4\uB824\uC694.",
  sOutput: "\uC0BD\uC785 \uD615\uC2DD",
  sStyle: "\uBE14\uB85D \uD615\uD0DC",
  sStyleCallout: "\uCF5C\uC544\uC6C3",
  sStyleQuote: "\uC778\uC6A9\uBB38",
  sStylePlain: "\uC77C\uBC18 \uD14D\uC2A4\uD2B8",
  sCalloutType: "\uCF5C\uC544\uC6C3 \uC885\uB958",
  sCalloutTypeDesc: "\uC608: quote, bible, note",
  sGroup: "\uC5EC\uB7EC \uC5ED\uBCF8\uC744 \uD55C \uBE14\uB85D\uC73C\uB85C \uBB36\uAE30",
  sGroupDesc: "\uB044\uBA74 \uC5ED\uBCF8\uB9C8\uB2E4 \uBE14\uB85D\uC744 \uB530\uB85C \uB9CC\uB4E4\uC5B4\uC694.",
  sBookName: "\uCC45 \uC774\uB984 \uD45C\uAE30",
  sBookFull: "\uC804\uCCB4 (\uC694\uD55C\uBCF5\uC74C / John)",
  sBookShort: "\uC57D\uC5B4 (\uCC3D / Gen)",
  sVerseNum: "\uC808 \uBC88\uD638",
  sVerseNumNone: "\uD45C\uC2DC \uC548 \uD568",
  sVerseNumPlain: "\uC22B\uC790 (16 \uD558\uB098\uB2D8\uC774\u2026)",
  sVerseNumSup: "\uC717\uCCA8\uC790 (\xB9\u2076\uD558\uB098\uB2D8\uC774\u2026)",
  sPerLine: "\uC808\uB9C8\uB2E4 \uC904\uBC14\uAFC8",
  sHeader: "\uC81C\uBAA9 \uD615\uC2DD",
  sHeaderDesc: "{ref} \uAD6C\uC808, {book} \uCC45, {chapter} \uC7A5, {verses} \uC808, {version} \uC5ED\uBCF8 \uC774\uB984, {abbr} \uC5ED\uBCF8 \uC57D\uC5B4",
  sClearCache: "\uCE90\uC2DC \uBE44\uC6B0\uAE30",
  sClearCacheDesc: "JSON \uD30C\uC77C\uC744 \uBC14\uAFE8\uAC70\uB098 \uBCF8\uBB38\uC774 \uC774\uC0C1\uD560 \uB54C \uB20C\uB7EC \uC8FC\uC138\uC694.",
  sClear: "\uBE44\uC6B0\uAE30",
  sCleared: "\uCE90\uC2DC\uB97C \uBE44\uC6E0\uC5B4\uC694.",
  sHelp: "\uB3C4\uC6C0\uB9D0",
  help: [
    {
      title: "\uC5ED\uBCF8\uC740 \uC5B4\uB514\uC11C \uAC00\uC838\uC624\uB098\uC694?",
      paras: [
        "\uAC1C\uC5ED\uD55C\uAE00\uACFC \uC601\uC5B4 \uACF5\uAC1C \uC5ED\uBCF8(KJV, WEB, BSB, ASV, YLT, LSV, GNV, DRB)\uC740 \uBB34\uB8CC \uC131\uACBD API\uC778 bolls.life\uC5D0\uC11C \uAC00\uC838\uC640\uC694. \uBCF4\uB0B4\uB294 \uC815\uBCF4\uB294 \uC5ED\uBCF8 \uCF54\uB4DC\uC640 \uCC45\xB7\uC7A5 \uBC88\uD638\uBFD0\uC774\uC5D0\uC694.",
        "NET\uC740 NET Bible \uACF5\uC2DD API(labs.bible.org)\uC5D0\uC11C, ESV\uB294 Crossway \uACF5\uC2DD API(api.esv.org)\uC5D0\uC11C \uC9C1\uC811 \uAC00\uC838\uC640\uC694. \uB450 \uACF3 \uBAA8\uB450 \uBE44\uC601\uB9AC \uC778\uC6A9\uC744 \uD5C8\uB77D\uD558\uACE0, \uB300\uC2E0 \uCD9C\uCC98 \uD45C\uAE30\uB97C \uC694\uAD6C\uD574\uC694.",
        "\uC0C8\uBC88\uC5ED\uC740 \uB300\uD55C\uC131\uC11C\uACF5\uD68C \uC800\uC791\uAD8C \uC5ED\uBCF8\uC774\uB77C \uAE30\uBCF8\uC73C\uB85C \uAEBC \uB450\uC5C8\uC5B4\uC694. \uD544\uC694\uD558\uBA74 '\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC5D0\uC11C \uCD94\uAC00\uD560 \uC218 \uC788\uC9C0\uB9CC, \uAC1C\uC778 \uBB35\uC0C1\xB7\uC5F0\uAD6C\uC6A9\uC73C\uB85C\uB9CC \uC368 \uC8FC\uC138\uC694."
      ]
    },
    {
      title: "\uAC1C\uC5ED\uAC1C\uC815\xB7\uACF5\uB3D9\uBC88\uC5ED\uC740 \uC5B4\uB5BB\uAC8C \uC4F0\uB098\uC694?",
      paras: [
        "\uAC1C\uC5ED\uAC1C\uC815, \uACF5\uB3D9\uBC88\uC5ED, \uC0C8\uD55C\uAE00\uC131\uACBD \uAC19\uC740 \uB300\uD55C\uC131\uC11C\uACF5\uD68C \uC5ED\uBCF8\uC740 \uBB34\uB8CC\uB85C \uAC00\uC838\uC62C \uC218 \uC788\uB294 \uACF5\uC2DD \uACBD\uB85C\uAC00 \uC5C6\uC5B4\uC694. \uB300\uD55C\uC131\uC11C\uACF5\uD68C\uB294 \uC18C\uD504\uD2B8\uC6E8\uC5B4\uB098 \uC6F9\uC5D0\uC11C \uC131\uACBD \uBCF8\uBB38\uC744 \uC81C\uACF5\uD558\uB294 \uAC83\uC744 \uBCC4\uB3C4 \uD5C8\uAC00(\uC0AC\uC6A9\uB8CC) \uB300\uC0C1\uC73C\uB85C \uB450\uACE0 \uC788\uC5B4\uC11C, Versedrop\uC774 \uBCF8\uBB38\uC744 \uC9C1\uC811 \uB0B4\uB824\uBC1B\uC9C0\uB294 \uC54A\uC544\uC694.",
        "\uAC00\uC7A5 \uC88B\uC740 \uBC29\uBC95\uC740 Accordance\uC5D0\uC11C \uAD6C\uC785\uD55C \uAC1C\uC5ED\uAC1C\uC815 \uBAA8\uB4C8\uC744 \uC5F0\uACB0\uD558\uB294 \uAC70\uC608\uC694(Mac). \uC544\uB798 'Accordance\uC5D0\uC11C \uB0B4 \uC5ED\uBCF8 \uAC00\uC838\uC624\uAE30'\uB97C \uB530\uB77C \uD558\uBA74 \uB418\uACE0, \uC774\uB984\uC5D0 '\uAC1C\uC5ED\uAC1C\uC815'\uC744 \uB123\uC73C\uBA74 \uCD9C\uCC98 \uBB38\uAD6C '\uC131\uACBD\uC804\uC11C \uAC1C\uC5ED\uAC1C\uC815\uD310 \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C'\uAC00 \uC790\uB3D9\uC73C\uB85C \uBD99\uC5B4\uC694.",
        "Accordance\uAC00 \uC5C6\uB2E4\uBA74 \uC0AC\uC6A9 \uAD8C\uD55C\uC774 \uC788\uB294 JSON \uD30C\uC77C\uC744 \uC5F0\uACB0\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694."
      ]
    },
    {
      title: "Accordance\uC5D0\uC11C \uB0B4 \uC5ED\uBCF8 \uAC00\uC838\uC624\uAE30 (Mac)",
      paras: [
        "Accordance\uC5D0\uC11C \uAD6C\uC785\uD55C \uC5ED\uBCF8(\uC608: \uAC1C\uC5ED\uAC1C\uC815, ESV, NIV, NASB)\uC744 Versedrop \uAC80\uC0C9 \uACB0\uACFC\uC5D0 \uD568\uAED8 \uB744\uC6B8 \uC218 \uC788\uC5B4\uC694. \uBCF8\uBB38\uC740 \uB0B4 Mac \uC548\uC5D0\uC11C Accordance\uC640 Obsidian \uC0AC\uC774\uC5D0\uC11C\uB9CC \uC624\uAC00\uACE0 \uC778\uD130\uB137\uC73C\uB85C \uC804\uC1A1\uB418\uC9C0 \uC54A\uC544\uC694.",
        "1) Mac\uC5D0 Accordance\uB97C \uC124\uCE58\uD558\uACE0 \uC6D0\uD558\uB294 \uC131\uACBD \uBAA8\uB4C8\uC744 \uB0B4\uB824\uBC1B\uC544 \uB450\uC138\uC694.",
        "2) '\uB0B4 \uC5ED\uBCF8' \uC544\uB798 '\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC5D0\uC11C 'Accordance \uBAA8\uB4C8\uB85C \uCD94\uAC00\u2026 (Mac)'\uB97C \uACE0\uB974\uC138\uC694.",
        "3) \uD45C\uC2DC\uD560 \uC774\uB984\uACFC \uBAA8\uB4C8 \uC57D\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694. \uC57D\uC5B4\uB294 Accordance \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB098 \uD14D\uC2A4\uD2B8 \uD0ED\uC5D0 \uBCF4\uC774\uB294 \uC774\uB984\uACFC \uB611\uAC19\uC774 \uC368\uC57C \uD574\uC694(\uB300\uC18C\uBB38\uC790\xB7\uD558\uC774\uD508 \uD3EC\uD568).",
        "4) '\uC5F0\uACB0 \uD655\uC778'\uC744 \uB204\uB974\uBA74 \uC694\uD55C\uBCF5\uC74C 3:16\uC744 \uAC00\uC838\uC640 \uBD10\uC694. \uCC98\uC74C\uC5D0\uB294 macOS\uAC00 'Obsidian\uC774 Accordance\uB97C \uC81C\uC5B4\uD558\uB3C4\uB85D \uD5C8\uC6A9\uD560\uAE4C\uC694?'\uB77C\uACE0 \uBB3C\uC5B4\uC694. \uD5C8\uC6A9\uC744 \uB20C\uB7EC \uC8FC\uC138\uC694.",
        "5) \uAC1C\uC5ED\uAC1C\uC815\xB7ESV\xB7NIV\xB7NASB\xB7NLT\xB7CSB\xB7NKJV\xB7NRSV\uCC98\uB7FC \uC54C\uB824\uC9C4 \uC5ED\uBCF8\uC740 \uCD9C\uCC98 \uBB38\uAD6C\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC44\uC6CC\uC838\uC694. \uB2E4\uB978 \uC5ED\uBCF8\uC740 '\uCD9C\uCC98 \uBB38\uAD6C' \uCE78\uC5D0 \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.",
        "\uAD8C\uD55C\uC744 \uAC70\uC808\uD588\uB2E4\uBA74 \uC2DC\uC2A4\uD15C \uC124\uC815 \u203A \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638 \uBC0F \uBCF4\uC548 \u203A \uC790\uB3D9\uD654\uC5D0\uC11C Obsidian \uC544\uB798\uC758 Accordance\uB97C \uCF1C\uBA74 \uB3FC\uC694.",
        "\uCC38\uACE0: Windows\xB7\uBAA8\uBC14\uC77C\uC5D0\uC11C\uB294 \uB3D9\uC791\uD558\uC9C0 \uC54A\uC544\uC694. Accordance\uAC00 \uAEBC\uC838 \uC788\uC73C\uBA74 \uCC98\uC74C \uC694\uCCAD \uB54C \uC2E4\uD589\uB418\uB290\uB77C \uBA87 \uCD08 \uAC78\uB824\uC694. \uC7A5 \uC804\uCCB4\uB97C \uAC00\uC838\uC62C \uB54C\uB294 \uC808\uB9C8\uB2E4 \uC694\uCCAD\uD558\uBBC0\uB85C \uC870\uAE08 \uB290\uB9B4 \uC218 \uC788\uC5B4\uC694."
      ]
    },
    {
      title: "\uCD9C\uCC98 \uD45C\uAE30\uC640 \uC778\uC6A9 \uBC94\uC704",
      paras: [
        "\uC124\uAD50 \uC6D0\uACE0\uB098 \uBB35\uC0C1 \uB178\uD2B8\uC5D0 \uBA87 \uAD6C\uC808\uC744 \uCD9C\uCC98\uC640 \uD568\uAED8 \uB123\uB294 \uC815\uB3C4\uB294 \uC77C\uBC18\uC801\uC778 \uC778\uC6A9 \uBC94\uC704\uC5D0 \uD574\uB2F9\uD574\uC694. \uB0B4 \uAE00\uC774 \uC911\uC2EC\uC774\uACE0, \uCD9C\uCC98\uB97C \uBC1D\uD788\uACE0, \uC9C0\uB098\uCE58\uAC8C \uB9CE\uC774 \uC62E\uAE30\uC9C0 \uC54A\uB294 \uAC83\uC774 \uAE30\uC900\uC774\uC5D0\uC694.",
        "\uADF8\uB798\uC11C Versedrop\uC740 \uC800\uC791\uAD8C \uC5ED\uBCF8\uC744 \uB123\uC744 \uB54C \uBE14\uB85D \uC544\uB798\uC5D0 \uCD9C\uCC98 \uBB38\uAD6C\uB97C \uC790\uB3D9\uC73C\uB85C \uBD99\uC774\uACE0(\uC124\uC815 '\uCD9C\uCC98 \uD45C\uAE30'), \uD55C \uBC88\uC5D0 \uB9CE\uC740 \uC808\uC744 \uB123\uC73C\uBA74 \uACBD\uACE0\uB97C \uB744\uC6CC\uC694(\uC124\uC815 '\uC778\uC6A9 \uBD84\uB7C9 \uACBD\uACE0').",
        "\uB2E4\uC74C \uACBD\uC6B0\uC5D0\uB294 \uC800\uC791\uAD8C\uC790 \uD5C8\uAC00\uAC00 \uD544\uC694\uD560 \uC218 \uC788\uC5B4\uC694: \uAC00\uC838\uC628 \uAD6C\uC808\uC744 \uACC4\uC18D \uBAA8\uC544 \uC0AC\uC2E4\uC0C1 \uBCF8\uBB38 \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uB97C \uB9CC\uB4DC\uB294 \uACBD\uC6B0, \uB178\uD2B8\uB97C \uC6F9\uC0AC\uC774\uD2B8 \uB4F1\uC5D0 \uACF5\uAC1C\xB7\uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0, \uAD50\uC7AC\uB098 \uCD9C\uD310\uBB3C\uC5D0 \uB9CE\uC774 \uC2E3\uB294 \uACBD\uC6B0. \uB300\uD55C\uC131\uC11C\uACF5\uD68C \uC5ED\uBCF8\uC740 \uB300\uD55C\uC131\uC11C\uACF5\uD68C '\uD5C8\uAC00\uC870\uAC74 \uBC0F \uC0AC\uC6A9\uB8CC' \uC548\uB0B4\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694."
      ]
    },
    {
      title: "\uC601\uC5B4 \uC5ED\uBCF8 \uB298\uB9AC\uAE30 (ESV \xB7 NET \xB7 Accordance)",
      paras: [
        "ESV: api.esv.org\uC5D0\uC11C \uBB34\uB8CC \uACC4\uC815\uC744 \uB9CC\uB4E4\uACE0 'API Application'\uC744 \uC0DD\uC131\uD558\uBA74 \uAC1C\uC778 \uD0A4\uB97C \uBC1B\uC744 \uC218 \uC788\uC5B4\uC694. \uBE44\uC601\uB9AC \uC6A9\uB3C4\uB9CC \uD5C8\uC6A9\uB418\uBA70, '\uB0B4 \uC5ED\uBCF8'\uC758 ESV \uBC14\uB85C \uC544\uB798 'ESV API \uD0A4'\uC5D0 \uB123\uC73C\uBA74 ESV\uAC00 \uB098\uD0C0\uB098\uC694. Crossway \uC870\uAC74\uC5D0 \uB530\uB77C \uCD9C\uCC98 \uBB38\uAD6C\uC640 esv.org \uB9C1\uD06C\uAC00 \uD56D\uC0C1 \uBD99\uACE0, \uD55C \uBC88\uC5D0 500\uC808\uAE4C\uC9C0\uB9CC \uAC00\uC838\uC62C \uC218 \uC788\uC5B4\uC694.",
        "NET: \uD0A4 \uC5C6\uC774 \uBC14\uB85C \uC4F8 \uC218 \uC788\uC5B4\uC694. \uC870\uAC74\uC5D0 \uB530\uB77C \uC81C\uBAA9\uC758 'NET'\uC774 netbible.org\uB85C \uC5F0\uACB0\uB418\uACE0 \uCD9C\uCC98 \uBB38\uAD6C\uAC00 \uBD99\uC5B4\uC694.",
        "\uACF5\uAC1C \uC5ED\uBCF8 \uB354 \uBCF4\uAE30: LSV(\uD604\uB300\uC5B4 \uC9C1\uC5ED), Geneva 1599, Douay-Rheims\uB294 '\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC5D0\uC11C \uCD94\uAC00\uD560 \uC218 \uC788\uC5B4\uC694.",
        "NIV, NASB, NLT, CSB, NKJV\uCC98\uB7FC \uBB34\uB8CC API\uAC00 \uC5C6\uB294 \uC5ED\uBCF8\uC740 Accordance \uBAA8\uB4C8\uB85C \uC5F0\uACB0\uD558\uC138\uC694. Logos \uC5ED\uBCF8\uC740 \uBCF8\uBB38\uC744 \uAC00\uC838\uC62C \uC218 \uC5C6\uC9C0\uB9CC 'Logos \uB9C1\uD06C'\uB85C Logos\uC5D0\uC11C \uBC14\uB85C \uC5F4 \uC218 \uC788\uC5B4\uC694."
      ]
    },
    {
      title: "Logos\uB294 \uC65C \uBCF8\uBB38\uC744 \uBABB \uAC00\uC838\uC624\uB098\uC694?",
      paras: [
        "Logos\uB294 \uC678\uBD80 \uD504\uB85C\uADF8\uB7A8\uC774 \uC131\uACBD \uBCF8\uBB38\uC744 \uC77D\uC744 \uC218 \uC788\uB294 \uACF5\uC2DD \uBC29\uBC95\uC744 \uC81C\uACF5\uD558\uC9C0 \uC54A\uACE0, \uB0B4\uB824\uBC1B\uC740 \uB9AC\uC18C\uC2A4\uB3C4 \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC5B4\uC694. \uADF8\uB798\uC11C Logos \uC5ED\uBCF8\uC758 \uBCF8\uBB38\uC740 \uAC00\uC838\uC62C \uC218 \uC5C6\uC5B4\uC694.",
        "\uB300\uC2E0 \uC704\uC758 'Logos \xB7 Accordance \uB9C1\uD06C'\uB97C \uCF1C\uBA74 \uAD6C\uC808 \uC81C\uBAA9 \uC606\uC5D0 Logos \uB9C1\uD06C(ref.ly)\uAC00 \uBD99\uC5B4\uC694. \uD074\uB9AD\uD558\uBA74 Logos \uB370\uC2A4\uD06C\uD1B1\xB7\uBAA8\uBC14\uC77C\xB7\uC6F9 \uC911 \uC124\uCE58\uB41C \uACF3\uC5D0\uC11C \uADF8 \uAD6C\uC808\uC774 \uC5F4\uB824\uC694. 'Logos \uC5ED\uBCF8'\uC5D0 \uC57D\uC5B4\uB97C \uB123\uC73C\uBA74 \uADF8 \uC5ED\uBCF8\uC73C\uB85C \uC5F4\uB824\uC694."
      ]
    },
    {
      title: "JSON \uD30C\uC77C\uB85C \uC5ED\uBCF8 \uCD94\uAC00\uD558\uAE30",
      paras: [
        "\uC0AC\uC6A9 \uAD8C\uD55C\uC774 \uC788\uB294 \uC131\uACBD JSON \uD30C\uC77C\uC744 \uBCFC\uD2B8\uC5D0 \uB123\uACE0, '\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC5D0\uC11C 'JSON \uD30C\uC77C\uB85C \uCD94\uAC00\u2026'\uB97C \uACE0\uB978 \uB4A4 \uBCFC\uD2B8 \uC548\uC758 \uACBD\uB85C(\uC608: Bibles/nkrv.json)\uB97C \uC785\uB825\uD558\uC138\uC694.",
        '\uC138 \uAC00\uC9C0 \uD615\uC2DD\uC744 \uC778\uC2DD\uD574\uC694: [{"book":43,"chapter":3,"verse":16,"text":"\u2026"}] \uAC19\uC740 \uBC30\uC5F4, {"43":{"3":{"16":"\u2026"}}} \uAC19\uC740 \uC911\uCCA9 \uAC1D\uCCB4, {"\uC6943:16":"\u2026"} \uAC19\uC740 \uD0A4 \uD615\uC2DD. \uCC45 \uBC88\uD638\uB294 \uCC3D\uC138\uAE30 1\uBD80\uD130 \uC694\uD55C\uACC4\uC2DC\uB85D 66\uAE4C\uC9C0\uC608\uC694.'
      ]
    },
    {
      title: "\uB2E8\uCD95\uD0A4\uC640 \uD504\uB9AC\uC14B",
      paras: [
        "\uC704\uC758 '\uB2E8\uCD95\uD0A4\uC640 \uD504\uB9AC\uC14B'\uC5D0\uC11C '\uB2E8\uCD95\uD0A4 \uC9C0\uC815'\uC744 \uB204\uB974\uBA74 Obsidian \uB2E8\uCD95\uD0A4 \uD654\uBA74\uC774 Versedrop \uBA85\uB839\uB9CC \uAC78\uB7EC\uC11C \uC5F4\uB824\uC694. \uBA85\uB839 \uC606 + \uB97C \uB204\uB974\uACE0 \uC6D0\uD558\uB294 \uD0A4\uB97C \uB204\uB974\uBA74 \uB3FC\uC694.",
        "'\uAE30\uBCF8 \uC5ED\uBCF8\uC73C\uB85C \uBC14\uB85C \uC0BD\uC785 (\uCC3D \uC5C6\uC774)'\uC740 \uCEE4\uC11C\uAC00 \uC788\uB294 \uC904(\uB610\uB294 \uC120\uD0DD\uD55C \uAE00\uC790)\uC758 \uAD6C\uC808\uC744 \u2611 \uAE30\uBCF8 \uC120\uD0DD \uC5ED\uBCF8\uC73C\uB85C \uACE7\uBC14\uB85C \uB123\uC5B4\uC694. \uAC1C\uC694\uC5D0 \uAD6C\uC808\uB9CC \uC801\uC5B4 \uB450\uACE0 \uD558\uB098\uC529 \uCC44\uC6B8 \uB54C \uD3B8\uD574\uC694.",
        "\uD504\uB9AC\uC14B\uC740 \uC790\uC8FC \uC4F0\uB294 \uC5ED\uBCF8 \uC870\uD569\uC774\uC5D0\uC694(\uC608: \uD55C\uC601 \uB300\uC870, \uC6D0\uC5B4 \uB300\uC870). \uD504\uB9AC\uC14B\uB9C8\uB2E4 \uBA85\uB839\uC774 \uC0DD\uACA8\uC11C \uB2E8\uCD95\uD0A4\uB97C \uB530\uB85C \uC9C0\uC815\uD560 \uC218 \uC788\uACE0, \uAD6C\uC808 \uC704\uC5D0\uC11C \uC2E4\uD589\uD558\uBA74 \uBC14\uB85C \uB123\uACE0 \uC544\uB2C8\uBA74 \uADF8 \uC5ED\uBCF8\uB4E4\uC774 \uC120\uD0DD\uB41C \uAC80\uC0C9 \uCC3D\uC774 \uC5F4\uB824\uC694."
      ]
    },
    {
      title: "\uC911\uAD6D\uC5B4\xB7\uC77C\uBCF8\uC5B4\xB7\uD5EC\uB77C\uC5B4\xB7\uD788\uBE0C\uB9AC\uC5B4",
      paras: [
        "'\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC758 \uC5B8\uC5B4\uBCC4 \uBB36\uC74C\uC5D0\uC11C \u548C\u5408\u672C(\uBC88\uCCB4), \u53E3\u8A9E\u8A33, SBLGNT\xB7Textus Receptus\xB7Tischendorf(\uD5EC\uB77C\uC5B4 \uC2E0\uC57D), WLC\xB7Delitzsch(\uD788\uBE0C\uB9AC\uC5B4)\uB97C \uCD94\uAC00\uD560 \uC218 \uC788\uC5B4\uC694. \uCD94\uAC00\uD558\uBA74 \uAC80\uC0C9 \uCC3D\uC5D0 \uADF8 \uC5B8\uC5B4 \uBC84\uD2BC\uC774 \uC0DD\uACA8\uC694.",
        "\uC911\uAD6D\uC5B4\xB7\uC77C\uBCF8\uC5B4 \uCC45 \uC774\uB984\uC73C\uB85C\uB3C4 \uAC80\uC0C9\uD560 \uC218 \uC788\uC5B4\uC694. \uC608: \u7EA6\u7FF0\u798F\u97F3 3:16, \u7D043:16, \u30E8\u30CF3\u7AE016\u7BC0, \u6797\u524D13:4-7.",
        "\uD5EC\uB77C\uC5B4 \uC5ED\uBCF8\uC740 \uC2E0\uC57D\uB9CC, \uD788\uBE0C\uB9AC\uC5B4 WLC\uB294 \uAD6C\uC57D\uB9CC \uC788\uC5B4\uC11C \uADF8 \uCC45\uC774 \uC788\uC744 \uB54C\uB9CC \uCE74\uB4DC\uAC00 \uB098\uC640\uC694. \uD788\uBE0C\uB9AC\uC5B4 \uC131\uACBD\uC740 \uC808 \uAD6C\uBD84\uC774 \uB2E4\uB978 \uACF3\uC774 \uC788\uC73C\uB2C8(\uC2DC\uD3B8 \uD45C\uC81C, \uB9D0\uB77C\uAE30 4\uC7A5 \uB4F1) \uC808 \uBC88\uD638\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.",
        "\u65B0\u6807\u70B9\u548C\u5408\u672C, \u65B0\u5171\u540C\u8A33, \u65B0\u6539\u8A33, NA28, UBS5, Rahlfs LXX, BHS \uAC19\uC740 \uC800\uC791\uAD8C \uD310\uBCF8\uC740 Accordance \uBAA8\uB4C8\uB85C \uCD94\uAC00\uD558\uBA74 \uCD9C\uCC98 \uBB38\uAD6C\uAC00 \uC790\uB3D9\uC73C\uB85C \uBD99\uC5B4\uC694."
      ]
    },
    {
      title: "\uB2E4\uB978 \uC5B8\uC5B4 \uC5ED\uBCF8 \uCD94\uAC00\uD558\uAE30",
      paras: [
        "bolls.life\uC5D0 \uC788\uB294 \uC5ED\uBCF8\uC740 '\uC5ED\uBCF8 \uCD94\uAC00' \uB4DC\uB86D\uB2E4\uC6B4\uC758 'bolls.life \uC5ED\uBCF8 \uCF54\uB4DC\uB85C \uCD94\uAC00\u2026'\uC5D0\uC11C \uCF54\uB4DC\uB9CC \uB123\uC73C\uBA74 \uBC14\uB85C \uC4F8 \uC218 \uC788\uC5B4\uC694. \uC608: LUT(Luther 1912, \uB3C5\uC77C\uC5B4), RV1960(Reina-Valera 1960, \uC2A4\uD398\uC778\uC5B4). \uC804\uCCB4 \uBAA9\uB85D\uC740 bolls.life/static/bolls/app/views/languages.json \uC5D0\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694. \uAC01 \uC5ED\uBCF8\uC758 \uC800\uC791\uAD8C\uC744 \uC9C0\uCF1C \uC8FC\uC138\uC694."
      ]
    }
  ]
};
var en = {
  cmdInsert: "Search and insert Bible passage",
  cmdDirect: "Insert in default translations (no window)",
  cmdPreset: (name) => `Preset: ${name}`,
  directNone: "None of your default-picked translations contain this passage. Check \u2611 in settings.",
  directFailed: (names) => `Couldn't load: ${names}`,
  hotkeyFallback: "Open Settings \u2192 Hotkeys and search for 'Versedrop' to set a hotkey.",
  sHotkeys: "Hotkeys and presets",
  sHotkeysDesc: "Each command can have its own hotkey. 'Set hotkey' opens Obsidian's Hotkeys screen filtered to Versedrop \u2014 click + and press the keys you want.",
  sCmdInsertDesc: "Opens the search window. If the selection or the cursor's line is a reference, it is searched automatically.",
  sCmdDirectDesc: "Inserts the selected reference (or the one on the cursor's line) in your \u2611 default translations without opening a window. Opens the search window if there is no reference.",
  sNoHotkey: "Not set",
  sSetHotkey: "Set hotkey",
  sChangeHotkey: "Change",
  sPresetAdd: "Add preset",
  sPresetAddDesc: "Save a set of translations you use together as a preset \u2014 it gets its own command. e.g. 'Korean\u2013English', 'Original languages'",
  sPresetDesc: "Run it on a reference to insert these translations directly; otherwise it opens the search window with them selected.",
  sPresetNamePlaceholder: "Preset name (e.g. Original languages)",
  modalTitle: "Insert Bible passage",
  placeholder: "e.g. John 3:16, 1 Cor 13:4-7, Ps 23, \uC694 3:16, \u7EA63:16",
  search: "Search",
  insert: "Insert",
  langKo: "Korean",
  langEn: "English",
  langBoth: "Both",
  langAll: "All",
  langName: { ko: "Korean", en: "English", zh: "Chinese", ja: "Japanese", grc: "Greek", he: "Hebrew" },
  noTranslationsForBook: "None of the translations in the chosen languages contain this book. Greek texts are NT only; Hebrew WLC is OT only.",
  loading: "Loading\u2026",
  noVerses: "This passage isn't available in this translation.",
  noneSelected: "Select at least one translation to insert.",
  noTranslations: "No translations are enabled for this language. Enable some in settings.",
  hint: "Enter to search \xB7 Ctrl/Cmd+Enter to insert",
  errFormat: "Couldn't read that reference. Try: John 3:16, \uC694 3:16-18",
  errBook: (b) => `No book matches '${b}'.`,
  errChapter: "Invalid chapter number.",
  errVerse: (p) => `Couldn't read verse '${p}'.`,
  errRange: (p) => `Invalid verse range '${p}'.`,
  accMacOnly: "Accordance integration works only in the Obsidian desktop app on a Mac.",
  accNoModule: "Enter the Accordance module abbreviation in settings.",
  accPermission: "Obsidian isn't allowed to control Accordance. Turn on Accordance under Obsidian in System Settings \u203A Privacy & Security \u203A Automation.",
  accNotFound: "Couldn't find the Accordance app. Make sure it is installed.",
  accTimeout: "Accordance took too long to respond. Open Accordance first and try again.",
  accFailed: "Accordance request failed:",
  accBadModule: (m) => `Accordance found no text in module '${m}'. Check that the abbreviation matches exactly what Accordance shows.`,
  accTestOk: (m, text) => `Connected to Accordance '${m}': ${text}`,
  errNoCode: "The translation code is empty.",
  errHttp: (src, code) => `${src} returned an error (${code}). Please try again shortly.`,
  errResponse: (src) => `Unexpected response from ${src}.`,
  errNoPath: "The JSON file path is empty.",
  errFileMissing: (p) => `File not found: ${p}`,
  errJson: (p) => `Couldn't read JSON: ${p}`,
  errJsonFormat: "Not a supported Bible JSON layout. See Help in settings for the formats.",
  esvNoKey: "Enter your ESV API key in settings.",
  esvBadKey: "The ESV API key was rejected. Check your key at api.esv.org.",
  esvThrottled: "ESV API rate limit reached. Please try again shortly.",
  quoteWarn: (names, n) => `${names}: more than ${n} verses of a copyrighted translation. Short quotations in personal notes and sermons are fine, but publishing or collecting large portions may need the publisher's permission.`,
  sEsvKey: "ESV API key",
  sEsvKeyDesc: "Your own free key from api.esv.org (non-commercial use). ESV appears in results once a key is set. The icon opens the sign-up page.",
  sCitations: "Copyright notices",
  sCitationsDesc: "Add the copyright notice under quoted passages. ESV and NET always get one, as their terms require.",
  sCitCopyrighted: "Copyrighted translations (recommended)",
  sCitAll: "All translations",
  sCitOff: "Off",
  sQuoteWarn: "Long quotation warning",
  sQuoteWarnDesc: "Warn when more than this many verses of a copyrighted translation are inserted at once. 0 turns it off.",
  sCitation: "Copyright notice",
  sCitationDesc: "Notice added when quoting this translation. Leave empty for none.",
  sCitationKnown: "Recognised translation \u2014 the grey notice is added automatically. Type to override.",
  sCitationPlaceholder: "e.g. Scripture quotations taken from \u2026",
  sLanguage: "Default language",
  sLanguageDesc: "Language selected when the search window opens",
  sTranslations: "Built-in translations",
  sTranslationsDesc: "Fetched online from bolls.life. Only toggled-on translations appear in results; checked ones are selected for insertion by default.",
  sShow: "Show in results",
  sDefaultPick: "Pick by default",
  sCustom: "Add your own translations",
  sCustomDesc: "Add translations beyond the built-in ones in three ways. See Help at the bottom for details.",
  sAddBolls: "Add by bolls.life code\u2026",
  sAddFile: "Add from a JSON file\u2026",
  sAddAccordance: "Add an Accordance module\u2026 (Mac)",
  sAccordanceUnavailable: "Accordance integration isn't available on this device (Mac desktop only).",
  sName: "Name",
  sNamePlaceholder: "e.g. NIV",
  sLang: "Language",
  sMyTranslations: "My translations",
  sMyTranslationsDesc: "Translations shown in the search window. \u2611 pick by default \xB7 \u2191\u2193 reorder \xB7 \u270E edit \xB7 \xD7 remove. They appear in this order in the search window and your notes.",
  sNoTranslations: "No translations yet. Add one below.",
  sUnnamed: "(unnamed)",
  sMoveUp: "Move up",
  sMoveDown: "Move down",
  sEdit: "Edit",
  sDone: "Done",
  sAddTranslation: "Add a translation",
  sAddTranslationDesc: "Pick one from the list to add it. For translations not listed (e.g. NIV, \uAC1C\uC5ED\uAC1C\uC815), choose 'Add an Accordance module'.",
  sChoose: "+ Choose a translation\u2026",
  sOwnGroup: "Add your own",
  sCode: "bolls.life code (e.g. CUNPS)",
  sPath: "JSON path in vault",
  sModule: "Accordance module (e.g. ESVS)",
  sKindBolls: "bolls.life",
  sKindFile: "JSON file",
  sKindAccordance: "Accordance",
  sTest: "Test connection",
  sRemove: "Remove",
  sLinks: "Logos \xB7 Accordance links",
  sLinksDesc: "Add links next to the passage header that open the passage in your Logos or Accordance.",
  sAppLinks: "Add links",
  sLinksNone: "None",
  sLinksLogos: "Logos",
  sLinksAccordance: "Accordance",
  sLinksBoth: "Both",
  sLogosVersion: "Logos version",
  sLogosVersionDesc: "Version abbreviation to open in Logos (e.g. ESV, NASB95). Leave empty to use your preferred Bible in Logos.",
  sAccModule: "Accordance link module",
  sAccModuleDesc: "Module to open via link (e.g. ESVS). Leave empty for your default text. Passages fetched from an Accordance module open in that module.",
  sOutput: "Output",
  sStyle: "Block style",
  sStyleCallout: "Callout",
  sStyleQuote: "Blockquote",
  sStylePlain: "Plain text",
  sCalloutType: "Callout type",
  sCalloutTypeDesc: "e.g. quote, bible, note",
  sGroup: "Group translations into one block",
  sGroupDesc: "When off, each translation gets its own block.",
  sBookName: "Book names",
  sBookFull: "Full (\uC694\uD55C\uBCF5\uC74C / John)",
  sBookShort: "Short (\uCC3D / Gen)",
  sVerseNum: "Verse numbers",
  sVerseNumNone: "Hidden",
  sVerseNumPlain: "Plain (16 For God\u2026)",
  sVerseNumSup: "Superscript (\xB9\u2076For God\u2026)",
  sPerLine: "One verse per line",
  sHeader: "Header format",
  sHeaderDesc: "{ref} reference, {book}, {chapter}, {verses}, {version} translation name, {abbr} abbreviation",
  sClearCache: "Clear cache",
  sClearCacheDesc: "Use this after replacing a JSON file or if text looks wrong.",
  sClear: "Clear",
  sCleared: "Cache cleared.",
  sHelp: "Help",
  help: [
    {
      title: "Where does the text come from?",
      paras: [
        "\uAC1C\uC5ED\uD55C\uAE00 and the open English translations (KJV, WEB, BSB, ASV, YLT, LSV, GNV, DRB) come from bolls.life, a free Bible API. Only the translation code and book/chapter numbers are sent.",
        "NET comes from the official NET Bible API (labs.bible.org) and ESV from Crossway's official API (api.esv.org). Both allow non-commercial quotation and require a copyright notice.",
        "\uC0C8\uBC88\uC5ED is copyrighted by the Korean Bible Society, so it is off by default. You can add it from the 'Add a translation' dropdown, for personal study only."
      ]
    },
    {
      title: "How do I use \uAC1C\uC5ED\uAC1C\uC815 or \uACF5\uB3D9\uBC88\uC5ED?",
      paras: [
        "Korean Bible Society translations such as \uAC1C\uC5ED\uAC1C\uC815, \uACF5\uB3D9\uBC88\uC5ED and \uC0C8\uD55C\uAE00\uC131\uACBD have no free official source. The Society licenses Bible text in software and on the web separately, so Versedrop doesn't download it.",
        "The best route is your own \uAC1C\uC5ED\uAC1C\uC815 module in Accordance (Mac). Follow 'Use your Accordance translations' below; if the name contains '\uAC1C\uC5ED\uAC1C\uC815', the notice '\uC131\uACBD\uC804\uC11C \uAC1C\uC5ED\uAC1C\uC815\uD310 \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C' is added automatically.",
        "Without Accordance, you can connect a JSON file you are licensed to use."
      ]
    },
    {
      title: "Use your Accordance translations (Mac)",
      paras: [
        "Translations you own in Accordance (e.g. ESV, NIV, NASB, \uAC1C\uC5ED\uAC1C\uC815) can appear in Versedrop's results. Text moves only between Accordance and Obsidian on your Mac \u2014 nothing is sent over the internet.",
        "1) Install Accordance on your Mac and download the Bible modules you want.",
        "2) In 'My translations', choose 'Add an Accordance module\u2026 (Mac)' from the 'Add a translation' dropdown.",
        "3) Enter a display name and the module abbreviation exactly as Accordance shows it in the Library or a text tab (case and hyphens matter).",
        "4) Click 'Test connection' to fetch John 3:16. The first time, macOS asks whether Obsidian may control Accordance \u2014 click Allow.",
        "5) Well-known translations (ESV, NIV, NASB, NLT, CSB, NKJV, NRSV, \uAC1C\uC5ED\uAC1C\uC815 \u2026) get their copyright notice automatically. For others, type it into 'Copyright notice'.",
        "If you declined, turn on Accordance under Obsidian in System Settings \u203A Privacy & Security \u203A Automation.",
        "Notes: this doesn't work on Windows or mobile. If Accordance isn't running, the first request takes a few seconds while it launches. Whole chapters are fetched verse by verse, so they can be a little slow."
      ]
    },
    {
      title: "Copyright notices and how much to quote",
      paras: [
        "Quoting a few verses with attribution in sermon notes or personal study is ordinary quotation. The guidelines are: your own writing is the main content, the source is credited, and you don't copy excessively.",
        "So Versedrop adds the copyright notice under copyrighted translations ('Copyright notices' setting) and warns when you insert many verses at once ('Long quotation warning').",
        "You may need the publisher's permission if you keep collecting passages into what is effectively a text database, publish your notes (e.g. on a website), or include large portions in teaching materials or publications."
      ]
    },
    {
      title: "More English translations (ESV \xB7 NET \xB7 Accordance)",
      paras: [
        "ESV: create a free account at api.esv.org and an 'API Application' to get a personal key (non-commercial use only). Paste it into 'ESV API key' right under ESV in 'My translations' and ESV appears. Per Crossway's terms, the notice and an esv.org link are always added, and up to 500 verses can be fetched at once.",
        "NET: works without a key. Per its terms, 'NET' in the header links to netbible.org and a notice is added.",
        "More open translations: LSV (literal, modern), Geneva 1599 and Douay-Rheims can be added from the 'Add a translation' dropdown.",
        "Translations with no free API, such as NIV, NASB, NLT, CSB and NKJV, can be connected from your Accordance modules. Logos text can't be fetched, but 'Logos links' open the passage in Logos."
      ]
    },
    {
      title: "Why can't Logos text be fetched?",
      paras: [
        "Logos offers no official way for other apps to read Bible text, and downloaded resources are encrypted, so Versedrop can't pull text from Logos.",
        "Instead, turn on 'Logos \xB7 Accordance links' above: a Logos (ref.ly) link is added next to the passage header and opens the passage in Logos desktop, mobile or web. Set 'Logos version' to open a specific translation."
      ]
    },
    {
      title: "Add a translation from a JSON file",
      paras: [
        "Put a Bible JSON file you are licensed to use in your vault, choose 'Add from a JSON file\u2026' in the 'Add a translation' dropdown, and enter its vault path (e.g. Bibles/esv.json).",
        'Three layouts are recognised: an array like [{"book":43,"chapter":3,"verse":16,"text":"\u2026"}], nested objects like {"43":{"3":{"16":"\u2026"}}}, and flat keys like {"John 3:16":"\u2026"} or {"\uC6943:16":"\u2026"}. Book numbers run from 1 (Genesis) to 66 (Revelation).'
      ]
    },
    {
      title: "Hotkeys and presets",
      paras: [
        "In 'Hotkeys and presets' above, 'Set hotkey' opens Obsidian's Hotkeys screen filtered to Versedrop. Click + next to a command and press the keys you want.",
        "'Insert in default translations (no window)' inserts the reference on the cursor's line (or the selection) in your \u2611 default translations straight away \u2014 handy for filling an outline.",
        "Presets are translation sets you use together (e.g. Korean\u2013English, Original languages). Each gets its own command and hotkey: on a reference it inserts directly; elsewhere it opens the search window with those translations selected."
      ]
    },
    {
      title: "Chinese, Japanese, Greek and Hebrew",
      paras: [
        "The language groups in the 'Add a translation' dropdown offer \u548C\u5408\u672C (traditional), \u53E3\u8A9E\u8A33, SBLGNT, Textus Receptus and Tischendorf (Greek NT), and WLC and Delitzsch (Hebrew). Once added, a chip for that language appears in the search window.",
        "You can also search with Chinese or Japanese book names, e.g. \u7EA6\u7FF0\u798F\u97F3 3:16, \u7D043:16, \u30E8\u30CF3\u7AE016\u7BC0, \u6797\u524D13:4-7.",
        "Greek texts are NT only and Hebrew WLC is OT only, so their cards appear only when the book is in them. Hebrew versification differs in places (psalm titles, Malachi 4 \u2026) \u2014 check the verse number.",
        "Copyrighted editions such as \u65B0\u6807\u70B9\u548C\u5408\u672C, \u65B0\u5171\u540C\u8A33, \u65B0\u6539\u8A33, NA28, UBS5, Rahlfs LXX and BHS get the right notice automatically when added as Accordance modules."
      ]
    },
    {
      title: "Add translations in other languages",
      paras: [
        "Any bolls.life translation can be added by code ('Add by bolls.life code\u2026'). Examples: LUT (Luther 1912, German), RV1960 (Reina-Valera 1960, Spanish). The full list is at bolls.life/static/bolls/app/views/languages.json. Please respect each translation's license."
      ]
    }
  ]
};
function uiLang() {
  var _a;
  try {
    const l = (_a = window.localStorage.getItem("language")) != null ? _a : "";
    return l.startsWith("ko") ? "ko" : "en";
  } catch (e) {
    return "en";
  }
}
var t = typeof window !== "undefined" && uiLang() === "ko" ? ko : en;

// src/reference.ts
var RefParseError = class extends Error {
};
function parseReference(input) {
  let s = input.trim().replace(/[：]/g, ":").replace(/[~～–—]/g, "-").replace(/[，、]/g, ",").replace(/(\d)\s*[장편章篇]\s*/g, "$1:").replace(/\s*[절節节]/g, "").replace(/:\s*$/, "");
  const m = s.match(/^([1-3]?\s*[^\d\s:,-][^\d:]*?)\s*(\d+)\s*(?:[:.]\s*([\d\s,-]+))?$/);
  if (!m) throw new RefParseError(t.errFormat);
  const book = findBook(m[1]);
  if (!book) throw new RefParseError(t.errBook(m[1].trim()));
  const chapter = parseInt(m[2], 10);
  if (!chapter) throw new RefParseError(t.errChapter);
  const ranges = [];
  if (m[3]) {
    for (const part of m[3].split(",")) {
      const p = part.trim();
      if (!p) continue;
      const r = p.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
      if (!r) throw new RefParseError(t.errVerse(p));
      const start = parseInt(r[1], 10);
      const end = r[2] ? parseInt(r[2], 10) : start;
      if (!start || end < start) throw new RefParseError(t.errRange(p));
      ranges.push({ start, end });
    }
  }
  return { book, chapter, ranges };
}
function versesLabel(ranges) {
  return ranges.map((r) => r.start === r.end ? `${r.start}` : `${r.start}-${r.end}`).join(", ");
}
function inRanges(verse, ranges) {
  if (ranges.length === 0) return true;
  return ranges.some((r) => verse >= r.start && verse <= r.end);
}

// src/links.ts
function span(ref) {
  if (!ref.ranges.length) return {};
  return { first: ref.ranges[0].start, last: ref.ranges[ref.ranges.length - 1].end };
}
function logosUrl(ref, version) {
  const book = ref.book.enShort.replace(/\s/g, "");
  const { first, last } = span(ref);
  let r = `${book}${ref.chapter}`;
  if (first) r += `.${first}${last && last !== first ? `-${last}` : ""}`;
  const v = version.trim();
  return `https://ref.ly/${r}${v ? `;${encodeURIComponent(v)}` : ""}`;
}
function accordanceUrl(ref, module2) {
  const name = (ref.book.num === 22 ? "Song" : ref.book.en).replace(/\s/g, "_");
  const { first, last } = span(ref);
  let r = `${name}_${ref.chapter}`;
  if (first) r += `:${first}${last && last !== first ? `-${last}` : ""}`;
  const m = module2.trim().replace(/\s/g, "_");
  return m ? `accord://read/${encodeURIComponent(m)}?${r}` : `accord://read/${r}`;
}

// src/sources.ts
var import_obsidian2 = require("obsidian");

// src/accordance.ts
var import_obsidian = require("obsidian");
var SEP = "";
var SCRIPT = `
on run argv
	set moduleName to item 1 of argv
	set chapterRef to item 2 of argv
	set verseList to item 3 of argv
	set rs to character id 30
	set out to ""
	set oldDelims to AppleScript's text item delimiters
	if verseList is "all" then
		set prevText to ""
		repeat with v from 1 to 200
			tell application "Accordance" to set r to \xABevent AccdTxRf\xBB {moduleName, chapterRef & ":" & v, false}
			if r is "" or r starts with "Err" or r is prevText then exit repeat
			set out to out & v & tab & r & rs
			set prevText to r
		end repeat
	else
		set AppleScript's text item delimiters to ","
		set vs to text items of verseList
		set AppleScript's text item delimiters to oldDelims
		repeat with v in vs
			tell application "Accordance" to set r to \xABevent AccdTxRf\xBB {moduleName, chapterRef & ":" & (v as text), false}
			set out to out & (v as text) & tab & r & rs
		end repeat
	end if
	set AppleScript's text item delimiters to oldDelims
	return out
end run
`;
function accordanceAvailable() {
  return import_obsidian.Platform.isDesktopApp && import_obsidian.Platform.isMacOS;
}
function parseAccordanceOutput(out) {
  const verses = [];
  let errors = 0;
  for (const rec of out.split(SEP)) {
    const tab = rec.indexOf("	");
    if (tab < 0) continue;
    const verse = parseInt(rec.slice(0, tab).trim(), 10);
    let text = rec.slice(tab + 1).trim();
    if (!verse) continue;
    if (!text || text.startsWith("Err")) {
      errors++;
      continue;
    }
    text = text.replace(new RegExp(`^(?:[^\\d\\s]*\\s?\\d+:)?${verse}\\s+`), "");
    verses.push({ verse, text });
  }
  return { verses, errors };
}
async function fetchFromAccordance(module2, chapterRef, verses) {
  if (!accordanceAvailable()) throw new Error(t.accMacOnly);
  if (!module2.trim()) throw new Error(t.accNoModule);
  const { execFile } = require("child_process");
  const verseArg = verses === "all" ? "all" : verses.join(",");
  const stdout = await new Promise((resolve, reject) => {
    execFile(
      "osascript",
      ["-e", SCRIPT, module2.trim(), chapterRef, verseArg],
      { timeout: 3e4, maxBuffer: 4 * 1024 * 1024 },
      (err, out, stderr) => {
        if (err) {
          const msg = `${stderr || ""} ${err.message || ""}`;
          if (/-1743|not authori[sz]ed|허용되지/i.test(msg)) reject(new Error(t.accPermission));
          else if (/-1728|-600|-10814|can.t get application|isn.t running|찾을 수 없/i.test(msg)) reject(new Error(t.accNotFound));
          else if (err.killed) reject(new Error(t.accTimeout));
          else reject(new Error(`${t.accFailed} ${String(stderr || err.message).trim()}`));
          return;
        }
        resolve(out);
      }
    );
  });
  const { verses: result, errors } = parseAccordanceOutput(stdout);
  if (!result.length && errors) throw new Error(t.accBadModule(module2.trim()));
  return result;
}

// src/citations.ts
var KNOWN_CITATIONS = [
  // Korean Bible Society
  { pattern: /개역개정|nkrv|krv-?nk|^gae$/i, text: "\uC131\uACBD\uC804\uC11C \uAC1C\uC5ED\uAC1C\uC815\uD310 \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  { pattern: /새번역|rnksv|^nir$/i, text: "\uC131\uACBD\uC804\uC11C \uC0C8\uBC88\uC5ED \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  { pattern: /공동번역|kcb|^kor$/i, text: "\uACF5\uB3D9\uBC88\uC5ED\uC131\uC11C \uAC1C\uC815\uD310 \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  { pattern: /새한글|nkt/i, text: "\uC0C8\uD55C\uAE00\uC131\uACBD \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  { pattern: /쉬운성경/i, text: "\uC26C\uC6B4\uC131\uACBD \xA9 \uC544\uAC00\uD398\uCD9C\uD310\uC0AC" },
  { pattern: /현대인의\s*성경|klb/i, text: "\uD604\uB300\uC778\uC758\uC131\uACBD \xA9 \uC0DD\uBA85\uC758\uB9D0\uC500\uC0AC" },
  // English
  {
    pattern: /^esv/i,
    text: "Scripture quotations are from the ESV\xAE Bible (The Holy Bible, English Standard Version\xAE), \xA9 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
    link: "https://www.esv.org"
  },
  {
    pattern: /^niv/i,
    text: "Scripture quotations taken from The Holy Bible, New International Version\xAE NIV\xAE. Copyright \xA9 1973, 1978, 1984, 2011 by Biblica, Inc.\u2122 Used by permission. All rights reserved worldwide."
  },
  {
    pattern: /^nasb|^nas20|^nas95/i,
    text: "Scripture quotations taken from the (NASB\xAE) New American Standard Bible\xAE, Copyright \xA9 1960, 1971, 1977, 1995, 2020 by The Lockman Foundation. Used by permission. All rights reserved.",
    link: "https://www.lockman.org"
  },
  {
    pattern: /^nlt/i,
    text: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright \xA9 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers. All rights reserved."
  },
  {
    pattern: /^csb|^hcsb/i,
    text: "Scripture quotations marked CSB have been taken from the Christian Standard Bible\xAE, Copyright \xA9 2017 by Holman Bible Publishers. Used by permission."
  },
  {
    pattern: /^nkjv/i,
    text: "Scripture taken from the New King James Version\xAE. Copyright \xA9 1982 by Thomas Nelson. Used by permission. All rights reserved."
  },
  {
    pattern: /^nrsv/i,
    text: "Scripture quotations are from the New Revised Standard Version Bible, copyright \xA9 the National Council of the Churches of Christ in the United States of America. Used by permission. All rights reserved."
  },
  // Chinese
  { pattern: /新标点|新標點|^cunps?$|^cnvs?$/i, text: "\u7ECF\u6587\u5F15\u81EA\u300A\u65B0\u6807\u70B9\u548C\u5408\u672C\u300B\uFF0C\xA9 \u9999\u6E2F\u5723\u7ECF\u516C\u4F1A\uFF0C\u8499\u5141\u51C6\u4F7F\u7528\u3002" },
  { pattern: /思高|^chisb$/i, text: "\u601D\u9AD8\u8056\u7D93 \xA9 \u601D\u9AD8\u8056\u7D93\u5B78\u6703" },
  // Japanese
  { pattern: /新共同訳|^jpnict$/i, text: "\u8056\u66F8 \u65B0\u5171\u540C\u8A33 \xA9 \u65E5\u672C\u8056\u66F8\u5354\u4F1A" },
  { pattern: /聖書協会共同訳/i, text: "\u8056\u66F8 \u8056\u66F8\u5354\u4F1A\u5171\u540C\u8A33 \xA9 \u65E5\u672C\u8056\u66F8\u5354\u4F1A" },
  { pattern: /新改訳|^njb$/i, text: "\u8056\u66F8 \u65B0\u6539\u8A33 \xA9 \u65B0\u65E5\u672C\u8056\u66F8\u520A\u884C\u4F1A" },
  // Greek & Hebrew critical editions
  { pattern: /^na2[78]|nestle|novum testamentum graece/i, text: "Novum Testamentum Graece, 28th revised edition, \xA9 2012 Deutsche Bibelgesellschaft, Stuttgart." },
  { pattern: /^ubs[45]|greek new testament.*ubs/i, text: "The Greek New Testament, 5th revised edition, \xA9 2014 Deutsche Bibelgesellschaft, Stuttgart." },
  { pattern: /^lxx|rahlfs|septuag/i, text: "Septuaginta, ed. A. Rahlfs and R. Hanhart, \xA9 2006 Deutsche Bibelgesellschaft, Stuttgart." },
  { pattern: /^bhs|stuttgartensia/i, text: "Biblia Hebraica Stuttgartensia, 5th edition, \xA9 1967/77, 1997 Deutsche Bibelgesellschaft, Stuttgart." },
  { pattern: /^sblgnt/i, text: "Scripture quotations marked SBLGNT are from the SBL Greek New Testament. Copyright \xA9 2010 Society of Biblical Literature and Logos Bible Software.", link: "https://sblgnt.com" },
  {
    pattern: /^net\b|^net2/i,
    text: "The Scriptures quoted are from the NET Bible\xAE, copyright \xA9 1996, 2019 used with permission from Biblical Studies Press, L.L.C. All rights reserved.",
    link: "https://netbible.org"
  }
];
function knownCitation(...keys) {
  for (const k of keys) {
    const key = (k != null ? k : "").trim();
    if (!key) continue;
    const hit = KNOWN_CITATIONS.find((c) => c.pattern.test(key));
    if (hit) return hit;
  }
  return void 0;
}

// src/sources.ts
var LANGS = ["ko", "en", "zh", "ja", "grc", "he"];
var BUILT_IN_TRANSLATIONS = [
  // Korean
  { id: "KRV", name: "\uAC1C\uC5ED\uD55C\uAE00", abbr: "\uAC1C\uC5ED\uD55C\uAE00", lang: "ko", source: "bolls", code: "KRV", note: "1961 \xB7 \uC800\uC791\uAD8C \uBCF4\uD638\uAE30\uAC04 \uB9CC\uB8CC / out of copyright", builtIn: true, defaultOn: true, notice: "\uC131\uACBD\uC804\uC11C \uAC1C\uC5ED\uD55C\uAE00\uD310, \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  { id: "RNKSV", name: "\uC0C8\uBC88\uC5ED", abbr: "\uC0C8\uBC88\uC5ED", lang: "ko", source: "bolls", code: "RNKSV", note: "\xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C \xB7 bolls.life \uC81C\uACF5 \u2014 \uAE30\uBCF8 \uAEBC\uC9D0 / off by default", builtIn: true, defaultOn: false, copyrighted: true, notice: "\uC131\uACBD\uC804\uC11C \uC0C8\uBC88\uC5ED \xA9 \uB300\uD55C\uC131\uC11C\uACF5\uD68C" },
  // English — public domain or open licence, no key needed
  { id: "KJV", name: "King James Version", abbr: "KJV", lang: "en", source: "bolls", code: "KJV", note: "Public domain", builtIn: true, defaultOn: true },
  { id: "WEB", name: "World English Bible", abbr: "WEB", lang: "en", source: "bolls", code: "WEB", note: "Public domain \xB7 modern English", builtIn: true, defaultOn: true },
  { id: "BSB", name: "Berean Standard Bible", abbr: "BSB", lang: "en", source: "bolls", code: "BSB", note: "Public domain (2023~) \xB7 modern English", builtIn: true, defaultOn: true },
  {
    id: "NET",
    name: "New English Translation",
    abbr: "NET",
    lang: "en",
    source: "net",
    note: "\xA9 Biblical Studies Press \xB7 free for non-commercial quotation, via the official NET Bible API",
    builtIn: true,
    defaultOn: true,
    copyrighted: true,
    noticeRequired: true,
    notice: "The Scriptures quoted are from the NET Bible\xAE, copyright \xA9 1996, 2019 used with permission from Biblical Studies Press, L.L.C. All rights reserved.",
    link: "https://netbible.org",
    linkAbbr: true
  },
  {
    id: "ESV",
    name: "English Standard Version",
    abbr: "ESV",
    lang: "en",
    source: "esv",
    note: "\xA9 Crossway \xB7 needs your own free ESV API key (non-commercial)",
    builtIn: true,
    defaultOn: true,
    copyrighted: true,
    noticeRequired: true,
    notice: "Scripture quotations are from the ESV\xAE Bible (The Holy Bible, English Standard Version\xAE), \xA9 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
    link: "https://www.esv.org"
  },
  { id: "ASV", name: "American Standard Version", abbr: "ASV", lang: "en", source: "bolls", code: "ASV", note: "Public domain (1901)", builtIn: true, defaultOn: true },
  { id: "YLT", name: "Young's Literal Translation", abbr: "YLT", lang: "en", source: "bolls", code: "YLT", note: "Public domain (1898)", builtIn: true, defaultOn: true },
  { id: "LSV", name: "Literal Standard Version", abbr: "LSV", lang: "en", source: "bolls", code: "LSV", note: "CC BY-SA 4.0 \xB7 literal, modern English", builtIn: true, defaultOn: false, notice: "Literal Standard Version (LSV), CC BY-SA 4.0, Covenant Press" },
  { id: "GNV", name: "Geneva Bible (1599)", abbr: "GNV", lang: "en", source: "bolls", code: "GNV", note: "Public domain", builtIn: true, defaultOn: false },
  { id: "DRB", name: "Douay-Rheims Bible", abbr: "DRB", lang: "en", source: "bolls", code: "DRB", note: "Public domain \xB7 Catholic", builtIn: true, defaultOn: false },
  // Chinese
  { id: "CUV", name: "\u548C\u5408\u672C", abbr: "\u548C\u5408\u672C", lang: "zh", script: "traditional", source: "bolls", code: "CUV", note: "Chinese Union Version 1919 \xB7 \u7E41\u9AD4 \xB7 Public domain", builtIn: true, defaultOn: false },
  // Japanese
  { id: "JPKJV", name: "\u53E3\u8A9E\u8A33", abbr: "\u53E3\u8A9E\u8A33", lang: "ja", source: "bolls", code: "JPKJV", note: "Japanese Colloquial 1954/55 \xB7 \u65E5\u672C\u3067\u306F\u8457\u4F5C\u6A29\u4FDD\u8B77\u671F\u9593\u6E80\u4E86", builtIn: true, defaultOn: false },
  // Greek
  {
    id: "SBLGNT",
    name: "SBL Greek New Testament",
    abbr: "SBLGNT",
    lang: "grc",
    testament: "NT",
    source: "bolls",
    code: "SBLGNT",
    note: "\xA9 2010 SBL & Logos \xB7 free with attribution \xB7 NT",
    builtIn: true,
    defaultOn: false,
    copyrighted: true,
    noticeRequired: true,
    notice: "Scripture quotations marked SBLGNT are from the SBL Greek New Testament. Copyright \xA9 2010 Society of Biblical Literature and Logos Bible Software.",
    link: "https://sblgnt.com"
  },
  { id: "TR", name: "Textus Receptus (Elzevir 1624)", abbr: "TR", lang: "grc", testament: "NT", source: "bolls", code: "TR", note: "Public domain \xB7 NT", builtIn: true, defaultOn: false },
  { id: "TISCH", name: "Tischendorf 8th ed.", abbr: "Tisch", lang: "grc", testament: "NT", source: "bolls", code: "TISCH", note: "Public domain (1869\u201372) \xB7 NT", builtIn: true, defaultOn: false },
  // Hebrew
  { id: "WLC", name: "Westminster Leningrad Codex", abbr: "WLC", lang: "he", testament: "OT", source: "bolls", code: "WLC", note: "Public domain \xB7 vowels \xB7 OT", builtIn: true, defaultOn: false },
  { id: "WLCa", name: "WLC (vowels + accents)", abbr: "WLC", lang: "he", testament: "OT", source: "bolls", code: "WLCa", note: "Public domain \xB7 vowels and cantillation \xB7 OT", builtIn: true, defaultOn: false },
  { id: "DHNT", name: "Delitzsch Hebrew NT", abbr: "Delitzsch", lang: "he", testament: "NT", source: "bolls", code: "DHNT", note: "Public domain (1877) \xB7 NT", builtIn: true, defaultOn: false }
];
function hasBook(tr, bookNum) {
  if (tr.testament === "OT") return bookNum <= 39;
  if (tr.testament === "NT") return bookNum >= 40;
  return true;
}
function noticeFor(tr) {
  var _a;
  if ((_a = tr.citation) == null ? void 0 : _a.trim()) return { text: tr.citation.trim() };
  if (tr.notice) return { text: tr.notice, link: tr.link };
  if (tr.builtIn) return void 0;
  const k = knownCitation(tr.name, tr.abbr, tr.module, tr.code);
  return k ? { text: k.text, link: k.link } : void 0;
}
function isCopyrighted(tr) {
  if (tr.builtIn) return !!tr.copyrighted;
  return !!noticeFor(tr);
}
var ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function cleanText(raw) {
  return raw.replace(/<S>[^<]*<\/S>/gi, "").replace(/<sup>[\s\S]*?<\/sup>/gi, "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    var _a;
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return (_a = ENTITIES[e.toLowerCase()]) != null ? _a : m;
  }).replace(/\s+/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
}
function indexLocalBible(data) {
  const map = /* @__PURE__ */ new Map();
  const add = (book, chapter, verse, text) => {
    if (!book || !chapter || !verse || typeof text !== "string") return;
    const key = `${book}:${chapter}`;
    let arr = map.get(key);
    if (!arr) map.set(key, arr = []);
    arr.push({ verse, text: cleanText(text) });
  };
  const bookNum = (k) => {
    var _a, _b;
    return /^\d+$/.test(k) ? parseInt(k, 10) : (_b = (_a = findBook(k)) == null ? void 0 : _a.num) != null ? _b : 0;
  };
  if (Array.isArray(data)) {
    for (const row of data) {
      add(Number(row.book), Number(row.chapter), Number(row.verse), row.text);
    }
  } else if (data && typeof data === "object") {
    const entries = Object.entries(data);
    if (entries.length && typeof entries[0][1] === "string") {
      for (const [k, v] of entries) {
        const m = k.trim().match(/^(.+?)\s*(\d+)\s*:\s*(\d+)$/);
        if (m) add(bookNum(m[1].trim()), parseInt(m[2], 10), parseInt(m[3], 10), v);
      }
    } else {
      for (const [bk, chapters] of entries) {
        if (!chapters || typeof chapters !== "object") continue;
        for (const [ck, verses] of Object.entries(chapters)) {
          if (!verses || typeof verses !== "object") continue;
          for (const [vk, text] of Object.entries(verses)) {
            add(bookNum(bk), parseInt(ck, 10), parseInt(vk, 10), text);
          }
        }
      }
    }
  }
  for (const arr of map.values()) arr.sort((a, b) => a.verse - b.verse);
  return map;
}
function apiBookName(book) {
  return book.num === 22 ? "Song of Solomon" : book.en;
}
function parseEsvText(passages) {
  var _a;
  const out = [];
  for (const p of passages) {
    const parts = p.split(/\[(\d+)\]/);
    for (let i = 1; i < parts.length; i += 2) {
      const verse = parseInt(parts[i], 10);
      const text = cleanText((_a = parts[i + 1]) != null ? _a : "").replace(/\s*\(ESV\)\s*$/, "");
      if (verse && text) out.push({ verse, text });
    }
  }
  return out;
}
function parseNetJson(rows, chapter) {
  if (!Array.isArray(rows)) return [];
  return rows.filter((r) => parseInt(String(r.chapter), 10) === chapter).map((r) => {
    var _a;
    return { verse: parseInt(String(r.verse), 10), text: cleanText(String((_a = r.text) != null ? _a : "")) };
  }).filter((v) => v.verse && v.text);
}
var ESV_CACHE_LIMIT = 500;
var BibleSource = class {
  constructor(app, esvKey) {
    this.app = app;
    this.esvKey = esvKey;
    this.chapterCache = /* @__PURE__ */ new Map();
    this.fileCache = /* @__PURE__ */ new Map();
    this.esvCache = /* @__PURE__ */ new Map();
    this.esvCached = 0;
  }
  clearCache() {
    this.chapterCache.clear();
    this.fileCache.clear();
    this.esvCache.clear();
    this.esvCached = 0;
  }
  /** Verses of the reference in this translation (empty if the passage doesn't exist there). */
  async getPassage(tr, ref) {
    if (!hasBook(tr, ref.book.num)) return [];
    let verses;
    if (tr.source === "accordance") verses = await this.fromAccordance(tr, ref);
    else if (tr.source === "esv") verses = await this.fromEsv(ref);
    else verses = (await this.getChapter(tr, ref.book, ref.chapter)).filter((v) => inRanges(v.verse, ref.ranges));
    if (tr.lang === "he") verses = verses.map((v) => ({ ...v, text: v.text.replace(/\//g, "") }));
    return verses;
  }
  async getChapter(tr, book, chapter) {
    const key = `${tr.id}|${book.num}:${chapter}`;
    const hit = this.chapterCache.get(key);
    if (hit) return hit;
    let verses;
    if (tr.source === "file") verses = await this.fromFile(tr, book.num, chapter);
    else if (tr.source === "net") verses = await this.fromNet(book, chapter);
    else verses = await this.fromBolls(tr, book.num, chapter);
    if (verses.length) this.chapterCache.set(key, verses);
    return verses;
  }
  async fromBolls(tr, book, chapter) {
    if (!tr.code) throw new Error(t.errNoCode);
    const url = `https://bolls.life/get-text/${encodeURIComponent(tr.code)}/${book}/${chapter}/`;
    const res = await (0, import_obsidian2.requestUrl)({ url, throw: false });
    if (res.status !== 200) throw new Error(t.errHttp("bolls.life", res.status));
    const rows = res.json;
    if (!Array.isArray(rows)) throw new Error(t.errResponse("bolls.life"));
    return rows.map((r) => {
      var _a;
      return { verse: r.verse, text: cleanText((_a = r.text) != null ? _a : "") };
    });
  }
  async fromNet(book, chapter) {
    const passage = `${apiBookName(book)} ${chapter}`;
    const url = `https://labs.bible.org/api/?passage=${encodeURIComponent(passage)}&type=json&formatting=plain`;
    const res = await (0, import_obsidian2.requestUrl)({ url, throw: false });
    if (res.status !== 200) throw new Error(t.errHttp("NET Bible", res.status));
    let rows;
    try {
      rows = res.json;
    } catch (e) {
      throw new Error(t.errResponse("NET Bible"));
    }
    return parseNetJson(rows, chapter);
  }
  async fromEsv(ref) {
    var _a;
    const key = this.esvKey().trim();
    if (!key) throw new Error(t.esvNoKey);
    const book = apiBookName(ref.book);
    const q = ref.ranges.length ? ref.ranges.map((r) => `${book} ${ref.chapter}:${r.start}-${r.end}`).join("; ") : `${book} ${ref.chapter}`;
    const cached = this.esvCache.get(q);
    if (cached) return cached;
    const params = new URLSearchParams({
      q,
      "include-passage-references": "false",
      "include-verse-numbers": "true",
      "include-first-verse-numbers": "true",
      "include-footnotes": "false",
      "include-headings": "false",
      "include-short-copyright": "false",
      "include-copyright": "false",
      "include-selahs": "true",
      "indent-paragraphs": "0",
      "indent-poetry": "false"
    });
    const res = await (0, import_obsidian2.requestUrl)({
      url: `https://api.esv.org/v3/passage/text/?${params.toString()}`,
      headers: { Authorization: `Token ${key}` },
      throw: false
    });
    if (res.status === 401 || res.status === 403) throw new Error(t.esvBadKey);
    if (res.status === 429) throw new Error(t.esvThrottled);
    if (res.status !== 200) throw new Error(t.errHttp("ESV API", res.status));
    const data = res.json;
    const verses = parseEsvText((_a = data.passages) != null ? _a : []).filter((v) => inRanges(v.verse, ref.ranges));
    if (this.esvCached + verses.length > ESV_CACHE_LIMIT) {
      this.esvCache.clear();
      this.esvCached = 0;
    }
    if (verses.length) {
      this.esvCache.set(q, verses);
      this.esvCached += verses.length;
    }
    return verses;
  }
  async fromAccordance(tr, ref) {
    var _a;
    const key = `${tr.id}|acc|${ref.book.num}:${ref.chapter}:${JSON.stringify(ref.ranges)}`;
    const hit = this.chapterCache.get(key);
    if (hit) return hit;
    const wanted = ref.ranges.length ? ref.ranges.flatMap((r) => Array.from({ length: Math.min(r.end - r.start + 1, 200) }, (_, i) => r.start + i)) : "all";
    const bookName = ref.book.num === 22 ? "Song" : ref.book.en;
    const raw = await fetchFromAccordance((_a = tr.module) != null ? _a : "", `${bookName} ${ref.chapter}`, wanted);
    const verses = raw.map((v) => ({ verse: v.verse, text: cleanText(v.text) })).filter((v) => v.text);
    if (verses.length) this.chapterCache.set(key, verses);
    return verses;
  }
  async fromFile(tr, book, chapter) {
    var _a;
    if (!tr.path) throw new Error(t.errNoPath);
    const path = (0, import_obsidian2.normalizePath)(tr.path);
    let index = this.fileCache.get(path);
    if (!index) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (!(file instanceof import_obsidian2.TFile)) throw new Error(t.errFileMissing(path));
      const raw = await this.app.vault.cachedRead(file);
      let data;
      try {
        data = JSON.parse(raw.replace(/^﻿/, ""));
      } catch (e) {
        throw new Error(t.errJson(path));
      }
      index = indexLocalBible(data);
      if (index.size === 0) throw new Error(t.errJsonFormat);
      this.fileCache.set(path, index);
    }
    return (_a = index.get(`${book}:${chapter}`)) != null ? _a : [];
  }
};

// src/format.ts
function bookLabel(book, lang, style, script) {
  const full = style === "full";
  switch (lang) {
    case "ko":
      return full ? book.ko : book.koShort;
    case "zh":
      return script === "traditional" ? full ? book.zhT : book.zhTShort : full ? book.zh : book.zhShort;
    case "ja":
      return full ? book.ja : book.jaShort;
    default:
      return full ? book.en : book.enShort;
  }
}
function refLabel(ref, lang, bookName, script) {
  const name = bookLabel(ref.book, lang, bookName, script);
  const cjk = lang === "ko" || lang === "zh" || lang === "ja";
  const sep = cjk && bookName === "short" ? "" : " ";
  const verses = ref.ranges.length ? `:${versesLabel(ref.ranges)}` : "";
  return `${name}${sep}${ref.chapter}${verses}`;
}
function header(ref, tr, o) {
  const book = bookLabel(ref.book, tr.lang, o.bookName, tr.script);
  const vars = {
    ref: refLabel(ref, tr.lang, o.bookName, tr.script),
    book,
    chapter: String(ref.chapter),
    verses: versesLabel(ref.ranges),
    version: tr.name,
    abbr: tr.linkAbbr && tr.link ? `[${tr.abbr}](${tr.link})` : tr.abbr
  };
  return o.headerTemplate.replace(/\{(\w+)\}/g, (m, k) => {
    var _a;
    return (_a = vars[k]) != null ? _a : m;
  }).trim();
}
function appLinks(ref, o, tr) {
  const out = [];
  if (o.appLinks === "logos" || o.appLinks === "both") out.push(`[Logos](${logosUrl(ref, o.logosVersion)})`);
  if (o.appLinks === "accordance" || o.appLinks === "both") {
    const module2 = (tr == null ? void 0 : tr.source) === "accordance" && tr.module ? tr.module : o.accordanceModule;
    out.push(`[Accordance](${accordanceUrl(ref, module2)})`);
  }
  return out.length ? ` \xB7 ${out.join(" \xB7 ")}` : "";
}
function noticeLine(tr, o) {
  const n = noticeFor(tr);
  const show = tr.noticeRequired || o.citations === "all" || o.citations === "copyrighted" && isCopyrighted(tr);
  if (!show) return "";
  if (!n) return o.citations === "all" ? `*${tr.name} \u2014 public domain*` : "";
  const host = n.link ? n.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return `*${n.text}*${n.link ? ` [${host}](${n.link})` : ""}`;
}
var SUP = "\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079";
function verseNo(n, style) {
  if (style === "none") return "";
  if (style === "sup") return String(n).replace(/\d/g, (d) => SUP[+d]);
  return `${n} `;
}
function bodyLines(verses, o) {
  const pieces = [];
  let prev = -1;
  for (const v of verses) {
    if (prev !== -1 && v.verse !== prev + 1) pieces.push("\u2026");
    pieces.push(`${verseNo(v.verse, o.verseNumbers)}${v.text}`);
    prev = v.verse;
  }
  return o.versePerLine ? pieces : [pieces.join(" ")];
}
function wrap(headerText, links, lines, notices, o) {
  const q = (l) => l ? `> ${l}` : ">";
  const tail = notices.length ? ["", ...notices] : [];
  if (o.style === "callout") {
    const type = o.calloutType.trim() || "quote";
    return [`> [!${type}] ${headerText}${links}`, ...lines.map(q), ...tail.map(q)].join("\n");
  }
  if (o.style === "quote") {
    return [...lines.map(q), `> \u2014 ${headerText}${links}`, ...tail.map(q)].join("\n");
  }
  const body = [`**${headerText}**${links}`, ...lines].join(o.versePerLine ? "  \n" : "\n");
  return notices.length ? `${body}

${notices.join("  \n")}` : body;
}
function formatPassages(ref, passages, o) {
  var _a;
  const usable = passages.filter((p) => p.verses.length);
  if (!usable.length) return "";
  if (!o.group || usable.length === 1) {
    return usable.map((p) => {
      const n = noticeLine(p.translation, o);
      return wrap(header(ref, p.translation, o), appLinks(ref, o, p.translation), bodyLines(p.verses, o), n ? [n] : [], o);
    }).join("\n\n");
  }
  const title = [...new Set(usable.map((p) => refLabel(ref, p.translation.lang, o.bookName, p.translation.script)))].join(" \xB7 ");
  const lines = [];
  usable.forEach((p, i) => {
    if (i > 0) lines.push("");
    const tr = p.translation;
    lines.push(tr.linkAbbr && tr.link ? `**${tr.name}** ([${tr.abbr}](${tr.link}))` : `**${tr.name}**`);
    lines.push(...bodyLines(p.verses, o));
  });
  const accTr = (_a = usable.find((p) => p.translation.source === "accordance")) == null ? void 0 : _a.translation;
  const links = appLinks(ref, o, accTr);
  const notices = [...new Set(usable.map((p) => noticeLine(p.translation, o)).filter(Boolean))];
  if (o.style === "plain") {
    const body = [`**${title}**${links}`, "", ...lines].join("\n");
    return notices.length ? `${body}

${notices.join("  \n")}` : body;
  }
  return wrap(title, links, lines, notices, o);
}

// src/hotkeys.ts
var import_obsidian3 = require("obsidian");
var MAC = { Mod: "\u2318", Ctrl: "\u2303", Meta: "\u2318", Alt: "\u2325", Shift: "\u21E7" };
var OTHER = { Mod: "Ctrl", Ctrl: "Ctrl", Meta: "Win", Alt: "Alt", Shift: "Shift" };
function formatHotkey(h) {
  const map = import_obsidian3.Platform.isMacOS ? MAC : OTHER;
  const mods = h.modifiers.map((m) => {
    var _a;
    return (_a = map[m]) != null ? _a : m;
  });
  const key = h.key.length === 1 ? h.key.toUpperCase() : h.key;
  return import_obsidian3.Platform.isMacOS ? `${mods.join("")}${key}` : [...mods, key].join("+");
}
function hotkeysFor(app, commandId) {
  var _a, _b;
  try {
    const hm = app.hotkeyManager;
    if (!hm) return "";
    const keys = (_b = (_a = hm.getHotkeys(commandId)) != null ? _a : hm.getDefaultHotkeys(commandId)) != null ? _b : [];
    return keys.map(formatHotkey).join(", ");
  } catch (e) {
    return "";
  }
}
function openHotkeySettings(app, filter) {
  var _a;
  try {
    const setting = app.setting;
    if (!setting) throw new Error("no settings");
    setting.open();
    setting.openTabById("hotkeys");
    const tab = setting.activeTab;
    if (tab == null ? void 0 : tab.searchComponent) {
      tab.searchComponent.setValue(filter);
      (_a = tab.updateHotkeyVisibility) == null ? void 0 : _a.call(tab);
    }
  } catch (e) {
    new import_obsidian3.Notice(t.hotkeyFallback, 8e3);
  }
}
function removeCommand(app, fullId) {
  var _a;
  try {
    (_a = app.commands) == null ? void 0 : _a.removeCommand(fullId);
  } catch (e) {
  }
}

// src/modal.ts
var import_obsidian4 = require("obsidian");
var VerseModal = class extends import_obsidian4.Modal {
  constructor(app, plugin, editor, initial = "", opts = {}) {
    var _a;
    super(app);
    this.plugin = plugin;
    this.editor = editor;
    this.initial = initial;
    this.langButtons = /* @__PURE__ */ new Map();
    this.available = [];
    this.ref = null;
    this.cards = [];
    this.searchToken = 0;
    this.persist = !opts.picked;
    this.picked = new Set((_a = opts.picked) != null ? _a : plugin.settings.picked);
    if (opts.picked) {
      const langs = plugin.allTranslations().filter((tr) => this.picked.has(tr.id)).map((tr) => tr.lang);
      this.langs = new Set(langs.length ? langs : plugin.settings.languages);
    } else this.langs = new Set(plugin.settings.languages);
  }
  onOpen() {
    const { contentEl, modalEl } = this;
    modalEl.addClass("versedrop-modal");
    this.titleEl.setText(t.modalTitle);
    const row = contentEl.createDiv({ cls: "versedrop-search" });
    this.input = row.createEl("input", { type: "text", placeholder: t.placeholder, cls: "versedrop-input" });
    this.input.value = this.initial;
    const searchBtn = row.createEl("button", { text: t.search, cls: "mod-cta" });
    searchBtn.addEventListener("click", () => this.search());
    this.available = LANGS.filter((l) => this.plugin.allTranslations().some((tr) => tr.lang === l));
    if (![...this.langs].some((l) => this.available.includes(l)) && this.available.length) this.langs = /* @__PURE__ */ new Set([this.available[0]]);
    if (this.available.length > 1) {
      const langRow = contentEl.createDiv({ cls: "versedrop-langs" });
      for (const l of this.available) {
        const b = langRow.createEl("button", { text: t.langName[l], cls: "versedrop-lang" });
        b.addEventListener("click", () => this.toggleLang(l));
        this.langButtons.set(l, b);
      }
      const all = langRow.createEl("button", { text: t.langAll, cls: "versedrop-lang versedrop-lang-all" });
      all.addEventListener("click", () => this.selectAllLangs());
      this.langButtons.set("all", all);
      this.paintLang();
    }
    this.messageEl = contentEl.createDiv({ cls: "versedrop-message" });
    this.resultsEl = contentEl.createDiv({ cls: "versedrop-results" });
    const footer = contentEl.createDiv({ cls: "versedrop-footer" });
    footer.createSpan({ text: t.hint, cls: "versedrop-hint" });
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
  onClose() {
    this.contentEl.empty();
  }
  toggleLang(l) {
    if (this.langs.has(l)) {
      if ([...this.langs].filter((x) => this.available.includes(x)).length <= 1) return;
      this.langs.delete(l);
    } else this.langs.add(l);
    this.afterLangChange();
  }
  selectAllLangs() {
    const allOn = this.available.every((l) => this.langs.has(l));
    this.langs = allOn ? /* @__PURE__ */ new Set([this.available[0]]) : new Set(this.available);
    this.afterLangChange();
  }
  afterLangChange() {
    this.paintLang();
    if (this.persist) {
      this.plugin.settings.languages = [...this.langs];
      void this.plugin.saveSettings();
    }
    if (this.ref) this.renderResults();
  }
  paintLang() {
    for (const [l, b] of this.langButtons) {
      const on = l === "all" ? this.available.every((x) => this.langs.has(x)) : this.langs.has(l);
      b.toggleClass("is-active", on);
    }
  }
  /** Translations in the chosen languages, in the user's order. */
  visibleTranslations() {
    return this.plugin.allTranslations().filter((tr) => this.langs.has(tr.lang));
  }
  search() {
    const q = this.input.value.trim();
    if (!q) return;
    try {
      this.ref = parseReference(q);
    } catch (e) {
      this.ref = null;
      this.cards = [];
      this.resultsEl.empty();
      this.showMessage(e.message, true);
      this.updateInsertState();
      return;
    }
    this.renderResults();
  }
  renderResults() {
    const ref = this.ref;
    if (!ref) return;
    const token = ++this.searchToken;
    this.resultsEl.empty();
    this.cards = [];
    const inLangs = this.visibleTranslations();
    const list = inLangs.filter((tr) => hasBook(tr, ref.book.num));
    if (!list.length) {
      this.showMessage(inLangs.length ? t.noTranslationsForBook : t.noTranslations, true);
      this.updateInsertState();
      return;
    }
    this.showMessage([...new Set(list.map((tr) => refLabel(ref, tr.lang, "full", tr.script)))].join(" \xB7 "), false);
    const picked = this.picked;
    for (const tr of list) {
      const cardEl = this.resultsEl.createDiv({ cls: "versedrop-card" });
      const head = cardEl.createEl("label", { cls: "versedrop-card-head" });
      const checkbox = head.createEl("input", { type: "checkbox" });
      checkbox.checked = picked.has(tr.id);
      head.createSpan({ text: tr.name, cls: "versedrop-card-name" });
      if (tr.abbr && tr.abbr !== tr.name) head.createSpan({ text: tr.abbr, cls: "versedrop-card-abbr" });
      const body = cardEl.createDiv({ cls: "versedrop-card-body", text: t.loading });
      body.setAttr("lang", tr.lang);
      body.setAttr("dir", tr.lang === "he" ? "rtl" : "auto");
      const card = { translation: tr, checkbox, verses: null };
      this.cards.push(card);
      checkbox.addEventListener("change", () => {
        cardEl.toggleClass("is-picked", checkbox.checked);
        this.rememberPick(tr.id, checkbox.checked);
        this.updateInsertState();
      });
      cardEl.toggleClass("is-picked", checkbox.checked);
      this.plugin.source.getPassage(tr, ref).then((verses) => {
        if (token !== this.searchToken) return;
        card.verses = verses;
        body.empty();
        if (!verses.length) {
          body.addClass("is-empty");
          body.setText(t.noVerses);
        } else {
          for (const v of verses) {
            const p = body.createSpan({ cls: "versedrop-verse" });
            p.createEl("sup", { text: String(v.verse) });
            p.appendText(v.text + " ");
          }
          const notice = isCopyrighted(tr) ? noticeFor(tr) : void 0;
          if (notice) cardEl.createDiv({ cls: "versedrop-card-notice", text: notice.text });
        }
        this.updateInsertState();
      }).catch((err) => {
        if (token !== this.searchToken) return;
        card.verses = [];
        body.empty();
        body.addClass("is-error");
        const icon = body.createSpan({ cls: "versedrop-error-icon" });
        (0, import_obsidian4.setIcon)(icon, "alert-triangle");
        body.appendText(err.message);
        this.updateInsertState();
      });
    }
    this.updateInsertState();
  }
  rememberPick(id, on) {
    if (on) this.picked.add(id);
    else this.picked.delete(id);
    if (!this.persist) return;
    const s = this.plugin.settings;
    s.picked = on ? [.../* @__PURE__ */ new Set([...s.picked, id])] : s.picked.filter((x) => x !== id);
    void this.plugin.saveSettings();
  }
  updateInsertState() {
    this.insertBtn.disabled = !this.cards.some((c) => c.checkbox.checked && c.verses && c.verses.length);
  }
  showMessage(text, isError) {
    this.messageEl.setText(text);
    this.messageEl.toggleClass("is-error", isError);
  }
  insert() {
    if (!this.ref) return;
    const chosen = this.cards.filter((c) => c.checkbox.checked && c.verses && c.verses.length).map((c) => ({ translation: c.translation, verses: c.verses }));
    if (!chosen.length) {
      new import_obsidian4.Notice(t.noneSelected);
      return;
    }
    const limit = this.plugin.settings.quoteWarn;
    const heavy = chosen.filter((p) => isCopyrighted(p.translation) && p.verses.length > limit);
    if (limit > 0 && heavy.length) {
      new import_obsidian4.Notice(t.quoteWarn(heavy.map((p) => p.translation.name).join(", "), limit), 1e4);
    }
    const text = formatPassages(this.ref, chosen, this.plugin.settings);
    this.plugin.insertIntoEditor(this.editor, text);
    this.close();
  }
};

// src/settings.ts
var import_obsidian5 = require("obsidian");
var DEFAULT_SETTINGS = {
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
  quoteWarn: 50
};
var VersedropSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    /** Custom translations whose editor is open */
    this.expanded = /* @__PURE__ */ new Set();
  }
  async save(redraw = false) {
    await this.plugin.saveSettings();
    if (redraw) this.display();
  }
  display() {
    const { containerEl } = this;
    const s = this.plugin.settings;
    containerEl.empty();
    containerEl.addClass("versedrop-settings");
    new import_obsidian5.Setting(containerEl).setName(t.sMyTranslations).setDesc(t.sMyTranslationsDesc).setHeading();
    const list = this.orderedTranslations();
    if (!list.length) containerEl.createDiv({ cls: "versedrop-empty", text: t.sNoTranslations });
    list.forEach((tr, i) => this.translationRow(containerEl, tr, i, list.length));
    this.addRow(containerEl);
    new import_obsidian5.Setting(containerEl).setName(t.sHotkeys).setDesc(t.sHotkeysDesc).setHeading();
    this.hotkeyRow(containerEl, "insert-passage", t.cmdInsert, t.sCmdInsertDesc);
    this.hotkeyRow(containerEl, "insert-direct", t.cmdDirect, t.sCmdDirectDesc);
    for (const p of s.presets) this.presetRow(containerEl, p);
    new import_obsidian5.Setting(containerEl).setDesc(t.sPresetAddDesc).addButton(
      (b) => b.setButtonText(t.sPresetAdd).onClick(async () => {
        const p = { id: Date.now().toString(36), name: "", translations: [...s.picked] };
        s.presets.push(p);
        this.plugin.registerPreset(p);
        await this.save(true);
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sLinks).setDesc(t.sLinksDesc).setHeading();
    new import_obsidian5.Setting(containerEl).setName(t.sAppLinks).addDropdown(
      (d) => d.addOptions({ none: t.sLinksNone, logos: t.sLinksLogos, accordance: t.sLinksAccordance, both: t.sLinksBoth }).setValue(s.appLinks).onChange(async (v) => {
        s.appLinks = v;
        await this.save(true);
      })
    );
    if (s.appLinks === "logos" || s.appLinks === "both") {
      new import_obsidian5.Setting(containerEl).setName(t.sLogosVersion).setDesc(t.sLogosVersionDesc).addText(
        (x) => x.setPlaceholder("ESV").setValue(s.logosVersion).onChange(async (v) => {
          s.logosVersion = v.trim();
          await this.save();
        })
      );
    }
    if (s.appLinks === "accordance" || s.appLinks === "both") {
      new import_obsidian5.Setting(containerEl).setName(t.sAccModule).setDesc(t.sAccModuleDesc).addText(
        (x) => x.setPlaceholder("ESVS").setValue(s.accordanceModule).onChange(async (v) => {
          s.accordanceModule = v.trim();
          await this.save();
        })
      );
    }
    new import_obsidian5.Setting(containerEl).setName(t.sOutput).setHeading();
    new import_obsidian5.Setting(containerEl).setName(t.sCitations).setDesc(t.sCitationsDesc).addDropdown(
      (d) => d.addOptions({ copyrighted: t.sCitCopyrighted, all: t.sCitAll, off: t.sCitOff }).setValue(s.citations).onChange(async (v) => {
        s.citations = v;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sQuoteWarn).setDesc(t.sQuoteWarnDesc).addText((x) => {
      x.inputEl.type = "number";
      x.inputEl.min = "0";
      x.setValue(String(s.quoteWarn)).onChange(async (v) => {
        const n = parseInt(v, 10);
        s.quoteWarn = Number.isFinite(n) && n >= 0 ? n : DEFAULT_SETTINGS.quoteWarn;
        await this.save();
      });
    });
    new import_obsidian5.Setting(containerEl).setName(t.sStyle).addDropdown(
      (d) => d.addOptions({ callout: t.sStyleCallout, quote: t.sStyleQuote, plain: t.sStylePlain }).setValue(s.style).onChange(async (v) => {
        s.style = v;
        await this.save(true);
      })
    );
    if (s.style === "callout") {
      new import_obsidian5.Setting(containerEl).setName(t.sCalloutType).setDesc(t.sCalloutTypeDesc).addText(
        (x) => x.setValue(s.calloutType).onChange(async (v) => {
          s.calloutType = v.trim() || "quote";
          await this.save();
        })
      );
    }
    new import_obsidian5.Setting(containerEl).setName(t.sGroup).setDesc(t.sGroupDesc).addToggle(
      (x) => x.setValue(s.group).onChange(async (v) => {
        s.group = v;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sHeader).setDesc(t.sHeaderDesc).addText(
      (x) => x.setValue(s.headerTemplate).onChange(async (v) => {
        s.headerTemplate = v || DEFAULT_SETTINGS.headerTemplate;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sBookName).addDropdown(
      (d) => d.addOptions({ full: t.sBookFull, short: t.sBookShort }).setValue(s.bookName).onChange(async (v) => {
        s.bookName = v;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sVerseNum).addDropdown(
      (d) => d.addOptions({ none: t.sVerseNumNone, plain: t.sVerseNumPlain, sup: t.sVerseNumSup }).setValue(s.verseNumbers).onChange(async (v) => {
        s.verseNumbers = v;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sPerLine).addToggle(
      (x) => x.setValue(s.versePerLine).onChange(async (v) => {
        s.versePerLine = v;
        await this.save();
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sClearCache).setDesc(t.sClearCacheDesc).addButton(
      (b) => b.setButtonText(t.sClear).onClick(() => {
        this.plugin.source.clearCache();
        new import_obsidian5.Notice(t.sCleared);
      })
    );
    new import_obsidian5.Setting(containerEl).setName(t.sHelp).setHeading();
    const help = containerEl.createDiv({ cls: "versedrop-help" });
    for (const topic of t.help) {
      const d = help.createEl("details");
      d.createEl("summary", { text: topic.title });
      for (const p of topic.paras) d.createEl("p", { text: p });
    }
  }
  pickButton(row, id) {
    const s = this.plugin.settings;
    const on = s.picked.includes(id);
    row.addExtraButton(
      (x) => x.setIcon(on ? "check-square" : "square").setTooltip(t.sDefaultPick).onClick(async () => {
        s.picked = on ? s.picked.filter((p) => p !== id) : [...s.picked, id];
        await this.save(true);
      })
    );
  }
  /** Ids in display order: built-ins that are on and custom translations, following `order`. */
  orderedTranslations() {
    const s = this.plugin.settings;
    const enabled = new Set(s.enabled);
    const all = [...BUILT_IN_TRANSLATIONS.filter((tr) => enabled.has(tr.id)), ...s.custom];
    return sortByOrder(all, s.order);
  }
  translationRow(el, tr, index, total) {
    var _a, _b, _c;
    const s = this.plugin.settings;
    const lang = t.langName[tr.lang];
    const custom = !tr.builtIn;
    const kind = tr.source === "bolls" ? "bolls.life" : tr.source === "file" ? "JSON" : tr.source === "accordance" ? "Accordance" : "";
    const title = custom ? tr.name || t.sUnnamed : `${tr.name}${tr.abbr !== tr.name ? ` (${tr.abbr})` : ""}`;
    const desc = custom ? `${lang} \xB7 ${kind}${tr.source === "bolls" ? ` ${(_a = tr.code) != null ? _a : ""}` : tr.source === "accordance" ? ` ${(_b = tr.module) != null ? _b : ""}` : ""}` : `${lang} \xB7 ${(_c = tr.note) != null ? _c : ""}`;
    const row = new import_obsidian5.Setting(el).setName(title).setDesc(desc).setClass("versedrop-tr-row");
    this.pickButton(row, tr.id);
    row.addExtraButton(
      (x) => x.setIcon("arrow-up").setTooltip(t.sMoveUp).setDisabled(index === 0).onClick(() => this.move(tr.id, -1))
    ).addExtraButton(
      (x) => x.setIcon("arrow-down").setTooltip(t.sMoveDown).setDisabled(index === total - 1).onClick(() => this.move(tr.id, 1))
    );
    if (custom) {
      const open = this.expanded.has(tr.id);
      row.addExtraButton(
        (x) => x.setIcon(open ? "chevron-up" : "pencil").setTooltip(t.sEdit).onClick(() => {
          if (open) this.expanded.delete(tr.id);
          else this.expanded.add(tr.id);
          this.display();
        })
      );
    }
    row.addExtraButton(
      (x) => x.setIcon("x").setTooltip(t.sRemove).onClick(async () => {
        if (custom) s.custom = s.custom.filter((c) => c.id !== tr.id);
        else s.enabled = s.enabled.filter((id) => id !== tr.id);
        s.picked = s.picked.filter((id) => id !== tr.id);
        s.order = s.order.filter((id) => id !== tr.id);
        await this.save(true);
      })
    );
    if (tr.source === "esv") this.esvKeyRow(el);
    if (custom && this.expanded.has(tr.id)) this.customEditor(el, tr);
  }
  esvKeyRow(el) {
    const s = this.plugin.settings;
    new import_obsidian5.Setting(el).setName(t.sEsvKey).setDesc(t.sEsvKeyDesc).setClass("versedrop-sub-row").addText((x) => {
      x.inputEl.type = "password";
      x.setPlaceholder("API key").setValue(s.esvApiKey).onChange(async (v) => {
        s.esvApiKey = v.trim();
        this.plugin.source.clearCache();
        await this.save();
      });
    }).addExtraButton(
      (b) => b.setIcon("external-link").setTooltip("api.esv.org").onClick(() => window.open("https://api.esv.org/account/create-application/"))
    );
  }
  customEditor(el, tr) {
    var _a;
    const placeholder = tr.source === "bolls" ? t.sCode : tr.source === "file" ? t.sPath : t.sModule;
    const current = (_a = tr.source === "bolls" ? tr.code : tr.source === "file" ? tr.path : tr.module) != null ? _a : "";
    const box = el.createDiv({ cls: "versedrop-editor" });
    new import_obsidian5.Setting(box).setName(t.sName).addText(
      (x) => x.setPlaceholder(t.sNamePlaceholder).setValue(tr.name).onChange(async (v) => {
        tr.name = v.trim();
        tr.abbr = v.trim();
        await this.save();
      })
    );
    const src = new import_obsidian5.Setting(box).setName(placeholder).addText(
      (x) => x.setValue(current).onChange(async (v) => {
        const val = v.trim();
        if (tr.source === "bolls") tr.code = val;
        else if (tr.source === "file") tr.path = val;
        else tr.module = val;
        this.plugin.source.clearCache();
        await this.save();
      })
    );
    if (tr.source === "accordance") {
      src.addButton(
        (b) => b.setButtonText(t.sTest).onClick(async () => {
          var _a2, _b, _c;
          b.setDisabled(true);
          try {
            const verses = await this.plugin.source.getPassage({ ...tr, id: `${tr.id}-test` }, parseReference("John 3:16"));
            const text = (_b = (_a2 = verses[0]) == null ? void 0 : _a2.text) != null ? _b : "";
            new import_obsidian5.Notice(t.accTestOk((_c = tr.module) != null ? _c : "", text.length > 80 ? `${text.slice(0, 80)}\u2026` : text), 8e3);
          } catch (e) {
            new import_obsidian5.Notice(e.message, 12e3);
          } finally {
            b.setDisabled(false);
          }
        })
      );
    }
    new import_obsidian5.Setting(box).setName(t.sLang).addDropdown(
      (d) => d.addOptions(Object.fromEntries(LANGS.map((l) => [l, t.langName[l]]))).setValue(tr.lang).onChange(async (v) => {
        tr.lang = v;
        await this.save();
      })
    );
    const known = knownCitation(tr.name, tr.module, tr.code);
    new import_obsidian5.Setting(box).setName(t.sCitation).setDesc(known && !tr.citation ? t.sCitationKnown : t.sCitationDesc).addText((x) => {
      var _a2, _b;
      x.inputEl.addClass("versedrop-citation-input");
      x.setPlaceholder((_a2 = known == null ? void 0 : known.text) != null ? _a2 : t.sCitationPlaceholder).setValue((_b = tr.citation) != null ? _b : "").onChange(async (v) => {
        tr.citation = v.trim();
        await this.save();
      });
    });
    new import_obsidian5.Setting(box).addButton(
      (b) => b.setButtonText(t.sDone).onClick(() => {
        this.expanded.delete(tr.id);
        this.display();
      })
    );
  }
  /** The "Add a translation" dropdown: built-ins not yet added, then ways to add your own. */
  addRow(el) {
    const s = this.plugin.settings;
    new import_obsidian5.Setting(el).setName(t.sAddTranslation).setDesc(t.sAddTranslationDesc).addDropdown((d) => {
      const sel = d.selectEl;
      sel.createEl("option", { text: t.sChoose, value: "" });
      const enabled = new Set(s.enabled);
      for (const lang of LANGS) {
        const avail = BUILT_IN_TRANSLATIONS.filter((tr) => tr.lang === lang && !enabled.has(tr.id));
        if (!avail.length) continue;
        const group = sel.createEl("optgroup");
        group.label = t.langName[lang];
        for (const tr of avail) {
          const label = tr.abbr !== tr.name ? `${tr.abbr} \u2014 ${tr.name}` : tr.name;
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
          s.enabled = [.../* @__PURE__ */ new Set([...s.enabled, id])];
          s.order = [...s.order.filter((x) => x !== id), id];
        } else if (v.startsWith("c:")) {
          const source = v.slice(2);
          const id = `custom-${Date.now().toString(36)}`;
          s.custom.push({ id, name: "", abbr: "", lang: source === "accordance" ? "ko" : "ko", source });
          s.order.push(id);
          this.expanded.add(id);
        } else return;
        await this.save(true);
      });
    });
  }
  hotkeyRow(el, commandId, name, desc, cls) {
    const keys = hotkeysFor(this.app, `${this.plugin.manifest.id}:${commandId}`);
    const row = new import_obsidian5.Setting(el).setName(name).setDesc(desc);
    if (cls) row.setClass(cls);
    row.controlEl.createSpan({ cls: `versedrop-hotkey${keys ? "" : " is-empty"}`, text: keys || t.sNoHotkey });
    row.addButton((b) => b.setButtonText(keys ? t.sChangeHotkey : t.sSetHotkey).onClick(() => openHotkeySettings(this.app, "Versedrop")));
    return row;
  }
  presetRow(el, p) {
    const s = this.plugin.settings;
    const box = el.createDiv({ cls: "versedrop-preset" });
    const row = this.hotkeyRow(box, this.plugin.presetCommandId(p), "", t.sPresetDesc, "versedrop-preset-row");
    row.nameEl.empty();
    const input = row.nameEl.createEl("input", { type: "text", cls: "versedrop-preset-name", placeholder: t.sPresetNamePlaceholder });
    input.value = p.name;
    input.addEventListener("change", async () => {
      p.name = input.value.trim();
      this.plugin.unregisterPreset(p);
      this.plugin.registerPreset(p);
      await this.save();
    });
    row.addExtraButton(
      (x) => x.setIcon("x").setTooltip(t.sRemove).onClick(async () => {
        this.plugin.unregisterPreset(p);
        s.presets = s.presets.filter((q) => q.id !== p.id);
        await this.save(true);
      })
    );
    const chips = box.createDiv({ cls: "versedrop-chips" });
    const chosen = new Set(p.translations);
    for (const tr of this.plugin.allTranslations()) {
      const chip = chips.createEl("button", { text: tr.abbr || tr.name, cls: "versedrop-chip" });
      chip.setAttr("aria-pressed", String(chosen.has(tr.id)));
      chip.toggleClass("is-active", chosen.has(tr.id));
      chip.setAttr("title", tr.name);
      chip.addEventListener("click", async () => {
        if (chosen.has(tr.id)) chosen.delete(tr.id);
        else chosen.add(tr.id);
        chip.toggleClass("is-active", chosen.has(tr.id));
        p.translations = this.plugin.allTranslations().map((x) => x.id).filter((id) => chosen.has(id));
        await this.save();
      });
    }
  }
  async move(id, dir) {
    const s = this.plugin.settings;
    const ids = this.orderedTranslations().map((tr) => tr.id);
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    s.order = ids;
    await this.save(true);
  }
};
function sortByOrder(list, order) {
  const pos = new Map(order.map((id, i) => [id, i]));
  return list.map((tr, i) => ({ tr, i })).sort((a, b) => {
    var _a, _b;
    return ((_a = pos.get(a.tr.id)) != null ? _a : 1e6 + a.i) - ((_b = pos.get(b.tr.id)) != null ? _b : 1e6 + b.i);
  }).map((x) => x.tr);
}

// src/main.ts
var VersedropPlugin = class extends import_obsidian6.Plugin {
  async onload() {
    await this.loadSettings();
    this.source = new BibleSource(this.app, () => this.settings.esvApiKey);
    this.addCommand({
      id: "insert-passage",
      name: t.cmdInsert,
      icon: "book-open",
      editorCallback: (editor) => {
        var _a;
        const found = this.referenceAtCursor(editor);
        new VerseModal(this.app, this, editor, (_a = found == null ? void 0 : found.text) != null ? _a : "").open();
      }
    });
    this.addCommand({
      id: "insert-direct",
      name: t.cmdDirect,
      icon: "zap",
      editorCallback: (editor) => this.runDirect(editor, this.settings.picked)
    });
    for (const p of this.settings.presets) this.registerPreset(p);
    this.addSettingTab(new VersedropSettingTab(this.app, this));
  }
  /** Enabled built-in translations followed by custom ones that are filled in. */
  allTranslations() {
    const enabled = new Set(this.settings.enabled);
    const builtIn = BUILT_IN_TRANSLATIONS.filter(
      (tr) => enabled.has(tr.id) && (tr.source !== "esv" || this.settings.esvApiKey.trim())
    );
    const custom = this.settings.custom.filter((tr) => tr.name.trim() && (tr.source === "bolls" ? tr.code : tr.source === "file" ? tr.path : tr.module)).map((tr) => ({ ...tr, abbr: tr.abbr || tr.name }));
    return sortByOrder([...builtIn, ...custom], this.settings.order);
  }
  /** A reference in the selection, or — with nothing selected — on the cursor's line on its own. */
  referenceAtCursor(editor) {
    const selected = editor.getSelection().trim();
    const line = editor.getCursor("to").line;
    const candidate = selected || editor.getLine(line).trim().replace(/^[-*>\s]+/, "");
    if (!candidate || candidate.length > 60) return null;
    try {
      return { ref: parseReference(candidate), text: candidate, line };
    } catch (e) {
      return null;
    }
  }
  /** Command id for a preset (without the plugin prefix). */
  presetCommandId(p) {
    return `preset-${p.id}`;
  }
  registerPreset(p) {
    this.addCommand({
      id: this.presetCommandId(p),
      name: t.cmdPreset(p.name || t.sUnnamed),
      icon: "bookmark",
      editorCallback: (editor) => {
        const found = this.referenceAtCursor(editor);
        if (found) void this.runDirect(editor, p.translations);
        else new VerseModal(this.app, this, editor, "", { picked: p.translations }).open();
      }
    });
  }
  unregisterPreset(p) {
    removeCommand(this.app, `${this.manifest.id}:${this.presetCommandId(p)}`);
  }
  /**
   * Inserts the reference at the cursor in the given translations without opening the window.
   * Falls back to the search window when there is no reference at the cursor.
   */
  async runDirect(editor, ids) {
    const found = this.referenceAtCursor(editor);
    if (!found) {
      new VerseModal(this.app, this, editor, "", { picked: ids }).open();
      return;
    }
    const wanted = new Set(ids);
    const list = this.allTranslations().filter((tr) => wanted.has(tr.id) && hasBook(tr, found.ref.book.num));
    if (!list.length) {
      new import_obsidian6.Notice(t.directNone);
      return;
    }
    const loading = new import_obsidian6.Notice(t.loading, 0);
    const results = await Promise.allSettled(list.map((tr) => this.source.getPassage(tr, found.ref)));
    loading.hide();
    const passages = [];
    const failed = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled" && r.value.length) passages.push({ translation: list[i], verses: r.value });
      else failed.push(list[i].name);
    });
    if (failed.length) new import_obsidian6.Notice(t.directFailed(failed.join(", ")), 6e3);
    if (!passages.length) return;
    const limit = this.settings.quoteWarn;
    const heavy = passages.filter((p) => isCopyrighted(p.translation) && p.verses.length > limit);
    if (limit > 0 && heavy.length) new import_obsidian6.Notice(t.quoteWarn(heavy.map((p) => p.translation.name).join(", "), limit), 1e4);
    this.insertBelowLine(editor, found.line, formatPassages(found.ref, passages, this.settings));
  }
  insertBelowLine(editor, line, text) {
    const end = { line, ch: editor.getLine(line).length };
    editor.replaceRange(`

${text}
`, end);
    editor.setCursor({ line: line + text.split("\n").length + 2, ch: 0 });
  }
  /**
   * Inserts below the current selection (keeping a selected reference such as "요 3:16" in place),
   * or at the cursor when nothing is selected.
   */
  insertIntoEditor(editor, text) {
    if (editor.somethingSelected() || this.referenceAtCursor(editor)) {
      this.insertBelowLine(editor, editor.getCursor("to").line, text);
      return;
    }
    const cur = editor.getCursor();
    const lineText = editor.getLine(cur.line);
    const prefix = lineText.trim() ? "\n\n" : "";
    editor.replaceSelection(`${prefix}${text}
`);
  }
  async loadSettings() {
    var _a, _b, _c, _d;
    const saved = (_a = await this.loadData()) != null ? _a : {};
    this.settings = { ...DEFAULT_SETTINGS, ...saved };
    this.settings.custom = (_b = this.settings.custom) != null ? _b : [];
    this.settings.presets = (_c = this.settings.presets) != null ? _c : [];
    const legacy = saved.language;
    if (!saved.languages && legacy) this.settings.languages = legacy === "both" ? ["ko", "en"] : [legacy];
    const seen = new Set((_d = saved.seenBuiltIns) != null ? _d : saved.enabled ? ["KRV", "RNKSV", "KJV", "WEB", "BSB", "ASV", "YLT"] : []);
    for (const tr of BUILT_IN_TRANSLATIONS) {
      if (!seen.has(tr.id) && tr.defaultOn && !this.settings.enabled.includes(tr.id)) this.settings.enabled.push(tr.id);
    }
    this.settings.seenBuiltIns = BUILT_IN_TRANSLATIONS.map((tr) => tr.id);
    if (!saved.order) this.settings.order = [...this.settings.enabled, ...this.settings.custom.map((c) => c.id)];
    for (const id of [...this.settings.enabled, ...this.settings.custom.map((c) => c.id)]) {
      if (!this.settings.order.includes(id)) this.settings.order.push(id);
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
