# 专业流程

读取固定原文与规划→登记命题、证词和线索→明确各阶段揭示→只用当时可见线索评估假说→对照作者真相查缺口→形成局部返工候选→沿新稿复核。

## 作者视角与读者视角

作者视角先读取固定原稿、小说规划和已有工程，put_proposition记录明确作者真相或unknown，put_witness／put_testimony保留证人及原话，put_clue固定来源、证据方向和可靠度声明。不能把模型推测直接标为confirmed。

要模拟读者，只使用reader_view和evaluate_hypotheses读取指定stage_id；不要把get_project、build_context或完整作者真相报告当作读者上下文。读者投影是创作方法的视角隔离，不是权限隔离。

## 假说与揭示

put_hypothesis给出明确命题前提；put_stage决定实际揭示线索及顺序。仅confirmed且已经揭示的线索进入确定性评估，声称、未知和互相冲突的证据保持未定。compatible表示相容，不能改称唯一解、真凶已证实或读者必然猜出。

compare_stages核对读者新增信息，check_mystery检查缺失揭示和作者声明冲突，locate_clue回到固定原文。修订形成宿主候选后明确读了哪一稿，再建立新专业修订；旧线索和证词仍可回读。

## 版本与恢复

固定来源、专业依据、CAS和原键；删除当前记录不删除旧修订。列表完整分页回读，部分阅读如实声明。通用查找、比较、导出与交接见[操作地图](operations.md)，参数仍以当前安装版Schema为准。
