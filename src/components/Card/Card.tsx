import React from 'react';

import './Card.scss';

import { Button } from '../Button';

import { useAppDispatch } from '../../hooks/hooks';

import { setIsVisibleEditor } from '../../app/ui/UiSlice';

export const Card = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleOpenTemplateEditor = (): void => {
    dispatch(setIsVisibleEditor(true));
  };

  return (
    <div className="card">
      <div className="card__box">
        <div className="card__text">
          This is a test message template editor for LinkedIn. Feel free to
          click the button to continue
        </div>
        <Button
          content="Message Editor Template"
          onClick={handleOpenTemplateEditor}
        />
      </div>
    </div>
  );
};
