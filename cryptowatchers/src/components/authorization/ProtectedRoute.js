import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, component }) => {
	return auth ? <div>{component}</div> : <Navigate to="/" />;
};

export default ProtectedRoute;
