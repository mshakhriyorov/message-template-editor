import React from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './App.scss';

import { Card } from './components/Card';
import { Editor } from './components/Editor';

import { selectorVisibleEditor } from './app/ui/UiSlice';

import { routePaths } from './utils/routePaths';

export const App: React.FC = () => {
  const isVisibleEditor = useSelector(selectorVisibleEditor);

  return (
    <div
      className={cn('app', {
        'app--overflow': isVisibleEditor,
      })}
    >
      <Routes>
        <Route path={routePaths.editor()} element={<Card />} />
        <Route path={routePaths.home()} element={<Editor />} />
      </Routes>
    </div>
  );
};
