import React from "react";
import { useState, useEffect } from "react";
import {
	Card,
	Col,
	Row,
	Image,
	InputGroup,
	Form,
	Button,
	Container,
	Badge,
} from "react-bootstrap";
import axios from "axios";

const Home = () => {
	const [coinData, setCoinData] = useState([]);
	const [search, setSearch] = useState("");

	const fetchData = () => {
		axios.get("http://localhost:5001/api/coins").then((response) => {
			setCoinData(response.data.coins);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const getFilteredCoins = (search, coins) => {
		if (!search) {
			return coins;
		}
		return coins.filter((coin) =>
			coin.name.toLowerCase().includes(search.toLowerCase())
		);
	};

	const filteredCoins = getFilteredCoins(search, coinData);

	return (
		<div style={{ marginTop: "5%" }}>
			<Container style={{ width: "300px" }}>
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="search by currency name"
						aria-label="search by currency name"
						aria-describedby=""
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</InputGroup>
			</Container>
			<div style={{ marginTop: "5%" }}>
				<Row xs={1} md={4} className="g-4">
					{filteredCoins.map((coin, idx) => (
						<Col key={idx} md={{ offset: 1 }}>
							<Card bg="info" style={{ width: "20rem" }}>
								<Card.Header className="text-center">
									<Card.Title className="text-center">
										{coin.name}
									</Card.Title>
								</Card.Header>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Image
										src={coin.image}
										roundedCircle
										style={{
											height: "50%",
											width: "50%",
											marginTop: "10px",
										}}
									/>
								</div>
								<Card.Body>
									<Card.Text>
										<h5>
											Price:{" "}
											<Badge
												bg={
													coin.price_change_24h < 0
														? "danger"
														: "success"
												}
											>
												$ {coin.current_price}
											</Badge>
										</h5>
									</Card.Text>
									<Card.Text>
										<h5>
											Market Cap: ${" "}
											<Badge bg="primary">
												$ {coin.market_cap}
											</Badge>
										</h5>
									</Card.Text>
									<Card.Text>
										<h5>
											Market Cap: ${" "}
											<Badge bg="primary">
												$ {coin.market_cap}
											</Badge>
										</h5>
									</Card.Text>
									<Card.Text>
										<h5>Price: </h5>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Home;
