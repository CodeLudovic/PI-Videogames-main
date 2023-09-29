require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame } = require("../db");

const getVideoGamesController = async (page = 1) => {
	const { data } = await axios(
		`${BASE_URL}games?key=${apiKey}&page_size=40&page=${page}`
	);
	const { results } = data;
	await axios("http://localhost:3001/genres");

	// Agregar la propiedad "source_by" con el valor "Api" a cada objeto
	const resultsWithSource = results.map((game) => ({
		...game,
		source_by: "Api",
	}));

	return resultsWithSource;
};

module.exports = {
	getVideoGamesController,
};
