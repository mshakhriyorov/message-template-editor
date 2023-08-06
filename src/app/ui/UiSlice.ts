import { createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE_PROPS = {
  isVisibleEditor: boolean;
};

export const UiSlice = createSlice({
  name: 'ui',
  initialState: { isVisibleEditor: true },
  reducers: {
    setIsVisibleEditor: (state, { payload }) => {
      state.isVisibleEditor = payload;
    },
  },
  extraReducers: {},
});

export const selectorVisibleEditor = (state: {
  ui: INITIAL_STATE_PROPS;
}): boolean => state.ui.isVisibleEditor;

export const { setIsVisibleEditor } = UiSlice.actions;

export default UiSlice.reducer;
