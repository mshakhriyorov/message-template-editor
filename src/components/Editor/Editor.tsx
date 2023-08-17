import React, { useState } from 'react';

import './Editor.scss';

import { EditorDraft } from './Draft';

export const Editor = (): JSX.Element => {
  const [isCursorInputId, setInCursorInputId] = useState('');
  const [insertText, setInsertText] = useState({
    id: isCursorInputId,
    text: [],
  });

  return (
    <div className="editor">
      <div className="editor__header">Message Template Editor</div>
      {/* <EditorHeader
        variables={VARIABLES}
        isInputFocused={isFocused}
        editor={editor}
      /> */}

      <EditorDraft
        id={isCursorInputId}
        setInCursorInputId={setInCursorInputId}
        text=""
        insertText={insertText}
        onClearInsertArr={(): void => setInsertText({ id: '', text: [] })}
      />
    </div>
  );
};
