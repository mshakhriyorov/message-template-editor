import React from 'react';

import './EditorHeader.scss';

import { Button } from '../../Button';

import { setVariableIntoEditor } from '../../../app/ui/UiSlice';

// import { insertVariable } from '../../../utils/insertVariable';

import { useAppDispatch } from '../../../hooks/hooks';

import type { EDITOR_HEADER_PROPS } from '../../../types/editor';

export const EditorHeader = ({
  variables,
}: EDITOR_HEADER_PROPS): JSX.Element => {
  const dispatch = useAppDispatch();

  const onInsertVariable = (variable: string): void => {
    dispatch(setVariableIntoEditor(variable));
    // insertVariable(editor, variable, { insertSpace: false });
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
    </div>
  );
};
