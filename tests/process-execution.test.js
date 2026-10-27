import {test} from 'node:test';import assert from 'node:assert/strict';
import {chapters} from '../standard/process-data.js';
import {newDay,dayAction} from '../standard/workday-core.js';
import {draftProcess,reviewProcess} from '../standard/connected-process.js';
import {executeProcess,operationKind} from '../standard/process-execution.js';
const make=(d,id,condition='ok',count=null,note='')=>reviewProcess(draftProcess(d,id,{condition,count,note}),id);
const run=(d,id)=>executeProcess(d,id);
test('all catalog entries have a supported operational action',()=>{for(const c of chapters)for(const p of c.processes)assert.ok(operationKind(p.id),p.id)});
test('procurement and receiving from catalog advance the same guided workday',()=>{
 let d=dayAction(newDay(),'open');d=run(make(d,'procurement-suggestion'),'procurement-suggestion');assert.equal(d.stage,2);assert.equal(d.draft.cartons,10);
 d=run(make(d,'procurement-suggestion'),'procurement-suggestion');assert.equal(d.stage,3);
 d=run(make(d,'receipt-match','ok',9),'receipt-match');assert.equal(d.stock.warehouse,216);assert.equal(d.receipt.missingCartons,1);assert.equal(d.stage,4);
});
test('count through a catalog action feeds the day inventory and prevents duplicate execution',()=>{
 let d=newDay();for(const a of ['open','suggest','approve'])d=dayAction(d,a);d=dayAction(d,'receive',2);d=dayAction(d,'dispatch',24);d=dayAction(d,'accept',24);d=dayAction(d,'sell',3);d=dayAction(d,'return',1);
 d=run(make(d,'inventory-count','ok',20),'inventory-count');assert.equal(d.review.expected,22);assert.equal(d.review.difference,-2);assert.equal(d.stock.shop,22);assert.equal(d.stage,9);assert.throws(()=>run(d,'inventory-count'));
});
test('equipment issue creates a real demo task and its resolution changes task state',()=>{
 let d=dayAction(newDay(),'open');d=run(make(d,'cooling-maintenance','issue',null,'Potrebno čišćenje'),'cooling-maintenance');
 assert.equal(d.operations.tasks.length,1);assert.equal(d.operations.tasks[0].status,'open');
 d=run(make(d,'cooling-maintenance','ok'),'cooling-maintenance');assert.equal(d.operations.tasks[0].status,'resolved');
});
test('reported price discrepancy blocks sale and resolved check unblocks it',()=>{
 let d=dayAction(newDay(),'open');d=dayAction(d,'suggest');d=dayAction(d,'approve');d=dayAction(d,'receive',2);d=dayAction(d,'dispatch',24);d=dayAction(d,'accept',24);
 d=run(make(d,'prices-match','issue'),'prices-match');assert.equal(d.cases.price,'draft');assert.throws(()=>dayAction(d,'sell',3),/cijen/i);
 d=run(make(d,'prices-match','ok'),'prices-match');assert.equal(d.cases.price,'resolved');d=dayAction(d,'sell',3);assert.equal(d.stock.shop,21);
});
test('requiring a known reviewed proposal and guarding changed data',()=>{
 let d=dayAction(newDay(),'open');assert.throws(()=>run(d,'cooling-maintenance'));
 d=make(d,'stock-location');d=dayAction(d,'suggest');d=dayAction(d,'approve');d=dayAction(d,'receive',2);
 assert.throws(()=>run(d,'stock-location'),/promijenilo/i);
});
test('demo requests can be completed and disappear from active assistant context',async()=>{const {resolveOperation}=await import('../standard/process-execution.js');const {assistantSnapshot}=await import('../standard/assistant-state.js');let d=dayAction(newDay(),'open');d=run(make(d,'transfer-request','ok',5),'transfer-request');assert.equal(assistantSnapshot(d).zahtjevi.length,1);d=resolveOperation(d,'requests',d.operations.requests[0].id);assert.equal(assistantSnapshot(d).zahtjevi.length,0);assert.throws(()=>resolveOperation(d,'requests',d.operations.requests[0].id));});
