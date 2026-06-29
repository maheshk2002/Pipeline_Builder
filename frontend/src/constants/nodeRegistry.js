import { InputNode } from '../nodes/inputNode';
import { LLMNode } from '../nodes/llmNode';
import { OutputNode } from '../nodes/outputNode';
import { TextNode } from '../nodes/textNode';
import { NoteNode } from '../nodes/noteNode';
import { ConditionNode } from '../nodes/conditionNode';
import { ApiNode } from '../nodes/apiNode';
import { DataFilterNode } from '../nodes/dataFilterNode';
import { DashboardNode } from '../nodes/dashboardNode';

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  condition: ConditionNode,
  api: ApiNode,
  dataFilter: DataFilterNode,
  dashboard: DashboardNode,
};
