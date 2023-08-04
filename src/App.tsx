import React from 'react';
import { Route, Routes } from 'react-router';

import './App.scss';

import { Card } from './components/Card';

import { routePaths } from './utils/routePaths';

export const App: React.FC = () => (
  <div className="app">
    <Routes>
      <Route path={routePaths.home()} element={<Card />} />
    </Routes>
  </div>
);
