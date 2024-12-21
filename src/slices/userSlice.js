import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {
		name: "",
		email: "",
		password: "",
		profileImage: "",
		isSubscribedToNewsletter: false,
		achievements: [],
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
		updateAchievements: (state, action) => {
			state.userData.achievements = action.payload; 
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
	updateAchievements,
} = userSlice.actions;
export default userSlice.reducer;
