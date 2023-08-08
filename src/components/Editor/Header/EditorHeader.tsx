import React from 'react';
import { Editor, Transforms } from 'slate';
// import type { ReactEditor } from 'slate-react';

import './EditorHeader.scss';

import { Button } from '../../Button';

import { setSplitValue, setVariableIntoEditor } from '../../../app/ui/UiSlice';

import { insertVariable } from '../../../utils/insertVariable';

import { useAppDispatch } from '../../../hooks/hooks';

import type { EDITOR_HEADER_PROPS } from '../../../types/editor';

export const EditorHeader = ({
  variables,
  // isInputFocused,
  setIsSplit,
  editor,
}: EDITOR_HEADER_PROPS): JSX.Element => {
  const dispatch = useAppDispatch();

  const onInsertVariable = (variable: string): void => {
    dispatch(setVariableIntoEditor(variable));
    insertVariable(editor, variable, { insertSpace: false });
  };

  // const onSplitEditor = (editor: Editor & ReactEditor): void => {
  //   const { selection } = editor;
  //   if (selection && Range.isCollapsed(selection)) {
  //     const [start] = Range.edges(selection);
  //     const path = start.path;
  //     Transforms.splitNodes(editor, { at: selection });
  //     Transforms.select(editor, Editor.start(editor, path));
  //     Transforms.insertNodes(editor, {
  //       type: 'paragraph',
  //       character: '',
  //       children: [{ text: '' }],
  //     });
  //     Transforms.move(editor);
  //   }
  // };

  const onSplitEditor = (): void => {
    setIsSplit(true);
    const { selection } = editor;

    if (selection) {
      // Get the point after the cursor
      const pointAfterCursor = Editor.after(editor, selection.focus);

      // Set the value after the cursor to a variable
      if (pointAfterCursor !== undefined) {
        const valueAfterCursor = Editor.string(editor, {
          anchor: {
            path: pointAfterCursor.path,
            offset: pointAfterCursor.offset - 1,
          },
          focus: Editor.end(editor, []),
        });

        if (valueAfterCursor) {
          // Delete the content after the cursor
          Transforms.delete(editor, {
            at: selection,
            distance: 1,
            unit: 'line',
          });
        }
        // eslint-disable-next-line no-debugger
        // debugger;
        dispatch(setSplitValue(valueAfterCursor));
        console.log('valueAfterCursor =>', valueAfterCursor);
      }
    }
  };

  return (
    <div className="editor-header">
      <div className="editor-header__variables">
        Variables:
        {variables.map(item => (
          <Button
            key={item}
            content={item}
            variant="small"
            onClick={(): void => onInsertVariable(item)}
          />
        ))}
      </div>
      <div>
        <Button
          content="Add IF|THEN|ELSE"
          onClick={(): void => onSplitEditor()}
          // disabled={!isInputFocused}
        />
      </div>
    </div>
  );
};
