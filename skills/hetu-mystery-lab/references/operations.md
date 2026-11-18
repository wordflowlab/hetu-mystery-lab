# 操作地图

由正式清单生成，执行前发现当前安装版Schema。

| 动作 | 用途 | 必填参数 | 效果 |
| --- | --- | --- | --- |
| list_projects | 查找专业工程 |  | read |
| get_project | 读取固定专业工程 | object_id | read |
| save_project | 保存专业工程 | expected_revision, expected_sha256, operation_key, content | managed_write |
| put_proposition | 维护命题 | object_id, expected_revision, expected_sha256, operation_key, proposition | managed_write |
| remove_proposition | 移除命题 | object_id, expected_revision, expected_sha256, operation_key, proposition_id | managed_write |
| put_witness | 维护证人 | object_id, expected_revision, expected_sha256, operation_key, witness | managed_write |
| remove_witness | 移除证人 | object_id, expected_revision, expected_sha256, operation_key, witness_id | managed_write |
| put_clue | 维护线索 | object_id, expected_revision, expected_sha256, operation_key, clue | managed_write |
| remove_clue | 移除线索 | object_id, expected_revision, expected_sha256, operation_key, clue_id | managed_write |
| put_testimony | 维护证词 | object_id, expected_revision, expected_sha256, operation_key, testimony | managed_write |
| remove_testimony | 移除证词 | object_id, expected_revision, expected_sha256, operation_key, testimony_id | managed_write |
| put_hypothesis | 维护假说 | object_id, expected_revision, expected_sha256, operation_key, hypothesis | managed_write |
| remove_hypothesis | 移除假说 | object_id, expected_revision, expected_sha256, operation_key, hypothesis_id | managed_write |
| put_stage | 维护揭示阶段 | object_id, expected_revision, expected_sha256, operation_key, stage | managed_write |
| remove_stage | 移除揭示阶段 | object_id, expected_revision, expected_sha256, operation_key, stage_id | managed_write |
| reader_view | 读取阶段读者视角 | object_id, stage_id | read |
| evaluate_hypotheses | 按可见线索评估假说 | object_id, stage_id | read |
| check_mystery | 检查证据与揭示结构 | object_id | read |
| compare_stages | 比较揭示前后信息 | object_id, from_stage_id, to_stage_id | read |
| locate_clue | 定位线索原文 | object_id, clue_id | read |
| get_source | 读取固定来源 | object_id, source_index | read |
| get_basis | 读取固定专业依据 | object_id, basis_index | read |
| compare_versions | 比较固定修订 | object_id, from_revision, to_revision | read |
| export_project | 导出固定专业报告 | object_id, format | read |
| build_context | 准备有界创作上下文 | object_id, goal, max_chars | read |
| create_handoff | 准备精确AI交接 | object_id, goal | read |
| get_operation | 回读原操作 | operation_key | read |
