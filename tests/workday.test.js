import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newDay,dayAction,dayAdvice} from '../standard/workday-core.js';
const apply=(s,action,quantity)=>dayAction(s,action,quantity);

test('guided day links receipt, transfers, sale, return, discrepancy and close',()=>{
 let s=newDay();s=apply(s,'open');s=apply(s,'suggest');assert.equal(s.draft.cartons,10);
 s=apply(s,'approve');s=apply(s,'receive',10);assert.equal(s.stock.warehouse,240);
 s=apply(s,'dispatch',48);s=apply(s,'accept',48);assert.equal(s.stock.shop,48);
 s=apply(s,'sell',3);assert.equal(s.stock.shop,45);s=apply(s,'return',1);assert.equal(s.stock.shop,46);
 s=apply(s,'count',45);assert.deepEqual([s.review.expected,s.review.counted,s.review.difference],[46,45,-1]);
 assert.equal(s.stock.shop,46);s=apply(s,'review');assert.equal(s.review.status,'handed-over');
 s=apply(s,'cash-mid');s=apply(s,'cash-end');s=apply(s,'document-check');s=apply(s,'close');
 assert.equal(s.closed,true);assert.equal(s.stock.sold,2);assert.equal(s.stock.warehouse,192);assert.equal(s.stock.inTransit,0);
 assert.throws(()=>apply(s,'close'));
});
test('partial transfer remains in transit until separately received',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);
 s=apply(s,'receive',10);s=apply(s,'dispatch',48);s=apply(s,'accept',30);
 assert.equal(s.stock.shop,30);assert.equal(s.stock.inTransit,18);assert.throws(()=>apply(s,'sell',3));
 s=apply(s,'accept',18);assert.equal(s.stock.inTransit,0);assert.equal(s.stock.shop,48);
});
test('rejects out of order, invalid quantities and closing with outstanding checks',()=>{
 let s=newDay();assert.throws(()=>apply(s,'receive',10));assert.equal(s.stock.warehouse,0);
 for(const a of ['open','suggest','approve'])s=apply(s,a);assert.throws(()=>apply(s,'receive',0));
 s=apply(s,'receive',1);assert.throws(()=>apply(s,'dispatch',25));
 assert.throws(()=>apply(s,'close'));assert.equal(s.stock.warehouse,24);
});
test('a short supplier delivery is recorded and guidance uses actual stock',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);
 s=apply(s,'receive',9);assert.equal(s.receipt.missingCartons,1);assert.equal(s.stock.warehouse,216);
 assert.match(dayAdvice(s).text,/216/);assert.match(dayAdvice(s).text,/1/);
});
test('inventory count is a proposal, does not alter stock, and is never silently corrected',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);
 s=apply(s,'receive',2);s=apply(s,'dispatch',24);s=apply(s,'accept',24);s=apply(s,'sell',3);s=apply(s,'return',1);
 s=apply(s,'count',20);assert.equal(s.review.difference,-2);assert.equal(s.stock.shop,22);
 s=apply(s,'review');assert.equal(s.stock.shop,22);assert.equal(s.review.status,'handed-over');
});
test('demo sale records an exact illustrative total and a return creates only a refund proposal',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);
 s=apply(s,'receive',2);s=apply(s,'dispatch',24);s=apply(s,'accept',24);s=apply(s,'sell',3);
 assert.deepEqual([s.sale.quantity,s.sale.unitCents,s.sale.totalCents],[3,250,750]);
 s=apply(s,'return',1);assert.equal(s.sale.refundCentsProposal,250);assert.equal(s.sale.refundPaid,false);
});
test('price, damage and complaint drafts are handed over without changing stock or sending anything',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);s=apply(s,'receive',2);
 assert.throws(()=>apply(s,'issue-complaint'));assert.throws(()=>apply(s,'issue-price'));
 s=apply(s,'dispatch',24);s=apply(s,'accept',24);
 s=apply(s,'issue-price');assert.equal(s.cases.price,'draft');assert.equal(s.stock.warehouse,24);
 assert.match(dayAdvice(s).text,/cijen/i);s=apply(s,'handoff-price');assert.equal(s.cases.price,'handed-over');
 assert.throws(()=>apply(s,'issue-price'));assert.throws(()=>apply(s,'sell',3),/cijen/i);
 s=apply(s,'resolve-price');
 s=apply(s,'issue-damage');assert.equal(s.stock.shop,24);s=apply(s,'handoff-damage');
 s=apply(s,'sell',3);s=apply(s,'issue-complaint');s=apply(s,'handoff-complaint');
 assert.equal(s.cases.complaint,'handed-over');assert.equal(s.stock.shop,21);
});
test('assistant follows the most recently raised unresolved situation',()=>{
 let s=newDay();for(const a of ['open','suggest','approve'])s=apply(s,a);s=apply(s,'receive',2);s=apply(s,'dispatch',24);s=apply(s,'accept',24);
 s=apply(s,'issue-damage');s=apply(s,'sell',3);s=apply(s,'issue-complaint');
 assert.match(dayAdvice(s).text,/pritužb/i);s=apply(s,'handoff-complaint');assert.match(dayAdvice(s).text,/ošteć/i);
});
