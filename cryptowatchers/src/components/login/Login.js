import React from "react";
import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import AuthApi from "../authorization/AuthApi";

const Login = () => {
	axios.defaults.withCredentials = true;
	const Auth = React.useContext(AuthApi);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");

	const login = (data) => {
		axios
			.post("http://localhost:5001/login", {
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.data.message) {
					alert(response.data.message);
				} else {
					setLoginStatus(response.data.username);
					Auth.setLoginStatus(true);
				}
			});
	};
	return (
		<div className="loginPage">
			<Container>
				<Row className="vh-100 d-flex justify-content-center align-items-center">
					<Col md={8} lg={6} xs={12}>
						<div className="border border-3 border-primary"></div>
						<Card className="shadow">
							<Card.Body>
								<div className="mb-3 mt-md-4">
									<h2 className="fw-bold mb-2 text-uppercase ">
										Crypto Watchers
									</h2>
									<p className=" mb-5">
										Please enter your username and password!
									</p>
									<div className="mb-3">
										{/* <Form onSubmit={login}> */}
										<Form.Group
											className="mb-3"
											controlId="formBasicUsername"
										>
											<Form.Label className="text-center">
												Username
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter username"
												onChange={(e) => {
													setUsername(e.target.value);
												}}
											/>
										</Form.Group>

										<Form.Group
											className="mb-3"
											controlId="formBasicPassword"
										>
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												onChange={(e) => {
													setPassword(e.target.value);
												}}
											/>
										</Form.Group>

										<div className="d-grid">
											<Button
												variant="primary"
												// type="submit"
												onClick={login}
											>
												Login
											</Button>
										</div>
										{/* </Form> */}
										<div className="mt-3">
											<p className="mb-0  text-center">
												Don't have an account?{" "}
												<a
													href="/signup"
													className="text-primary fw-bold"
												>
													Sign Up
												</a>
											</p>
										</div>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
