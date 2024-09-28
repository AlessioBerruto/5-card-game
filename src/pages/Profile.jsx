import React from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
	return (
		<>
			<Navbar />
			<div className="profile-page">
				<h1>User Profile</h1>
				<p>Here you can view and edit your personal information.</p>
			</div>
		</>
	);
};

export default Profile;
