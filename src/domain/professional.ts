import {requireValue as need} from '../../vendor/project-store.ts';
const find=(rows:any[],id:string,label:string)=>{const v=rows.find(x=>x.id===id);need(v,label+'不存在。');return v;};
const unique=(values:any[],label:string)=>need(new Set(values).size===values.length,label+'不能重复。');
export function visible(p:any,stageID:string){const stage=find(p.stages,stageID,'阶段');const ids=new Set(p.stages.filter((s:any)=>s.order<=stage.order).flatMap((s:any)=>s.clue_ids));return p.clues.filter((c:any)=>ids.has(c.id));}
export function evaluate(p:any,stageID:string){
 const clues=visible(p,stageID),confirmed=clues.filter((c:any)=>c.reliability==='confirmed');
 const knowledge=new Map<string,string>();
 for(const clue of confirmed){const values=confirmed.filter((c:any)=>c.proposition_id===clue.proposition_id).map((c:any)=>c.polarity);knowledge.set(clue.proposition_id,values.includes('supports')&&values.includes('refutes')?'contested':values.includes('supports')?'supported':'refuted');}
 return {stage_id:stageID,hypotheses:p.hypotheses.map((h:any)=>{const requirements=h.requirements.map((r:any)=>({proposition_id:r.proposition_id,expected:r.value,observation:knowledge.get(r.proposition_id)??'unknown'}));const unknown=requirements.some((r:any)=>['unknown','contested'].includes(r.observation));const contradicted=requirements.some((r:any)=>r.observation===(r.expected?'refuted':'supported'));return {hypothesis_id:h.id,title:h.title,status:contradicted?'contradicted':unknown||!requirements.length?'undetermined':'compatible',requirements};}),note:'仅使用此阶段已展示且在工程中声明confirmed的线索。compatible表示相容，不代表唯一解；作者真相未进入计算。'};
}
export function readerView(p:any,stageID:string){
 const stage=find(p.stages,stageID,'阶段'),clues=visible(p,stageID),ids=new Set(clues.map((c:any)=>c.id));
 return {stage:{id:stage.id,title:stage.title},clues:clues.map((c:any)=>({id:c.id,title:c.title,reliability:c.reliability,polarity:c.polarity})),testimonies:p.testimonies.filter((t:any)=>t.clue_ids.length&&t.clue_ids.every((id:string)=>ids.has(id))).map((t:any)=>({witness:find(p.witnesses,t.witness_id,'证人').name,statement:t.statement})),note:'此投影不含作者真值、命题原文或未来线索；这是创作视角隔离，不是读取权限控制。'};
}
export function checkMystery(p:any){
 const revealed=new Set(p.stages.flatMap((s:any)=>s.clue_ids));
 return {unrevealed_clue_ids:p.clues.filter((c:any)=>!revealed.has(c.id)).map((c:any)=>c.id),unknown_truth_ids:p.propositions.filter((v:any)=>v.author_truth==='unknown').map((v:any)=>v.id),author_conflicts:p.clues.filter((c:any)=>{const v=find(p.propositions,c.proposition_id,'命题');return c.reliability==='confirmed'&&v.author_truth!=='unknown'&&((c.polarity==='supports')!==(v.author_truth==='true'));}).map((c:any)=>({clue_id:c.id,proposition_id:c.proposition_id})),unbacked_testimony_ids:p.testimonies.filter((t:any)=>!t.clue_ids.length).map((t:any)=>t.id),stages:[...p.stages].sort((a,b)=>a.order-b.order).map(s=>({id:s.id,title:s.title,order:s.order})),note:'证据矛盾可以是误导或待修订声明，需作者判断；结构完整不证明诡计公平。'};
}
export function validateDomain(p:any){
 unique(p.stages.map((s:any)=>s.order),'阶段顺序');
 for(const clue of p.clues)find(p.propositions,clue.proposition_id,'线索命题');
 for(const s of p.stages){unique(s.clue_ids,'阶段线索');for(const id of s.clue_ids)find(p.clues,id,'阶段线索');}
 for(const t of p.testimonies){find(p.witnesses,t.witness_id,'证人');find(p.propositions,t.proposition_id,'证词命题');unique(t.clue_ids,'证词线索');for(const id of t.clue_ids)need(find(p.clues,id,'证词线索').proposition_id===t.proposition_id,'证词线索与命题不对应。');}
 for(const h of p.hypotheses){unique(h.requirements.map((r:any)=>r.proposition_id),'假说命题');for(const r of h.requirements)find(p.propositions,r.proposition_id,'假说命题');}
}
export async function checkSources(_p:any,_s:any[],_request:any){}
export async function pureAction(_a:string,_i:any){return undefined;}
export async function writeProfessional(_a:string,_p:any,_s:any[],_i:any,_request:any){need(false,'未知专业写动作。');}
export async function readProfessional(a:string,p:any,_s:any[],i:any,_request:any):Promise<any>{
 if(a==='reader_view')return readerView(p,i.stage_id);
 if(a==='evaluate_hypotheses')return evaluate(p,i.stage_id);
 if(a==='check_mystery')return checkMystery(p);
 if(a==='compare_stages'){const from=find(p.stages,i.from_stage_id,'起始阶段'),to=find(p.stages,i.to_stage_id,'目标阶段');need(from.order<=to.order,'阶段比较须沿揭示顺序前进。');const old=new Set(visible(p,from.id).map((c:any)=>c.id));return {from:readerView(p,from.id),to:readerView(p,to.id),newly_visible:visible(p,to.id).filter((c:any)=>!old.has(c.id)).map((c:any)=>({id:c.id,title:c.title}))};}
 if(a==='locate_clue'){const clue=find(p.clues,i.clue_id,'线索');return {clue_id:clue.id,title:clue.title,ranges:clue.ranges};}
}
export function summaries(p:any){return [{title:'作者命题',lines:p.propositions.map((v:any)=>`${v.statement}：${v.author_truth==='true'?'真':v.author_truth==='false'?'假':'未知'}`)},{title:'线索与证词',lines:[...p.clues.map((c:any)=>`${c.title}（${c.reliability}）`),...p.testimonies.map((t:any)=>`${find(p.witnesses,t.witness_id,'证人').name}：${t.statement}`)]},{title:'揭示结构',lines:[...p.stages].sort((a,b)=>a.order-b.order).map(s=>`${s.title}：本阶段${s.clue_ids.length}项线索`)}];}

export function validateTransition(_next:any,_previous:any){}
