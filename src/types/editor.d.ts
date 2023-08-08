import type { Editor } from 'slate';

export type EDITOR_PROPS = {
  children: string;
  element: { type: 'variable' | 'paragraph' | string; character: string };
  attributes: React.HTMLAttributes<HTMLElement>;
};

export type EDITOR_HEADER_PROPS = {
  variables: string[];
  isInputFocused: boolean;
  editor: Editor;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
};
