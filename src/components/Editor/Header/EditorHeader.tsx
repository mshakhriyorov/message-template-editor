import React from 'react';
import type { Editor } from 'slate';

import './EditorHeader.scss';

import { Button } from '../../Button';

import { setVariableIntoEditor } from '../../../app/ui/UiSlice';

import { insertVariable } from '../../../utils/insertVariable';

import { useAppDispatch } from '../../../hooks/hooks';

type PROPS = {
  variables: string[];
  isInputFocused: boolean;
  editor: Editor;
};

export const EditorHeader = ({
  variables,
  isInputFocused,
  editor,
}: PROPS): JSX.Element => {
  const dispatch = useAppDispatch();

  const onInsertVariable = (variable: string): void => {
    dispatch(setVariableIntoEditor(variable));
    insertVariable(editor, variable, { insertSpace: false });
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
        <Button content="Add IF|THEN|ELSE" disabled={!isInputFocused} />
      </div>
    </div>
  );
};
