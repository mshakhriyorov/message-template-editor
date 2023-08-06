import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

type CustomElement = {
  type: 'paragraph';
  children: CustomText[];
};
type CustomText = {
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

import './Editor.scss';

import { EditorHeader } from './Header';
import { serialize } from '../../utils/serialize';

const VARIABLES = ['{firstName}', '{lastName}', '{company}', '{position}'];

const initialDocument: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

export const Editor = (): JSX.Element => {
  // const [isFocused, setIsFocused] = useState(false);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState(initialDocument);

  return (
    <div className="editor">
      <div className="editor__header">Message Template Editor</div>
      <EditorHeader
        variables={VARIABLES}
        isInputFocused={!!serialize(value, initialDocument)}
      />

      <div className="editor__slate">
        <Slate
          editor={editor}
          initialValue={initialDocument}
          onChange={(value: Descendant[]): void => setValue(value)}
          // onFocus={(): void => setIsFocused(true)}
        >
          <Editable />
        </Slate>
      </div>
      {/* <EditorInput setIsFocused={setIsFocused} /> */}
    </div>
  );
};
