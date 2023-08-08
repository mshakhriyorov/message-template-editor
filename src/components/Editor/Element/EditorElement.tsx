import React from 'react';

import './EditorElement.scss';

import type { EDITOR_PROPS } from '../../../types/editor';

export const EditorElement = ({
  children,
  element,
  attributes,
}: EDITOR_PROPS): JSX.Element => {
  if (element.type === 'variable') {
    return (
      <span {...attributes}>
        <span
          className="editor-element__variable"
          contentEditable="false"
          suppressContentEditableWarning={true}
        >
          {element.character}
        </span>
        {children}
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
};
