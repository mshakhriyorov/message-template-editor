import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import './Editor.scss';

import { EditorHeader } from './Header';
import { serialize } from '../../utils/serialize';
// import { EditorVariables } from './Variables';
import { EditorElement } from './Element';

const VARIABLES = ['{firstName}', '{lastName}', '{company}', '{position}'];

type CustomText = {
  text: string;
};

type CustomElement = {
  type: 'variable' | 'paragraph';
  children: CustomText[];
  character: string;
};

type PROPS = {
  children: string;
  element: { type: 'variable' | 'paragraph'; character: string };
  attributes: React.HTMLAttributes<HTMLElement>;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialDocument: Descendant[] = [
  {
    type: 'paragraph',
    character: '',
    children: [
      {
        text: '',
      },
    ],
  },
];

export const Editor = (): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState(initialDocument);
  const renderElement = useCallback(
    (props: PROPS): JSX.Element => <EditorElement {...props} />,
    [],
  );
  console.log(serialize(value, initialDocument));

  return (
    <div className="editor">
      <div className="editor__header">Message Template Editor</div>
      <EditorHeader
        variables={VARIABLES}
        isInputFocused={isFocused}
        editor={editor}
      />

      <div className="editor__slate">
        <Slate
          editor={editor}
          initialValue={initialDocument}
          onChange={(value: Descendant[]): void => setValue(value)}
        >
          <Editable
            placeholder="Optional text"
            renderElement={renderElement}
            className="editor__input"
            contentEditable="false"
            onFocus={(): void => setIsFocused(true)}
            onBlur={(): void => setIsFocused(false)}
          />

          {/* <EditorVariables /> */}
        </Slate>
      </div>
    </div>
  );
};
