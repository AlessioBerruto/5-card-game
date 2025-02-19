import React from "react";
import { useSelector } from "react-redux";
import "./Loader.scss";

const Loader = () => {
	const isLoading = useSelector((state) => state.loading.isLoading);

	if (!isLoading) return null;

	return (
		<div className="loader-overlay">
			<div className="loader">Loading...</div>
		</div>
	);
};

export default Loader;
