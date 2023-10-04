require("dotenv").config();
const apiKey = process.env.API_KEY;
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getVideoGamesByNameController = async (name, apiKey) => {
	const apiResponse = await axios(
		`${BASE_URL}games?search=${name}&key=${apiKey}&page_size=15`
	);
	const apiResults = apiResponse.data.results.map((game) => ({
		...game,
		source_by: "Api",
	}));

	const dbResults = await Videogame.findAll({
		where: {
			name: {
				[Op.iLike]: `${name}`,
			},
		},
		limit: 15,
	});

	const dbResponse = dbResults.map((game) => ({
		...game,
		source_by: "DB",
	}));

	const combinedResults = [...apiResults, ...dbResponse];

	return combinedResults;
};

module.exports = {
	getVideoGamesByNameController,
};
