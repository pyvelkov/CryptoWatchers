import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedLogin = ({ auth, component }) => {
	return !auth ? <div>{component}</div> : <Navigate to="/Home" />;
};

export default ProtectedLogin;
