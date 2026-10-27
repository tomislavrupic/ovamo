import {createStockDemo,applyStockEvent} from '../src/stock-demo.js';
const ORDER=['receive','dispatch','accept','sell'];
export function newJourney(){return {stock:createStockDemo(),stage:0,review:null};}
export function perform(state,type,quantity){
 if(!state||ORDER[state.stage]!==type)throw new Error('Otvori sljedeći korak redom.');
 if(!Number.isSafeInteger(quantity)||quantity<=0||quantity>9999)throw new Error('Unesi cijeli broj veći od nule.');
 const stock=applyStockEvent(state.stock,{id:`demo-${type}`,type,quantity,...(type==='receive'?{packSize:24}:{})});
 return {...state,stock,stage:state.stage+1,review:null};
}
export function inventoryReview(state,counted){
 if(!Number.isSafeInteger(counted)||counted<0||counted>9999)throw new Error('Unesi stvarno prebrojenu količinu kao cijeli broj.');
 return {expected:state.stock.shop,counted,difference:counted-state.stock.shop};
}
export function answerDemo(question,state){
 const q=question.toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,''); const s=state.stock;
 if(/razlik|broj|inventur|manjak|visak/.test(q))return state.review?`Prebrojeno ${state.review.counted}, očekivano ${state.review.expected}; razlika ${state.review.difference>0?'+':''}${state.review.difference}. Predlažem provjeru i nacrt za voditelja; ništa nije knjiženo.`:'Za demo inventuru najprije upiši prebrojenu količinu. Razliku možeš provjeriti prije bilo kakve odobrene korekcije.';
 if(/zali|stanj|kolik|skladist|trgovin/.test(q))return `U demo primjeru: skladište ${s.warehouse}, na putu ${s.inTransit}, trgovina ${s.shop} kom. Ovo nisu stvarni podaci.`;
 if(/prij|pakir|karton|zaprimi/.test(q))return 'U ovom primjeru 1 karton sadrži 24 komada. Unesi broj kartona, provjeri pretvorbu i potvrdi demo primitak.';
 if(/transfer|premj|otprem|put|primit/.test(q))return `Demo otprema je odvojena od primitka. Trenutačno je ${s.inTransit} kom. na putu; trgovina ih ne dobiva u zalihu prije potvrde primitka.`;
 if(/racun|povrat|cijen|odob/.test(q))return 'Predložena radnja za račune, povrate i cijene ide ovlaštenoj osobi na pregled. Ovaj demo ne izdaje račune, ne obrađuje povrate i ništa ne šalje.';
 return 'Ovaj demo ima pripremljene odgovore za zalihu, primitak, transfer, inventuru i odobrenja. Stvarna AI veza nije uključena.';
}
