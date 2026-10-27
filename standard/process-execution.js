import {chapters} from './process-data.js?v=20261027-all1';
import {dayAction} from './workday-core.js?v=20261027-live1';
import {processContext} from './connected-process.js?v=20261027-live1';
const catalog=new Map(chapters.flatMap(c=>c.processes.map(p=>[p.id,p])));
const guided=new Set(['procurement-suggestion','receipt-match','transfer-send','transfer-accept','pos-checkout','sales-service','pos-return','inventory-count','inventory-review','pos-close','pos-cash-balance']);
const prices=new Set(['prices-match','prices-label','layout-labels','pos-promotion']);
const requests=new Set(['receipt-difference','transfer-request','orders-exception','supply-needs','inventory-planned','stock-issue','sales-replenish','article-exchange']);
const views=new Set(['stock-location','stock-history','orders-status','inventory-docs']);
const documents=new Set(['pos-payment-error','pos-business-invoice','pos-cancel','pos-fiscal','sales-complaint','customer-complaint','age-check','sales-conditions','writeoff','inventory-correct']);
export function operationKind(id){if(!catalog.has(id))return null;return guided.has(id)?'guided':prices.has(id)?'price':requests.has(id)?'request':views.has(id)?'view':documents.has(id)?'document':'inspection';}
export function operationDescription(id){return ({guided:'Pokreće odgovarajući korak radnog dana i mijenja povezano stanje.',price:'Otvara ili zatvara provjeru cijene; otvorena razlika zaustavlja demo prodaju.',request:'Stvara interni demo zahtjev za praćenje.',view:'Bilježi pregled trenutačnog stanja i povijesti.',document:'Stvara predmet za pregled odgovorne osobe.',inspection:'Bilježi provjeru i prema rezultatu otvara ili zatvara zadatak.'})[operationKind(id)]||'';}
export function executeProcess(day,id){
 const p=catalog.get(id),r=day?.processRecords?.[id];if(!p||r?.status!=='reviewed')throw new Error('Najprije pripremi i potvrdi zapis.');
 if(day.closed)throw new Error('Demo dan je završen.');
 if(r.context!==processContext(day,id))throw new Error('Stanje se promijenilo. Pripremi novi nacrt prije izvršavanja.');
 let next={...day},kind=operationKind(id),result='';
 const ops={tasks:[...(day.operations?.tasks||[])],requests:[...(day.operations?.requests||[])],documents:[...(day.operations?.documents||[])],checks:{...(day.operations?.checks||{})},views:[...(day.operations?.views||[])]};
 const n=r.input.count;
 if(kind==='guided'){
  let action=({'receipt-match':'receive','transfer-send':'dispatch','transfer-accept':'accept','pos-checkout':'sell','sales-service':'sell','pos-return':'return','inventory-count':'count','inventory-review':'review','pos-close':'close'})[id];
  if(id==='procurement-suggestion')action=day.stage===1?'suggest':day.stage===2?'approve':null;
  if(id==='pos-cash-balance')action=day.stage===10?(!day.cash.mid?'cash-mid':!day.cash.end?'cash-end':!day.cash.document?'document-check':null):null;
  if(!action)throw new Error('Ova radnja trenutačno nije na redu u radnom danu.');
  if(['receive','dispatch','accept','sell','return','count'].includes(action)&&n===null)throw new Error('Unesi količinu u nacrtu prije potvrde.');
  next=dayAction(day,action,n);result='Korak radnog dana je izvršen i povezano stanje ažurirano.';
 }else if(kind==='price'){
  next.cases={...day.cases,price:r.input.condition==='issue'?'draft':'resolved'};result=r.input.condition==='issue'?'Otvorena je razlika cijene; demo prodaja je zaustavljena do provjere.':'Provjera cijene je dovršena; demo prodaja je dostupna.';
 }else if(kind==='inspection'){
  const idx=ops.tasks.findIndex(t=>t.processId===id&&t.status==='open');
  if(r.input.condition==='issue'&&idx<0)ops.tasks.push({id:`task-${ops.tasks.length+1}`,processId:id,title:p.title,status:'open',note:r.input.note});
  if(r.input.condition==='ok'&&idx>=0)ops.tasks[idx]={...ops.tasks[idx],status:'resolved'};
  ops.checks[id]=r.input.condition;result=r.input.condition==='issue'?'Otvoren je zadatak za provjeru u radnom danu.':'Provjera je evidentirana; otvoreni zadatak za ovaj postupak je zatvoren.';
 }else if(kind==='request'){
  ops.requests.push({id:`request-${ops.requests.length+1}`,processId:id,title:p.title,status:'open',quantity:n,note:r.input.note});result='Demo zahtjev je dodan na popis otvorenih stavki; nije poslan.';
 }else if(kind==='document'){
  ops.documents.push({id:`document-${ops.documents.length+1}`,processId:id,title:p.title,status:'review',quantity:n,note:r.input.note});
  if(['sales-complaint','customer-complaint'].includes(id))next.cases={...day.cases,complaint:'handed-over'};
  result='Demo predmet je dodan na pregled; stvarni dokument nije izrađen.';
 }else{ops.views.push({processId:id,stock:{...day.stock},eventCount:day.stock.events.length});result='Pregledano je trenutačno stanje i povijest ogledne robe.';}
 next.operations=ops;next.processRecords={...next.processRecords,[id]:{...r,status:'executed',result}};
 next.log=[...next.log,{kind:'person',text:`Izvršena demo radnja: ${p.title}.`},{kind:'automation',text:result}];return next;
}
export function resolveOperation(day,type,id){
 if(day.closed)throw new Error('Demo dan je završen.');
 if(!['requests','documents'].includes(type))throw new Error('Nepoznata stavka.');
 const list=day.operations[type],i=list.findIndex(x=>x.id===id);if(i<0||list[i].status==='resolved')throw new Error('Stavka ne postoji ili je već zatvorena.');
 const updated=list.map((x,j)=>j===i?{...x,status:'resolved'}:x);
 return {...day,operations:{...day.operations,[type]:updated},log:[...day.log,{kind:'person',text:`Zatvorena demo stavka: ${list[i].title}.`},{kind:'automation',text:'Status je ažuriran samo u ovom primjeru.'}]};
}
