import { createSlice } from '@reduxjs/toolkit';

import type { INITIAL_STATE_PROPS } from '../../types/ui-slice';

export const UiSlice = createSlice({
  name: 'ui',
  initialState: { isVisibleEditor: true, variables: [], splitValue: '' },
  reducers: {
    setIsVisibleEditor: (state, { payload }) => {
      state.isVisibleEditor = payload;
    },
    setVariableIntoEditor: (state: INITIAL_STATE_PROPS, { payload }) => {
      if (!state.variables.includes(payload)) {
        state.variables.push(payload);
      }
    },
    setSplitValue: (state: INITIAL_STATE_PROPS, { payload }) => {
      state.splitValue = payload;
    },
  },
  extraReducers: {},
});

export const selectorVisibleEditor = (state: {
  ui: INITIAL_STATE_PROPS;
}): boolean => state.ui.isVisibleEditor;
export const selectorVariableNames = (state: {
  ui: INITIAL_STATE_PROPS;
}): string[] => state.ui.variables;
export const selectorSplitValue = (state: {
  ui: INITIAL_STATE_PROPS;
}): string => state.ui.splitValue;

export const { setIsVisibleEditor, setVariableIntoEditor, setSplitValue } =
  UiSlice.actions;

export default UiSlice.reducer;
