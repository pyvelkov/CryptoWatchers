import React from "react";
import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	axios.defaults.withCredentials = true;

	const register = () => {
		try {
			axios.post("http://localhost:5001/signup", {
				username: username,
				password: password,
				email: email,
			});
		} catch (err) {
			console.log(err);
		}
		// .finally((res) => {});
		navigate("/");
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
										Crypto Watchers SignUp
									</h2>
									<p className=" mb-5">
										Enter username, email and password to
										Register!
									</p>
									<div className="mb-3">
										{/* <Form> */}
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
											controlId="formBasicEmail"
										>
											<Form.Label className="text-center">
												Email
											</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter email"
												onChange={(e) => {
													setEmail(e.target.value);
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
												onClick={register}
											>
												Signup
											</Button>
										</div>
										{/* </Form> */}
										<div className="mt-3">
											<p className="mb-0  text-center">
												Already have an account?{" "}
												<a
													href="/"
													className="text-primary fw-bold"
												>
													Login
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

export default SignUp;
