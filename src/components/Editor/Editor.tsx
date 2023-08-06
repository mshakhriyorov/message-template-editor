import React, { useState } from 'react';

import './Editor.scss';

import { EditorHeader } from './Header';
import { EditorInput } from './Input';

const VARIABLES = ['{firstName}', '{lastName}', '{company}', '{position}'];

export const Editor = (): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="editor">
      <div className="editor__header">Message Template Editor</div>
      <EditorHeader variables={VARIABLES} isInputFocused={isFocused} />
      <EditorInput setIsFocused={setIsFocused} />
    </div>
  );
};
