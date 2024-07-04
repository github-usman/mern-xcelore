import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: '',
    body: '',
    onConfirm: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.onConfirm = action.payload.onConfirm;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.body = '';
      state.onConfirm = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
