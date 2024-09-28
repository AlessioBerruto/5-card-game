
import { configureStore } from '@reduxjs/toolkit';
import yourSlice from './slices/yourSlice'; 

const store = configureStore({
  reducer: {
    yourSlice: yourSlice,
  },
});

export default store;
