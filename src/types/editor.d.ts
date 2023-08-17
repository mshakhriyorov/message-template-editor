import type { Editor } from 'slate';

export type EDITOR_PROPS = {
  id: string;
  text: string;
  insertText: { id: string; text: string[] };
  onClearInsertArr: () => void;
  setInCursorInputId: (id: string) => void;
};

export type EDITOR_HEADER_PROPS = {
  variables: string[];
  isInputFocused: boolean;
  editor: Editor;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
};
