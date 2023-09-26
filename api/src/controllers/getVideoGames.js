require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;

const getVideoGames = async (req, res) => {
	try {
		const { data } = await axios(`${BASE_URL}games?key=${apiKey}`);
		const { results } = data;
		// console.log(`${BASE_URL}games?key=${apiKey}`);
		return res.status(200).json({ results });
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

module.exports = {
	getVideoGames,
};
