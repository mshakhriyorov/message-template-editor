import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createEditor, Transforms, Range, Node, Element } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import type { Descendant, BaseRange, Editor as EditorType } from 'slate';
import type { ReactEditor } from 'slate-react';

import './Editor.scss';

import { EditorHeader } from './Header';
import { EditorElement } from './Element';

import { selectorSplitValue } from '../../app/ui/UiSlice';

import { serialize } from '../../utils/serialize';

import type { CustomEditor, CustomElement } from '../../types/custom';
import type { EDITOR_PROPS } from '../../types/editor';

const VARIABLES = ['{firstName}', '{lastName}', '{company}', '{position}'];

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: { text: string };
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}

const initialValue: Descendant[] = [
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
  const [isSplit, setIsSplit] = useState(false);
  const splitValue = useSelector(selectorSplitValue);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(
    (props: EDITOR_PROPS): JSX.Element => <EditorElement {...props} />,
    [],
  );
  console.log(serialize(value, initialValue));
  const splittedValue: Descendant[] = [
    {
      type: 'paragraph',
      character: '',
      children: [
        {
          text: splitValue,
        },
      ],
    },
  ];

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    editor: EditorType & ReactEditor,
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      Transforms.insertText(editor, '\n');
    }
    if (event.key === 'Backspace') {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const currentNode = Node.parent(editor, selection.anchor.path);
        if (Element.isElement(currentNode)) {
          if (editor.isVoid(currentNode as Element)) {
            event.preventDefault();
            editor.deleteBackward('word');
          }
        }
      }
    }
  };

  const slateEditor = (value: Descendant[]): JSX.Element => (
    <div className="editor__slate">
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value: Descendant[]): void => setValue(value)}
      >
        <Editable
          placeholder="Optional text"
          renderElement={renderElement}
          className="editor__input"
          onKeyDown={(e): void => onKeyDown(e, editor)}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        />
      </Slate>
    </div>
  );

  // split and add editor input once add button is clicked
  useEffect(() => {
    if (isSplit) {
      setIsSplit(false);
    }
  }, []);

  return (
    <div className="editor">
      <div className="editor__header">Message Template Editor</div>
      <EditorHeader
        variables={VARIABLES}
        isInputFocused={isFocused}
        editor={editor}
        setIsSplit={setIsSplit}
      />
      {slateEditor(initialValue)}

      {isSplit && slateEditor(splittedValue)}
    </div>
  );
};
