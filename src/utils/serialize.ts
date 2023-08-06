import { Text } from 'slate';

// define your custom text type
type CustomText = Text & {
  bold?: boolean;
  italic?: boolean;
};

// define your custom element type
type CustomElement = {
  type: string;
  children: CustomNode[];
};

// define your custom node type
type CustomNode = CustomElement | CustomText;

// define the function type for serializeText
type SerializeText = (node: CustomText) => string;

const serializeText: SerializeText = node => {
  let string = node.text;

  if (node.bold) {
    string = `<strong>${string}</strong>`;
  }

  if (node.italic) {
    string = `<em>${string}</em>`;
  }

  return string;
};

// define the function type for serializeNote
type SerializeNote = (node: CustomNode, structureTags: unknown) => string;

const serializeNote: SerializeNote = (node, structureTags) => {
  if (Text.isText(node)) {
    return serializeText(node);
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
