// src/slices/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState: {
    // Stato iniziale
  },
  reducers: {
    // Aggiungi i tuoi reducers qui
  },
});

export const { /* esporta i tuoi action creators qui */ } = yourSlice.actions;
export default yourSlice.reducer;
