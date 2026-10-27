import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newSystem,systemAction} from '../standard/system-demo.js';
import {newJourney,perform} from '../standard/proposal-core.js';

test('purchase order moves through approval and receipt into the shared stock journey',()=>{
 let s=newSystem(),j=newJourney();
 ({system:s,journey:j}=systemAction(s,j,'purchase-create'));
 assert.throws(()=>systemAction(s,j,'purchase-receive'),/odobri/i);
 ({system:s,journey:j}=systemAction(s,j,'purchase-approve'));
 ({system:s,journey:j}=systemAction(s,j,'purchase-receive'));
 assert.equal(s.purchase,'received');assert.equal(j.stock.warehouse,240);assert.equal(j.stage,1);
 assert.throws(()=>systemAction(s,j,'purchase-receive'));
});
test('customer order requires available goods and delivery before a document draft',()=>{
 let s=newSystem(),j=newJourney();({system:s,journey:j}=systemAction(s,j,'sale-create'));
 assert.throws(()=>systemAction(s,j,'sale-prepare'),/zaliha/i);
 assert.throws(()=>systemAction(s,j,'invoice-draft'));
 j=perform(perform(perform(j,'receive',2),'dispatch',24),'accept',24);
 ({system:s,journey:j}=systemAction(s,j,'sale-prepare'));assert.equal(s.sale,'ready');
 ({system:s,journey:j}=systemAction(s,j,'sale-deliver'));assert.equal(j.stock.shop,21);assert.equal(j.stock.sold,3);
 ({system:s,journey:j}=systemAction(s,j,'invoice-draft'));assert.equal(s.sale,'invoice-draft');
 assert.throws(()=>systemAction(s,j,'sale-deliver'));
});
test('checklist toggles independently and rejects unknown items',()=>{
 let s=newSystem(),j=newJourney();({system:s}=systemAction(s,j,'task:counter'));
 assert.equal(s.tasks.counter,true);({system:s}=systemAction(s,j,'task:counter'));
 assert.equal(s.tasks.counter,false);assert.throws(()=>systemAction(s,j,'task:unknown'));
});
test('a demo return requires an original sale and restores stock once, without issuing a refund',()=>{
 let s=newSystem(),j=perform(perform(perform(newJourney(),'receive',2),'dispatch',24),'accept',24);
 assert.throws(()=>systemAction(s,j,'return-request'));
 ({system:s,journey:j}=systemAction(s,j,'sale-create'));
 ({system:s,journey:j}=systemAction(s,j,'sale-prepare'));
 ({system:s,journey:j}=systemAction(s,j,'sale-deliver'));
 ({system:s,journey:j}=systemAction(s,j,'invoice-draft'));
 ({system:s,journey:j}=systemAction(s,j,'return-request'));
 assert.equal(j.stock.shop,21);
 ({system:s,journey:j}=systemAction(s,j,'return-accept'));
 assert.equal(j.stock.shop,22);assert.equal(j.stock.sold,2);assert.equal(s.sale,'returned');
 assert.throws(()=>systemAction(s,j,'return-accept'));
});
test('day closing is blocked until both cash checks and the outstanding document are resolved',()=>{
 let s=newSystem(),j=newJourney();assert.throws(()=>systemAction(s,j,'cash-close'),/provjer/i);
 ({system:s}=systemAction(s,j,'cash-mid'));({system:s}=systemAction(s,j,'cash-end'));
 assert.throws(()=>systemAction(s,j,'cash-close'),/dokument/i);
 ({system:s}=systemAction(s,j,'cash-resolve'));({system:s}=systemAction(s,j,'cash-close'));
 assert.equal(s.cash.closed,true);assert.throws(()=>systemAction(s,j,'cash-close'));
});
