import { useEffect } from 'react';

export const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
): void => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      const textArea = textAreaRef;
      textArea.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textArea.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};
