import {createHash} from "node:crypto";
import {newProject} from "../../src/domain/model.ts";
export const original="林溪在雨港邮局等信。\n她把旧钥匙放进信封。\n\n第二天，她决定出发。\n";
export const sha=(v:string|Uint8Array)=>createHash("sha256").update(v).digest("hex");
export const sourceRef={kind:"document",work_ref:{workspace_id:"workspace_test",kind:"novel",object_id:"novel_test"},document_id:"doc_11111111-1111-4111-8111-111111111111",revision_id:"rev_11111111-1111-4111-8111-111111111111",sha256:sha(original)};
export const range={source_index:0,byte_start:0,byte_end:Buffer.byteLength(original),quote:original};
export const base=(r:any,key:string)=>({object_id:r.object.object_id,expected_revision:r.object.revision,expected_sha256:r.sha256,operation_key:key});
export const selection=(r:any)=>({object_id:r.object.object_id,revision:r.object.revision});
export function wav(value=6000,frames=800,rate=8000){const b=Buffer.alloc(44+frames*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(frames*2,40);for(let n=0;n<frames;n++)b.writeInt16LE(value,44+n*2);return b;}

export function scenario(_work:any=sourceRef.work_ref):any {const p={...newProject("雨港来信"),...{
  "propositions": [
    {
      "id": "sender",
      "statement": "林溪写了这封信。",
      "author_truth": "false",
      "ranges": []
    },
    {
      "id": "key",
      "statement": "寄信人持有旧站钥匙。",
      "author_truth": "true",
      "ranges": []
    }
  ],
  "witnesses": [
    {
      "id": "postman",
      "name": "守站人",
      "notes": "陈述仍需与可见线索核对。"
    }
  ],
  "clues": [
    {
      "id": "seal",
      "title": "邮戳日期在林溪抵达之前",
      "proposition_id": "sender",
      "polarity": "refutes",
      "reliability": "confirmed",
      "ranges": []
    },
    {
      "id": "key-mark",
      "title": "信封里留有旧钥匙压痕",
      "proposition_id": "key",
      "polarity": "supports",
      "reliability": "confirmed",
      "ranges": []
    }
  ],
  "testimonies": [
    {
      "id": "statement",
      "witness_id": "postman",
      "statement": "信到的时候，她还没有回来。",
      "proposition_id": "sender",
      "asserts": false,
      "clue_ids": [
        "seal"
      ]
    }
  ],
  "hypotheses": [
    {
      "id": "self-letter",
      "title": "林溪给自己寄信",
      "requirements": [
        {
          "proposition_id": "sender",
          "value": true
        }
      ]
    },
    {
      "id": "station-keeper",
      "title": "寄信人与旧站有关",
      "requirements": [
        {
          "proposition_id": "key",
          "value": true
        }
      ]
    }
  ],
  "stages": [
    {
      "id": "opening",
      "title": "读完开篇",
      "order": 0,
      "clue_ids": [
        "seal"
      ]
    },
    {
      "id": "second-scene",
      "title": "发现钥匙之后",
      "order": 1,
      "clue_ids": [
        "key-mark"
      ]
    }
  ]
}};
for(const values of Object.values(p))if(Array.isArray(values))for(const v of values)if(v&&typeof v==="object"&&"ranges" in v)v.ranges=[range];
return p;}
