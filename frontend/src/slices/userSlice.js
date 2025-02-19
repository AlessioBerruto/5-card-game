import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {
		name: "",
		email: "",
		playerId: "",
		password: "",
		profileImage: "",
		isSubscribedToNewsletter: false,
		registrationGoalUnlocked: false,
		isLoggedIn: false,
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
			state.userData = { ...initialState.userData };
		},
		updateUser: (state, action) => {
			state.userData = { ...state.userData, ...action.payload };
		},
		updateProfileImage: (state, action) => {
			state.userData.profileImage = action.payload;
		},
		deleteUser: (state) => {
			state.userData = { ...initialState.userData };
		},
		setSubscriptionStatus: (state, action) => {
			state.userData.isSubscribedToNewsletter = action.payload;
		},
		setRegistrationGoalUnlocked: (state, action) => {
			state.userData.registrationGoalUnlocked = action.payload;
		},
		setIsLoggedIn: (state, action) => {
			state.userData.isLoggedIn = action.payload;
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
	setRegistrationGoalUnlocked,
	setIsLoggedIn,
} = userSlice.actions;
export default userSlice.reducer;
