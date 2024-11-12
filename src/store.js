import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loading: loadingReducer,
  },
});

export default store; 
