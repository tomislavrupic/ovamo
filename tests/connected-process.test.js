import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chapters} from '../standard/process-data.js';
import {newDay,dayAction,dayAdvice} from '../standard/workday-core.js';
import {draftProcess,reviewProcess,refreshProcess,processContext} from '../standard/connected-process.js';
const options={condition:'issue',note:'Potrebna dodatna provjera',count:null};
test('every catalog process can create and confirm a shared demo record without altering stock',()=>{
 let day=dayAction(newDay(),'open');const ids=chapters.flatMap(c=>c.processes.map(p=>p.id));
 for(const id of ids){day=draftProcess(day,id,options);assert.equal(day.processRecords[id].status,'draft');day=reviewProcess(day,id);assert.equal(day.processRecords[id].status,'reviewed');}
 assert.equal(Object.keys(day.processRecords).length,61);assert.equal(day.stock.shop,0);assert.equal(day.stock.warehouse,0);
 assert.throws(()=>draftProcess(day,'unknown',options));
});
test('stock context, count difference and assistant update with the day; an old draft cannot be confirmed',()=>{
 let day=dayAction(newDay(),'open');day=draftProcess(day,'inventory-count',{condition:'issue',note:'',count:2});
 assert.match(day.processRecords['inventory-count'].advice,/2/);assert.match(dayAdvice(day).text,/1/);
 day=dayAction(day,'suggest');day=dayAction(day,'approve');day=dayAction(day,'receive',2);day=dayAction(day,'dispatch',24);day=dayAction(day,'accept',24);
 assert.match(processContext(day,'inventory-count'),/24/);assert.throws(()=>reviewProcess(day,'inventory-count'),/osvjež/i);
 day=refreshProcess(day,'inventory-count');assert.match(day.processRecords['inventory-count'].advice,/-22/);
 day=reviewProcess(day,'inventory-count');assert.equal(day.stock.shop,24);assert.equal(day.processRecords['inventory-count'].status,'reviewed');
});
test('rejects malformed input, duplicate review and changes after closing',()=>{
 let day=dayAction(newDay(),'open');assert.throws(()=>draftProcess(day,'counter-setup',{...options,condition:'unknown'}));
 assert.throws(()=>draftProcess(day,'counter-setup',{...options,count:-1}));
 day=draftProcess(day,'counter-setup',options);day=reviewProcess(day,'counter-setup');assert.throws(()=>reviewProcess(day,'counter-setup'));
 assert.throws(()=>draftProcess({...day,closed:true},'counter-setup',options));
});
test('inventory mismatch is flagged for review even when the user marks it OK, including after a refresh',()=>{
 let day=dayAction(newDay(),'open');day=draftProcess(day,'inventory-count',{condition:'ok',note:'',count:0});
 assert.equal(day.processRecords['inventory-count'].flag,'ok');
 day=dayAction(day,'suggest');day=dayAction(day,'approve');day=dayAction(day,'receive',2);day=dayAction(day,'dispatch',24);day=dayAction(day,'accept',24);
 day=refreshProcess(day,'inventory-count');assert.equal(day.processRecords['inventory-count'].flag,'issue');
 assert.match(day.processRecords['inventory-count'].automation,/razlik/i);assert.equal(day.stock.shop,24);
});
test('a confirmed discrepancy remains visible as an unresolved review, not a finished fix',()=>{
 let day=dayAction(newDay(),'open');day=draftProcess(day,'prices-match',{condition:'issue',note:'',count:null});
 day=reviewProcess(day,'prices-match');assert.equal(day.processRecords['prices-match'].flag,'issue');
 assert.match(dayAdvice(day).text,/1.*provjer/i);assert.equal(day.cases.price,'none');
});
test('prepared assistant response includes the submitted fictional observation',()=>{
 let day=dayAction(newDay(),'open');day=draftProcess(day,'cooling-maintenance',{condition:'issue',note:'Primjer: potreban servis',count:null});
 assert.match(day.processRecords['cooling-maintenance'].advice,/Primjer: potreban servis/);
});
