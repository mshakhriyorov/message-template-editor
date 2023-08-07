import React from 'react';

type PROPS = {
  children: string;
  element: { type: 'variable' | 'paragraph'; character: string };
  attributes: React.HTMLAttributes<HTMLElement>;
};

export const EditorElement = ({
  children,
  element,
  attributes,
}: PROPS): JSX.Element => {
  if (element.type === 'variable') {
    return (
      <span {...attributes}>
        {element.character} {children}
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
};
