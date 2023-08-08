import { Text } from 'slate';

import type { Serialize, SerializeNote } from '../types/serialize';

const serializeNote: SerializeNote = (node, structureTags) => {
  if (Text.isText(node)) {
    return node.text;
  }

  const children: string = node.children
    .map(childrenNotes => serializeNote(childrenNotes, structureTags))
    .join('');

  return children;
};

export const serialize: Serialize = (nodes, structureTags) =>
  nodes.map(node => serializeNote(node, structureTags)).join('');
