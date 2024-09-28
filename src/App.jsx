import React from "react";
import Navbar from "./components/Navbar";
import './styles/App.scss';

const App = () => {
	return (
		<>
			<Navbar />
			<div className="landing-page">
				<h1>Welcome to the Cinque Card Game!</h1>
				<p>This is a description</p>
			</div>
		</>
	);
};

export default App;
