import type { CustomNode } from './custom';

export type SerializeNote = (
  node: CustomNode,
  structureTags: unknown,
) => string;

export type Serialize = (nodes: CustomNode[], structureTags: unknown) => string;
