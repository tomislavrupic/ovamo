'use strict';
const $=s=>document.querySelector(s);
const normalize=s=>s.toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
let sections=[],saved={}; let privateAssets={};
try{saved=JSON.parse(localStorage.getItem('classic-shop-standard-checks-v1')||'{}')||{}}catch(e){saved={}}
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
function isHeading(t){return t.length<105&&(t.endsWith(':')||(/^[A-ZČĆŽŠĐ0-9\s/\-()]+$/.test(t)&&/[A-ZČĆŽŠĐ]/.test(t)))}
function save(){try{localStorage.setItem('classic-shop-standard-checks-v1',JSON.stringify(saved));return true}catch(e){return false}}
function render(query=''){
 if(!sections.length){$('#chapters').replaceChildren(el('p','empty','Prijavi se kako bi otvorio/la sadržaj priručnika.'));return}
 const q=normalize(query.trim());const nav=$('#navigation'),chapters=$('#chapters');nav.replaceChildren();chapters.replaceChildren();
 const matches=sections.filter(s=>!q||normalize(s.title+' '+s.items.map(i=>i.text||'').join(' ')).includes(q));
 $('#section-total').textContent=String(sections.length).padStart(2,'0');$('#nav-count').textContent=String(matches.length).padStart(2,'0');
 $('#results-info').textContent=q?`${matches.length} poglavlja odgovara pretrazi „${query.trim()}”.`:'';
 if(!matches.length){chapters.append(el('p','empty','Nema rezultata. Pokušaj s drugim pojmom, primjerice „zalihe” ili „račun”.'));return}
 matches.forEach((section)=>{
  const index=sections.indexOf(section), link=el('a','nav-link',section.title);link.href='#'+section.id;nav.append(link);
  const details=el('details','chapter');details.id=section.id;details.open=Boolean(q);const summary=el('summary');
  summary.append(el('span','chapter-index',String(index+1).padStart(2,'0')));const title=el('div');title.append(el('h3','',section.title));const meta=el('div','meta');title.append(meta);summary.append(title,el('span','chevron','+'));details.append(summary);
  link.addEventListener('click',()=>{details.open=true});
  const body=el('div','chapter-body'),tools=el('div','step-tools'),caption=el('p','step-caption','Označi korake koje si prošao/la. Napredak se sprema samo na ovom uređaju i u ovom pregledniku.');
  const progress=el('span','progress-label');const reset=el('button','reset','Poništi oznake');reset.type='button';tools.append(progress,reset);body.append(caption,tools);
  const entries=section.items.map((item,i)=>({item,i})).filter(x=>x.item.type==='text'&&!isHeading(x.item.text));
  if(!entries.length){caption.textContent='Ovo poglavlje sadrži ilustraciju iz izvornog dokumenta.';tools.hidden=true} function update(){const done=entries.filter(x=>saved[section.id+':'+x.i]).length;progress.textContent=`${done} / ${entries.length} označeno`;meta.textContent=entries.length ? `${entries.length} stavki · ${done} označeno` : 'Ilustracija iz priručnika';reset.disabled=done===0}
  reset.addEventListener('click',()=>{for(const x of entries)delete saved[section.id+':'+x.i];for(const input of body.querySelectorAll('input[type=checkbox]'))input.checked=false;save();update()});
  section.items.forEach((item,i)=>{
   if(item.type==='image'){const figure=el('figure','figure'),button=el('button');button.type='button';button.setAttribute('aria-label','Uvećaj ilustraciju iz poglavlja '+section.title);const image=el('img');image.src=privateAssets[item.src]||'';image.alt='Ilustracija iz izvornog dokumenta';image.loading='lazy';button.append(image);button.addEventListener('click',()=>{$('#image-dialog img').src=privateAssets[item.src]||'';$('#image-dialog').showModal()});figure.append(button,el('figcaption','','Dodirni ili klikni za veći prikaz'));body.append(figure);return}
   if(isHeading(item.text)){body.append(el('p','emphasis',item.text));return}
   const label=el('label','step');const box=el('input');box.type='checkbox';box.checked=Boolean(saved[section.id+':'+i]);const words=el('span','step-text',item.text);label.append(box,words);box.addEventListener('change',()=>{saved[section.id+':'+i]=box.checked;if(!save())caption.textContent='Spremanje na ovom uređaju nije dostupno; oznake vrijede samo dok je stranica otvorena.';update()});body.append(label);
  });update();details.append(body);chapters.append(details);
 });
}
const gateOrigin='https://classic-shop-manual.tom-d-vox.workers.dev';
let loginWindow=null, loginNonce=null;
$('#login').addEventListener('click',()=>{
 loginNonce=crypto.randomUUID();
 loginWindow=window.open(gateOrigin+'/?nonce='+encodeURIComponent(loginNonce),'classic-shop-signin','popup,width=600,height=760');
 $('#login-status').textContent=loginWindow?'Dovrši prijavu u otvorenom prozoru.':'Dopusti skočne prozore za prijavu.';
});
window.addEventListener('message',event=>{
 if(event.origin!==gateOrigin||event.source!==loginWindow||!event.data||event.data.nonce!==loginNonce||event.data.type!=='classic-shop-bundle')return;
 const payload=event.data.bundle;if(!payload||!Array.isArray(payload.sections)||!payload.assets)return;
 sections=payload.sections;privateAssets=payload.assets;
 const original=payload.original;if(original){const bytes=Uint8Array.from(atob(original),c=>c.charCodeAt(0));const url=URL.createObjectURL(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}));document.querySelectorAll('[data-original-download]').forEach(a=>{a.href=url;a.download='Standard-poslovanja-Classic-Shop.docx';a.removeAttribute('aria-disabled')})}
 $('#login-panel').hidden=true;render();loginWindow.close();loginWindow=null;loginNonce=null;
});
$('#chapters').replaceChildren(el('p','empty','Prijavi se kako bi otvorio/la sadržaj priručnika.'));
for(const input of [$('#search'),$('#mobile-search')])input.addEventListener('input',e=>{for(const other of [$('#search'),$('#mobile-search')])if(other!==e.target)other.value=e.target.value;render(e.target.value)});
$('#close-image').addEventListener('click',()=>$('#image-dialog').close());$('#image-dialog').addEventListener('click',e=>{if(e.target===$('#image-dialog'))$('#image-dialog').close()});
