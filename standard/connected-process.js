import {chapters} from './process-data.js?v=20261027-all1';
const statusLabel=x=>({none:'nema prijave',draft:'nacrt',approved:'odobreno', 'handed-over':'pripremljeno za pregled',resolved:'provjereno'}[x]||'nepoznato');
const processes=new Map(chapters.flatMap(c=>c.processes.map(p=>[p.id,{...p,chapterId:c.id}])));
const role=id=>[2,3,4,5,6,7,13,14,15,17,18].includes(id)?'voditelja / nabavu':[8,10,11,19].includes(id)?'voditelja smjene':'tim poslovnice';
function getProcess(id){const p=processes.get(id);if(!p)throw new Error('Nepoznat postupak.');return p;}
function live(day){if(!day||day.closed)throw new Error('Demo dan je završen; pokreni novi dan.');if(day.stage===0)throw new Error('Najprije potvrdi pripremu u radnom danu.');}
export function processContext(day,id){
 const p=getProcess(id),x=day.stock,sale=day.sale,inv=day.review;
 const stock=`Skladište ${x.warehouse}, na putu ${x.inTransit}, trgovina ${x.shop}, neto prodano ${x.sold} kom.`;
 const purchase=day.draft?`Nabava: ${statusLabel(day.draft.status)}, ${day.draft.cartons} kartona.`:'Nabava još nije pripremljena.';
 const reception=day.receipt?.missingCartons?` Prijavljena razlika prijama: ${day.receipt.missingCartons} karton(a).`:'';
 const saleText=sale?`Demo prodaja: ${sale.quantity} kom., ${sale.totalCents} centi; plaćanje nije provedeno.`:'Demo prodaja još nije zabilježena.';
 const inventory=inv?`Inventura: očekivano ${inv.expected}, prebrojeno ${inv.counted}, razlika ${inv.difference>0?'+':''}${inv.difference}, ${inv.status==='draft'?'nacrt':'pripremljeno za pregled'}.`:'Inventura još nije prebrojena.';
 const cash=`Provjere blagajne: ${Number(day.cash.mid)+Number(day.cash.end)}/2; dokument ${day.cash.document?'označen pregledanim':'čeka pregled'}.`;
 const cases=`Cijena: ${statusLabel(day.cases.price)}; oštećenje: ${statusLabel(day.cases.damage)}; pritužba: ${statusLabel(day.cases.complaint)}.`;
 if(p.chapterId===2||p.chapterId===3||p.chapterId===4)return `${stock} ${purchase}${reception}`;
 if([5,6,7].includes(p.chapterId))return `${stock} ${inventory}${reception}`;
 if([8,10].includes(p.chapterId))return `${stock} ${saleText} ${cash} ${cases}`;
 if(p.chapterId===11)return `${saleText} Provjeru uvjeta prodaje provodi osoba.`;
 if(p.chapterId===18)return `${stock} ${cases} Ogledna cijena je 2,50 €.`;
 if(p.chapterId===13)return `${stock} ${cases} Rok i stanje robe zahtijevaju fizički pregled.`;
 return `Demo dan: korak ${Math.min(day.stage+1,12)}/12. ${stock} ${cases}`;
}
function validate(input){
 if(!input||!['ok','issue'].includes(input.condition))throw new Error('Odaberi rezultat provjere.');
 if(typeof input.note!=='string'||input.note.length>180)throw new Error('Napomena može imati najviše 180 znakova.');
 if(input.count!==null&&(!Number.isSafeInteger(input.count)||input.count<0||input.count>9999))throw new Error('Količina mora biti cijeli broj od 0 do 9999.');
 return {condition:input.condition,note:input.note.trim(),count:input.count};
}
function compose(day,p,input){
 const context=processContext(day,p.id),countPart=input.count===null?'':` Upisana ogledna količina: ${input.count} kom.${[5,6,7].includes(p.chapterId)?` U odnosu na stanje trgovine razlika je ${input.count-day.stock.shop>0?'+':''}${input.count-day.stock.shop} kom.; stanje nije promijenjeno.`:''}`;
 const mismatch=input.count!==null&&[5,6,7].includes(p.chapterId)&&input.count!==day.stock.shop;
 const flag=input.condition==='issue'||mismatch?'issue':'ok';
 const action=mismatch?'Razlika u količini automatski je označena za provjeru.':flag==='issue'?'Označeno za dodatnu provjeru.':'Označeno urednim u ovoj vježbi.';
 return {context,flag,automation:`SIMULACIJA · ${action} Pripremljen je demo zapis za ${role(p.chapterId)}; ništa nije poslano.`,advice:`PRIPREMLJENI AI PRIMJER · ${context}${countPart}${input.note?` Napomena iz vježbe: ${input.note}.`:''} ${p.assistance} ${p.review}`};
}
function append(day,kind,text){return [...day.log,{kind:'person',text:kind},{kind:'automation',text}];}
export function draftProcess(day,id,input){
 live(day);const p=getProcess(id),clean=validate(input),previous=day.processRecords?.[id];
 if(previous?.status==='draft')throw new Error('Nacrt je već otvoren; najprije ga pregledaj.');
 const calculated=compose(day,p,clean),record={id,title:p.title,chapterId:p.chapterId,input:clean,status:'draft',...calculated};
 return {...day,processRecords:{...day.processRecords,[id]:record},log:append(day,`Pripremljen demo zapis: ${p.title}.`,`Nacrt je u zajedničkom radnom danu; status: ${calculated.flag==='issue'?'potrebna provjera':'uredno'}.`)};
}
export function refreshProcess(day,id){
 live(day);const p=getProcess(id),record=day.processRecords?.[id];if(record?.status!=='draft')throw new Error('Nema otvorenog nacrta.');
 const updated={...record,...compose(day,p,record.input)};return {...day,processRecords:{...day.processRecords,[id]:updated},log:append(day,`Osvježen demo zapis: ${p.title}.`,'Kontekst je usklađen s trenutačnim stanjem; ništa nije poslano.')};
}
export function reviewProcess(day,id){
 live(day);const p=getProcess(id),record=day.processRecords?.[id];if(record?.status!=='draft')throw new Error('Nema nacrta za potvrdu.');
 if(record.context!==processContext(day,id))throw new Error('Stanje se promijenilo. Osvježi nacrt prije potvrde.');
 return {...day,processRecords:{...day.processRecords,[id]:{...record,status:'reviewed'}},log:append(day,`Potvrđen demo zapis: ${p.title}.`,'Zapis ostaje u pregledu dana; ništa nije izvršeno niti poslano.')};
}
