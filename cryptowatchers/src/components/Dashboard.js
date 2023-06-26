import axios from "axios";
import React from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import AuthApi from "./authorization/AuthApi";

const Dashboard = () => {
	axios.defaults.withCredentials = true;
	const Auth = React.useContext(AuthApi);
	return (
		<div className="loginPage">
			<Navbar bg="primary" data-bs-theme="dark">
				<Container>
					<Row>
						<Col md={{ span: 1 }}>
							<Navbar.Brand href="#home">
								Crypto Watchers
							</Navbar.Brand>
						</Col>
						<Col md={{ span: 1, offset: 4 }}>
							<Nav className="me-auto">
								<Nav.Link href="#home">Home</Nav.Link>
								<Nav.Link href="#features">Profile</Nav.Link>
							</Nav>
						</Col>
						<Col md={{ span: 1, offset: 5 }}>
							<Button
								variant="danger"
								onClick={() => {
									axios
										.post("http://localhost:5001/logout", {
											data: "logout",
										})
										.then((resp) => {
											Auth.setLoginStatus(false);
										});
								}}
							>
								Logout
							</Button>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</div>
	);
};

export default Dashboard;
