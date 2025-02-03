import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  saveEmailShown: false,
};

const cartProductSaveEmailSlice = createSlice({
  name: 'saveEmail',
  initialState,
  reducers: {
    setSaveEmailShown: (state) => {
      state.saveEmailShown = true;
    },
  },
});

export default cartProductSaveEmailSlice.reducer;
export const {setSaveEmailShown } = cartProductSaveEmailSlice.actions;