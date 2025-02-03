import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  newsletterShown: false,
};

const newsletterModalSlice = createSlice({
  name: 'newsletterModal',
  initialState,
  reducers: {
    openNewsletterModal: (state) => {
      state.isOpen = true;
    },
    closeNewsletterModal: (state) => {
      state.isOpen = false;
    },
    setNewsletterShown: (state) => {
      state.newsletterShown = true;
    },
  },
});

export default newsletterModalSlice.reducer;
export const { openNewsletterModal, closeNewsletterModal, setNewsletterShown } = newsletterModalSlice.actions;