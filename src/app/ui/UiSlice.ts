import { createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE_PROPS = {
  isVisibleEditor: boolean;
  variables: string[];
};

export const UiSlice = createSlice({
  name: 'ui',
  initialState: { isVisibleEditor: true, variables: [] },
  reducers: {
    setIsVisibleEditor: (state, { payload }) => {
      state.isVisibleEditor = payload;
    },
    setVariableIntoEditor: (state: INITIAL_STATE_PROPS, { payload }) => {
      if (!state.variables.includes(payload)) {
        state.variables.push(payload);
      }
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

export const { setIsVisibleEditor, setVariableIntoEditor } = UiSlice.actions;

export default UiSlice.reducer;
