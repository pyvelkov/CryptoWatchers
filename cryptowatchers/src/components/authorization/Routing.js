import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import AuthApi from "./AuthApi";
import ProtectedLogin from "./ProtectedLogin";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../login/Signup";
import Dashboard from "../Dashboard";

const Routing = () => {
	const Auth = React.useContext(AuthApi);
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedLogin
						auth={Auth.loginStatus}
						component={<Login />}
					/>
				}
			/>
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/Home"
				element={
					<ProtectedRoute
						auth={Auth.loginStatus}
						component={<Dashboard />}
					/>
				}
			/>
		</Routes>
	);
};

export default Routing;
