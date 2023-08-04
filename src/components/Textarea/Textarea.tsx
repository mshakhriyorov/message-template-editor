import React, { useRef, useState } from 'react';

import { useAutosizeTextarea } from '../../hooks/useAutosizeTextarea';

export const Textarea = (): JSX.Element => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const val = evt.target.value;

    setValue(val);
  };

  return (
    <div className="App">
      <label htmlFor="review-text">Review:</label>
      <textarea
        id="review-text"
        onChange={handleChange}
        placeholder="What did you like or dislike?"
        ref={textAreaRef}
        rows={1}
        value={value}
      />
    </div>
  );
};
