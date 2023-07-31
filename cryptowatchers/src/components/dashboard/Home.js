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
import defaultData from "../../assets/coinData";

const Home = () => {
	const [coinData, setCoinData] = useState([]);
	const [search, setSearch] = useState("");
	const [userCoins, setUserCoins] = useState("");

	const getUserCoins = () => {
		axios.get("http://localhost:5001/userCoins").then((response) => {
			setUserCoins(response.data.userCoin);
		});
	};
	const checkCoin = (coin) => {
		let color = "danger";
		if (userCoins.includes(coin)) {
			color = "danger";
		} else {
			color = "primary";
		}
		return color;
	};

	const fetchData = () => {
		axios.get("http://localhost:5001/api/coins").then((response) => {
			setCoinData(response.data.coins);
		});
		// setCoinData(defaultData);
	};

	useEffect(() => {
		fetchData();
		getUserCoins();
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

	const addCoin = (coinName) => {
		axios
			.post("http://localhost:5001/addFavorite", { addedCoin: coinName })
			.then((response) => {
				if (response.data.message) {
					alert(response.data.message);
				}
			});
	};

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
			<Container>
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
														coin.price_change_24h <
														0
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
												Market Cap:
												<Badge bg="primary">
													$ {coin.market_cap}
												</Badge>
											</h5>
										</Card.Text>
										<Card.Text>
											<h5>
												Price Change 24h:
												<Badge
													bg={
														coin.price_change_24h <
														0
															? "danger"
															: "success"
													}
												>
													${" "}
													{coin.price_change_24h.toFixed(
														2
													)}
												</Badge>
											</h5>
										</Card.Text>
										<Card.Text>
											<h5>
												Market Cap Rank:
												<Badge bg="primary">
													{coin.market_cap_rank}
												</Badge>
											</h5>
										</Card.Text>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Button
												variant={checkCoin(coin.name)}
												onClick={() => {
													addCoin(coin.name);
													getUserCoins();
												}}
											>
												{userCoins.includes(coin.name)
													? "Remove from Watchlist"
													: "⭐ Add to watchlist ⭐"}
											</Button>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default Home;
