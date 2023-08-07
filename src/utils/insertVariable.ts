import type { Editor } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

interface Options {
  insertSpace: boolean;
}

type CustomText = {
  text: string;
};

type CustomElement = {
  type: 'variable';
  character: string;
  children: CustomText[];
};

export const insertVariable = (
  editor: Editor,
  character: string,
  options: Options,
): void => {
  const { insertSpace } = options;
  const variable: CustomElement = {
    type: 'variable',
    character,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, variable);
  Transforms.move(editor);
  if (insertSpace) {
    Transforms.insertNodes(editor, { text: ' ' });
    Transforms.move(editor);
  }
  // Editor focus hack
  setTimeout(() => ReactEditor.focus(editor), 0);
};
