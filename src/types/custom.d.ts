import type { BaseEditor, Text } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

type EmptyText = Text & {
  text: string;
};

export type CustomElement = {
  type: string | 'variable' | 'paragraph';
  character: string;
  children: EmptyText[];
};

export type CustomNode = CustomElement | EmptyText;

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };
