import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chapters} from '../standard/process-data.js';
import {findProcesses,toggleStep,completedSteps,simulate} from '../standard/process-core.js';

test('catalog covers each source chapter with unique actionable process steps',()=>{
 assert.equal(chapters.length,20);
 assert.deepEqual(chapters.map(c=>c.id),Array.from({length:20},(_,i)=>i+1));
 const processes=chapters.flatMap(c=>c.processes);
 assert.ok(processes.length>=45);
 assert.equal(new Set(processes.map(p=>p.id)).size,processes.length);
 for(const p of processes){assert.ok(p.steps.length>=3);assert.ok(p.automation);assert.ok(p.assistance);assert.ok(p.review);}
});
test('search finds a process by accent-insensitive title or related description',()=>{
 assert.ok(findProcesses(chapters,'blagajna').some(p=>p.chapterId===8));
 assert.ok(findProcesses(chapters,'cijene').some(p=>p.chapterId===18));
 assert.ok(findProcesses(chapters,'prebrojavanje').some(p=>p.chapterId===6));
 assert.deepEqual(findProcesses(chapters,'nepostojeci-pojam-123'),[]);
});
test('step completion is scoped to a known process and safe to toggle',()=>{
 const p=chapters[0].processes[0];let progress={};progress=toggleStep(progress,p,0);
 assert.equal(completedSteps(progress,p),1);assert.equal(completedSteps(progress,chapters[1].processes[0]),0);
 assert.throws(()=>toggleStep(progress,p,p.steps.length));
 progress=toggleStep(progress,p,0);assert.equal(completedSteps(progress,p),0);
});
test('simulations identify prepared examples and require human review',()=>{
 const p=chapters[0].processes[0];const result=simulate(p);
 assert.match(result.auto,/simulacij/i);assert.match(result.ai,/pripremljen/i);assert.equal(result.review,p.review);
});
test('prepared suggestion follows the current exercise progress without performing actions',()=>{
 const p=chapters[0].processes[0];let progress={};
 assert.match(simulate(p,progress).ai,new RegExp(p.steps[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
 progress=toggleStep(progress,p,0);
 assert.match(simulate(p,progress).ai,new RegExp(p.steps[1].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
 assert.equal(completedSteps(progress,p),1);
});
