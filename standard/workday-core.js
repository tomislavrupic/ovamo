import {createStockDemo,applyStockEvent} from '../src/stock-demo.js';

// Fictional, in-memory scenario; does not send data or perform business operations.
export function newDay(){return {stage:0,stock:createStockDemo(),draft:null,receipt:null,sale:null,review:null,cases:{price:'none',damage:'none',complaint:'none'},lastIssue:null,cash:{mid:false,end:false,document:false},closed:false,log:[]};}
const integer=(value,min,max)=>{if(!Number.isSafeInteger(value)||value<min||value>max)throw new Error(`Unesi cijeli broj od ${min} do ${max}.`);return value;};
export function dayAction(state,action,quantity){
 if(!state||state.closed)throw new Error('Demo dan je već završen.');
 const next={...state,cash:{...state.cash},cases:{...state.cases},log:[...state.log]};
 let human='',automatic='';
 const stockEvent=(type,qty,packSize)=>{next.stock=applyStockEvent(state.stock,{id:`day-${type}-${state.stock.events.length}`,type,quantity:qty,...(packSize?{packSize}:{})});};
 if(action==='issue-price'&&state.stage>=6&&state.cases.price==='none'){next.cases.price='draft';next.lastIssue='price';human='Prijavljena ogledna razlika cijene na polici.';automatic='Pripremljen nacrt: oznaka 2,30 €, demo cijena 2,50 €; cijena nije promijenjena.';}
 else if(action==='issue-damage'&&state.stage>=6&&state.stock.shop>0&&state.cases.damage==='none'){next.cases.damage='draft';next.lastIssue='damage';human='Prijavljen jedan ogledni oštećeni artikl.';automatic='Pripremljen nacrt pregleda; demo zaliha nije automatski promijenjena niti blokirana.';}
 else if(action==='issue-complaint'&&state.stage>=7&&state.cases.complaint==='none'){next.cases.complaint='draft';next.lastIssue='complaint';human='Zabilježena ogledna pritužba nakon prodaje.';automatic='Pripremljen nacrt sažetka uz demo prodaju; nikome nije poslan.';}
 else if(action.startsWith('handoff-')&&['price','damage','complaint'].includes(action.slice(8))&&state.cases[action.slice(8)]==='draft'){const id=action.slice(8);next.cases[id]='handed-over';human='Označen demo predmet za pregled odgovorne osobe.';automatic='Pripremljena predaja u sažetku; nije poslana nikome.';}
 else if(action==='resolve-price'&&state.cases.price==='handed-over'){next.cases.price='resolved';human='Potvrđena ogledna provjera oznake cijene.';automatic='Primjer razlike je zatvoren; stvarna cijena i oznaka nisu mijenjane.';}
 else if(action==='open'&&state.stage===0){next.stage=1;human='Potvrđena priprema prostora i pulta.';automatic='Otvoren popis potreba za robom.';}
 else if(action==='suggest'&&state.stage===1){next.draft={cartons:10,packSize:24,status:'draft'};next.stage=2;human='Zatražen prijedlog nabave.';automatic='Pripremljen nacrt: 10 kartona po 24 komada.';}
 else if(action==='approve'&&state.stage===2){next.draft={...state.draft,status:'approved'};next.stage=3;human='Odobren ogledni nacrt narudžbe.';automatic='Pošiljka označena kao očekivana; ništa nije poslano dobavljaču.';}
 else if(action==='receive'&&state.stage===3){const qty=integer(quantity,1,state.draft.cartons);stockEvent('receive',qty,24);next.receipt={cartons:qty,missingCartons:state.draft.cartons-qty};next.stage=4;human=`Prebrojeno i potvrđeno ${qty} kartona.`;automatic=`Skladište +${qty*24} kom. ${next.receipt.missingCartons?`Odstupanje: ${next.receipt.missingCartons} kart. za pregled.`:'Primitak odgovara nacrtu.'}`;}
 else if(action==='dispatch'&&state.stage===4){const qty=integer(quantity,1,state.stock.warehouse);stockEvent('dispatch',qty);next.stage=5;human=`Potvrđena demo otprema ${qty} kom.`;automatic='Količina je na putu, ne u stanju trgovine.';}
 else if(action==='accept'&&state.stage===5){const qty=integer(quantity,1,state.stock.inTransit);stockEvent('accept',qty);next.stage=next.stock.inTransit?5:6;human=`Potvrđen primitak ${qty} kom. u trgovini.`;automatic=next.stock.inTransit?`Još ${next.stock.inTransit} kom. čeka potvrdu.`:'Cijela pošiljka je preuzeta; dostupna je za demo prodaju.';}
 else if(action==='sell'&&state.stage===6){if(['draft','handed-over'].includes(state.cases.price))throw new Error('Najprije dovrši demo provjeru razlike cijene.');const qty=integer(quantity,1,state.stock.shop);stockEvent('sell',qty);next.sale={quantity:qty,unitCents:250,totalCents:qty*250,refundCentsProposal:0,refundPaid:false};next.stage=7;human=`Zabilježena ogledna prodaja ${qty} kom.`;automatic='Stvoren je demo zapis prodaje; nema naplate ni fiskalizacije.';}
 else if(action==='return'&&state.stage===7){const qty=integer(quantity,1,state.stock.sold);stockEvent('return',qty);next.sale={...state.sale,refundCentsProposal:qty*state.sale.unitCents,refundPaid:false};next.stage=8;human=`Pregledan i prihvaćen demo povrat ${qty} kom.`;automatic='Roba je vraćena u demo zalihu; novčani povrat nije izvršen.';}
 else if(action==='count'&&state.stage===8){const qty=integer(quantity,0,9999);next.review={expected:state.stock.shop,counted:qty,difference:qty-state.stock.shop,status:'draft'};next.stage=9;human=`Prebrojeno ${qty} kom.`;automatic=`Izračunata razlika ${next.review.difference>0?'+':''}${next.review.difference}; zaliha nije mijenjana.`;}
 else if(action==='review'&&state.stage===9){next.review={...state.review,status:'handed-over'};next.stage=10;human='Pripremljena demo inventurna prijava za pregled.';automatic='Prijava je u sažetku; nije poslana i nema automatske korekcije.';}
 else if(action==='cash-mid'&&state.stage===10&&!state.cash.mid){next.cash.mid=true;human='Potvrđena demo provjera međusmjene.';automatic='Ažuriran kontrolni popis blagajne.';}
 else if(action==='cash-end'&&state.stage===10&&!state.cash.end){next.cash.end=true;human='Potvrđena demo provjera na kraju dana.';automatic='Ažuriran kontrolni popis blagajne.';}
 else if(action==='document-check'&&state.stage===10&&!state.cash.document){next.cash.document=true;human='Pregledan demo status dokumenta.';automatic='Demo stavka označena provjerenom; fiskalni sustav nije pozvan.';}
 else if(action==='close'&&state.stage===10){if(!state.cash.mid||!state.cash.end||!state.cash.document)throw new Error('Najprije potvrdi obje provjere blagajne i pregled dokumenta.');next.stage=11;next.closed=true;human='Potvrđen završetak oglednog dana.';automatic='Pripremljen sažetak otvorenih iznimaka; ništa nije poslano.';}
 else throw new Error('Najprije dovrši trenutačni korak.');
 next.log.push({kind:'person',text:human},{kind:'automation',text:automatic});return next;
}
export function dayAdvice(s){
 const x=s.stock;const lines=[
  'Pripremi pult i prostor. Kad to potvrdiš, otvorit će se prijedlog nabave.',
  'Za ogledni artikl predlažem 10 kartona po 24 komada. Nacrt se može pregledati prije potvrde.',
  'Pripremljeno je 10 kartona, ukupno 240 komada. Provjeri prije odobrenja; ništa se ne šalje.',
  'Usporedi fizički pristigle kartone s nacrtom. Odstupanje ostaje vidljivo za pregled.',
  `U skladištu je ${x.warehouse} kom.${s.receipt?.missingCartons?` Razlika prema nacrtu je ${s.receipt.missingCartons} karton(a); provjeri je s nabavom.`:''} Predloži količinu za trgovinu.`,
  `Na putu je ${x.inTransit} kom. U trgovinu ulazi samo količina koju osoba potvrdi.`,
  `U trgovini je ${x.shop} kom. Unesi oglednu prodaju; demo ne naplaćuje kupcu.`,
  `Neto prodano je ${x.sold} kom. Pregledaj jedan ogledni povrat prije dodavanja u zalihu.`,
  `Očekivano u trgovini: ${x.shop} kom. Unesi prebrojanu količinu za usporedbu.`,
  s.review?`Očekivano ${s.review.expected}, prebrojeno ${s.review.counted}, razlika ${s.review.difference>0?'+':''}${s.review.difference}. Predlažem pregled izvornog brojanja i predaju odgovornoj osobi; zaliha ostaje ${x.shop}.`:'Pregledaj brojanje.',
  `Provjere blagajne: ${Number(s.cash.mid)+Number(s.cash.end)}/2. Dokument ${s.cash.document?'je označen provjerenim':'čeka pregled'}. Inventurna prijava pripremljena je za pregled.`,
  `Dan je završen. Skladište ${x.warehouse}, na putu ${x.inTransit}, trgovina ${x.shop}; neto prodano ${x.sold} kom.`
 ];
 const draft=s.cases[s.lastIssue]==='draft'?[s.lastIssue,'draft']:Object.entries(s.cases).find(([,status])=>status==='draft');const hints={price:'Za razliku cijene predlažem pregled oznake i potvrđene cijene prije bilo kakve izmjene.',damage:'Za oštećeni artikl predlažem fizički pregled i odluku o izdvajanju; demo nije blokirao zalihu.',complaint:'Za pritužbu predlažem pregled prodaje i nacrt odgovora koji potvrđuje osoba.'};
 return {text:(lines[s.stage]||'Pregledaj trenutačni korak.')+(draft?' '+hints[draft[0]]:''),label:'Pripremljeni odgovor prema demo stanju · nije stvarni AI model'};
}
