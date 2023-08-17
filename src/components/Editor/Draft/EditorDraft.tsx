import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorState, convertFromRaw, Modifier } from 'draft-js';
import cn from 'classnames';

import './EditorDraft.scss';

import { Button } from '../../Button';

import type { EDITOR_PROPS } from '../../../types/editor';

export const EditorDraft: React.FC<EDITOR_PROPS> = ({
  id,
  text,
  insertText,
  onClearInsertArr,
  setInCursorInputId,
}): JSX.Element => {
  const editorRef = useRef<Editor>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHoveredInput, setIsHoveredInput] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: '',
            text,
            type: 'paragraph',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    ),
  );
  const [afterCursorValue, setAfterCursorValue] = useState('');
  const [showSplitEditors, setShowSplitEditors] = useState(false);
  const content = editorState.getCurrentContent();
  // const inputValue = content.getPlainText();
  const inputId = content.getFirstBlock().getKey();

  // console.log(isHoveredInput);

  const handleBlur = (): void => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleGetSplitValue = (): void => {
    setShowSplitEditors(true);

    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();
    const start = selectionState.getStartOffset();
    const end = blockText.length;
    const selectedText = blockText.slice(start, end);

    setAfterCursorValue(selectedText);

    // To delete the text after the cursor
    const newContentState = Modifier.removeRange(
      currentContent,
      selectionState.merge({
        anchorOffset: start,
        focusOffset: end,
        isBackward: false,
      }),
      'backward',
    );
    setEditorState(
      EditorState.push(editorState, newContentState, 'remove-range'),
    );
  };

  const focusEditor = (): void => {
    editorRef.current?.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(() => {
    if (insertText.id === id && insertText.text.length > 0) {
      let newEditorState = editorState;
      insertText.text.forEach(item => {
        const selectionState = newEditorState.getSelection();
        const contentState = newEditorState.getCurrentContent();
        const contentStateWithEntity = Modifier.insertText(
          contentState,
          selectionState,
          item,
        );
        newEditorState = EditorState.push(
          newEditorState,
          contentStateWithEntity,
          'insert-characters',
        );
      });
      setEditorState(newEditorState);
      onClearInsertArr();
    }
  }, [insertText, id, editorState, onClearInsertArr]);

  return (
    <div className="editor-draft">
      <div
        className={cn('editor-draft__container', {
          'editor-draft__container--focus': isFocused,
        })}
        onMouseEnter={(): void => setIsHoveredInput(true)}
        onMouseLeave={(): void => setIsHoveredInput(false)}
      >
        <Editor
          ref={editorRef}
          placeholder="Optional text"
          editorState={editorState}
          onFocus={(): void => {
            setIsFocused(true);
            setInCursorInputId(inputId);
          }}
          onBlur={handleBlur}
          onChange={(editorState: EditorState): void => {
            setEditorState(editorState);
          }}
        />
        <div
          className={cn('editor-draft__container-button', {
            'editor-draft__container-button--visible':
              isFocused && isHoveredInput,
          })}
        >
          <Button content="Add IF|THEN|ELSE" onClick={handleGetSplitValue} />
        </div>
      </div>

      {showSplitEditors && (
        <>
          <EditorDraft
            id={id}
            text=""
            setInCursorInputId={setInCursorInputId}
            insertText={insertText}
            onClearInsertArr={onClearInsertArr}
          />
          <EditorDraft
            id={id}
            text={afterCursorValue}
            setInCursorInputId={setInCursorInputId}
            insertText={insertText}
            onClearInsertArr={onClearInsertArr}
          />
        </>
      )}
    </div>
  );
};
