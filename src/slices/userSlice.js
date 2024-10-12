import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
        },
        updateUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload }; 
        },
        deleteUser: (state) => {
            state.userData = null; 
        },
    },
});

export const { setUserData, clearUserData, updateUser, deleteUser } = userSlice.actions; 
export default userSlice.reducer;
