import { Text } from 'slate';

type CustomText = Text & {
  bold?: boolean;
  italic?: boolean;
};

type CustomElement = {
  type: string;
  children: CustomNode[];
};

type CustomNode = CustomElement | CustomText;

// define the function type for serializeNote
type SerializeNote = (node: CustomNode, structureTags: unknown) => string;

const serializeNote: SerializeNote = (node, structureTags) => {
  if (Text.isText(node)) {
    return node.text;
  }

  const children: string = node.children
    .map(childrenNotes => serializeNote(childrenNotes, structureTags))
    .join('');

  return children;
};

// define the function type for serialize
type Serialize = (nodes: CustomNode[], structureTags: unknown) => string;

export const serialize: Serialize = (nodes, structureTags) =>
  nodes.map(node => serializeNote(node, structureTags)).join('');
