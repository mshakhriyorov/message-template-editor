import React, { useState } from 'react';
import cn from 'classnames';

import './EditorInput.scss';

type PROPS = {
  setIsFocused: (value: boolean) => void;
};

export const EditorInput = ({ setIsFocused }: PROPS): JSX.Element => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;

    setValue(newValue);
  };

  return (
    <div className="editor-input">
      <input
        type="text"
        className={cn('editor-input__textarea', {
          ['editor-input__textarea--hasValue']: value,
        })}
        style={{ height: '12px' }}
        onChange={handleChange}
        onFocus={(): void => setIsFocused(true)}
        onBlur={(): void => setIsFocused(false)}
        placeholder="Optional text"
        value={value}
      />
    </div>
  );
};
