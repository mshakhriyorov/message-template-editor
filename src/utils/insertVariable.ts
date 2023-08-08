import type { Editor } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import type { Options } from '../types/insert-variable';
import type { CustomElement } from '../types/custom';

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
  // eslint-disable-next-line no-debugger
  // debugger;
  if (insertSpace) {
    Transforms.insertNodes(editor, { text: ' ' });
    Transforms.move(editor);
  }
  // Editor focus hack
  setTimeout(() => ReactEditor.focus(editor), 0);
};
