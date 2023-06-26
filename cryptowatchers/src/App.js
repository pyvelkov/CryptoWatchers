import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
import AuthApi from "./components/authorization/AuthApi";
import Routing from "./components/authorization/Routing";

function App() {
	const [loginStatus, setLoginStatus] = useState(false);

	useEffect(() => {
		Axios.get("http://localhost:5001/login").then((response) => {
			setLoginStatus(response.data.loggedIn);
		});
	}, []);
	return (
		<AuthApi.Provider value={{ loginStatus, setLoginStatus }}>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</AuthApi.Provider>
	);
}

export default App;
