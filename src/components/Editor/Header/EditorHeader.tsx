import React from 'react';

import './EditorHeader.scss';

import { Button } from '../../Button';

type PROPS = {
  variables: string[];
  isInputFocused: boolean;
};

export const EditorHeader = ({
  variables,
  isInputFocused,
}: PROPS): JSX.Element => (
  <div className="editor-header">
    <div className="editor-header__variables">
      Variables:
      {variables.map(item => (
        <Button key={item} content={item} variant="variable" />
      ))}
    </div>
    <div>
      <Button content="Add IF|THEN|ELSE" disabled={!isInputFocused} />
    </div>
  </div>
);
