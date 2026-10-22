import VersedropPlugin from "../src/main";
function mockEditor(lines: string[], cursor: {line:number,ch:number}, sel="") {
  return {
    lines, cursor,
    getSelection(){ return sel; }, somethingSelected(){ return !!sel; },
    getCursor(){ return cursor; }, getLine(n:number){ return lines[n]; },
    replaceRange(text:string, pos:{line:number,ch:number}){ const l=lines[pos.line]; const merged=(l.slice(0,pos.ch)+text+l.slice(pos.ch)).split("\n"); lines.splice(pos.line,1,...merged); },
    replaceSelection(text:string){ this.replaceRange(text,cursor); }, setCursor(){},
  } as any;
}
const p = new (VersedropPlugin as any)();
for (const [ls, c, sel] of [[["설교 개요","딛 2:11-14","끝"],1,""],[["- 요 3:16"],0,""],[["그냥 텍스트"],0,""],[["앞 롬 8:28 뒤"],0,"롬 8:28"]] as [string[],number,string][]) {
  const e = mockEditor(ls,{line:c,ch:0},sel); const r = p.referenceAtCursor(e); console.log(JSON.stringify(ls[c]), "→", r ? `${r.ref.book.ko} ${r.ref.chapter} line ${r.line}` : null);
}
const e = mockEditor(["설교 개요","딛 2:11-14","끝"],{line:1,ch:3});
p.insertIntoEditor(e, "> [!quote] 디도서 2:11-14\n> 본문");
console.log(e.lines.join("\n"));
