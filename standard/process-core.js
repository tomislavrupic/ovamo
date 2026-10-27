const normalized=x=>String(x).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
export function findProcesses(chapters,query=''){
 const term=normalized(query.trim());
 return chapters.flatMap(c=>c.processes.map(p=>({...p,chapterId:c.id,chapterTitle:c.title}))).filter(p=>!term||normalized([p.title,p.chapterTitle,...p.steps,p.automation,p.assistance].join(' ')).includes(term));
}
export function completedSteps(progress,process){return Array.isArray(progress?.[process.id])?process.steps.filter((_,i)=>progress[process.id].includes(i)).length:0;}
export function toggleStep(progress,process,index){
 if(!Number.isInteger(index)||index<0||index>=process.steps.length)throw new Error('Nepoznat korak.');
 const previous=Array.isArray(progress?.[process.id])?progress[process.id].filter(x=>Number.isInteger(x)&&x>=0&&x<process.steps.length):[];
 const next=previous.includes(index)?previous.filter(x=>x!==index):[...new Set([...previous,index])];
 return {...progress,[process.id]:next};
}
export function simulate(process,progress={}){
 const done=completedSteps(progress,process),indices=Array.isArray(progress[process.id])?progress[process.id]:[];
 const next=process.steps.find((_,i)=>!indices.includes(i));
 return {auto:`SIMULACIJA · ${process.automation} Označeno ${done} od ${process.steps.length} koraka.`,ai:`PRIPREMLJENI PRIMJER · ${process.assistance} ${next?`Sljedeći korak u vježbi: ${next}`:'Svi koraci vježbe su označeni; pregledaj ih prije završetka.'}`,review:process.review};
}
