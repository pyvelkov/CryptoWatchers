const express = require("express");
const router = express.Router();

const coins = require("../model/getCoins");

router.get("/", async (req, res) => {
	// calling model function
	const allCoins = await coins.getCoins();

	// return model response
	res.send({ coins: allCoins });
});

module.exports = router;
