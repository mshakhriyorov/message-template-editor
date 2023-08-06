import { configureStore } from '@reduxjs/toolkit';

import UiReducer from './ui/UiSlice';

export const store = configureStore({
  reducer: {
    ui: UiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
