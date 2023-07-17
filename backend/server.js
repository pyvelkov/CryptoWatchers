const cors = require("cors");
const express = require("express");
require("dotenv").config();

//connection client
//making the client require the export we ensure that there will always only be one (single) instance of the connection
const redisDB = require("./connection");
client = new redisDB().client;
//connect to redis cloud db
client.connect();

// session/cookie middleware
const cookieParser = require("cookie-parser");
const session = require("express-session");

//express backend setup
const app = express();
var bodyParser = require("body-parser");

//encryption setup
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const coins = require("./controllers/coins");

app.use(
	session({
		key: "sessionAuth",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 1000 * 60,
		},
	})
);

app.use("/api/coins", coins);

const user = {
	users: [
		{
			email: "init@hotmail.com",
			username: "init",
			password: "123",
			favorited: ["btc", "link"],
		},
	],
};

const initDB = async () => {
	let dbExists = await client.exists("userStorage");
	if (dbExists === 0) {
		try {
			await client.json.set("userStorage", ".", user);
		} catch (err) {
			console.log("couldnt write: ", err);
		}
	}
};
initDB();

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

app.post("/login", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	data = await client.json.get("userStorage");
	// console.log(data.users.length);
	for (let i = 0; i < data.users.length; i++) {
		if (data.users[i].username == username) {
			bcrypt.compare(
				password,
				data.users[i].password,
				(err, response) => {
					// console.log(response);
					if (response) {
						req.session.user = data.users[i];
						res.send(data.users[i]);
					} else {
						res.send({ message: "Wrong username/password!" });
					}
				}
			);
			break;
		} else {
			res.send({ message: "User does not exist!" });
		}
	}
});

app.post("/signup", (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, async (EncryptErr, hash) => {
		if (EncryptErr) {
			console.error(EncryptErr);
		} else {
			const data = {
				email: email,
				username: username,
				password: hash,
				favorited: [],
			};
			await client.json.arrInsert("userStorage", "$.users", 0, data);
		}
	});
});

app.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.redirect("/Home");
		}
	});
	res.clearCookie("sessionAuth");
	res.redirect("/");
});

// let coinData;
// const fetchData = async () => {
// 	await fetch(
// 		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
// 	)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			coinData = json;
// 			// console.log(coinData);
// 		});
// };
// fetchData();

// app.get("/coinData", (req, res) => {
// 	res.send({ data: coinData });
// });

const port = 5001;
app.listen(port, () => {
	console.log(`server listening at port ${port}`);
});

// const test = {
// 	email: "plamen.velkov@hotmail.com",
// 	username: "gurx",
// 	password: "123",
// };

// console.log(client.get("userStorage"));

// client.sAdd("users", JSON.stringify(user));
// console.log(client.sMembers("users"));
