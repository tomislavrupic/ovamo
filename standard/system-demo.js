import {perform} from './proposal-core.js?v=20261027-full3';
import {applyStockEvent} from '../src/stock-demo.js';

// Entirely fictional, local state. No orders, documents or stock are sent anywhere.
export function newSystem(){return {purchase:'none',sale:'none',tasks:{counter:false,shelves:false,prices:false,closing:false},priceReview:false,cash:{mid:false,end:false,unresolved:true,closed:false}};}
export function systemAction(system,journey,action){
 const next={...system,tasks:{...system.tasks},cash:{...system.cash}};let updated=journey;
 if(action.startsWith('task:')){const id=action.slice(5);if(!Object.hasOwn(next.tasks,id))throw new Error('Nepoznat zadatak.');next.tasks[id]=!next.tasks[id];}
 else if(action==='purchase-create' && next.purchase==='none')next.purchase='draft';
 else if(action==='purchase-approve' && next.purchase==='draft')next.purchase='approved';
 else if(action==='purchase-receive'){
  if(next.purchase!=='approved')throw new Error('Najprije odobri demo narudžbu.');
  if(journey.stage!==0)throw new Error('Prijam je već započet u radnom toku; za novu vježbu vrati primjer na početak.');
  updated=perform(journey,'receive',10);next.purchase='received';
 }else if(action==='sale-create' && next.sale==='none')next.sale='open';
 else if(action==='sale-prepare' && next.sale==='open'){
  if(journey.stock.shop<3)throw new Error('Nema dovoljno zaliha u trgovini. Najprije potvrdi prijenos u radnom toku.');
  next.sale='ready';
 }else if(action==='sale-deliver' && next.sale==='ready'){
  if(journey.stock.shop<3)throw new Error('Nema dovoljno zaliha u trgovini. Najprije potvrdi prijenos u radnom toku.');
  updated={...journey,review:null,stock:applyStockEvent(journey.stock,{id:'system-sale',type:'sell',quantity:3})};next.sale='delivered';
 }else if(action==='invoice-draft' && next.sale==='delivered')next.sale='invoice-draft';
 else if(action==='return-request' && next.sale==='invoice-draft')next.sale='return-requested';
 else if(action==='return-accept' && next.sale==='return-requested'){
  updated={...journey,review:null,stock:applyStockEvent(journey.stock,{id:'system-return',type:'return',quantity:1})};next.sale='returned';
 }
 else if(action==='cash-mid' && !next.cash.closed)next.cash.mid=true;
 else if(action==='cash-end' && !next.cash.closed)next.cash.end=true;
 else if(action==='cash-resolve' && !next.cash.closed)next.cash.unresolved=false;
 else if(action==='cash-close' && !next.cash.closed){
  if(!next.cash.mid||!next.cash.end)throw new Error('Najprije dovrši obje provjere blagajne.');
  if(next.cash.unresolved)throw new Error('Najprije provjeri otvoreni dokument.');
  next.cash.closed=true;
 }
 else if(action==='price-review')next.priceReview=!next.priceReview;
 else throw new Error('Ova radnja nije dostupna u trenutačnom koraku.');
 return {system:next,journey:updated};
}
