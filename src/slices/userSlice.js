import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {
		name: "",
		email: "",
		password: "",
		profileImage: "",
		isSubscribed: false,
	},
};

const userSlice = createSlice({
	name: "user",
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
		updateProfileImage: (state, action) => {
			state.userData.profileImage = action.payload;
		},
		deleteUser: (state) => {
			state.userData = null;
		},
		setSubscriptionStatus: (state, action) => {
			state.userData.isSubscribedToNewsletter = action.payload;
		},
	},
});

export const {
	setUserData,
	clearUserData,
	updateUser,
	updateProfileImage,
	deleteUser,
	setSubscriptionStatus,
} = userSlice.actions;
export default userSlice.reducer;