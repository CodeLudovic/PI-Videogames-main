require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getVideoGamesByName = async (req, res) => {
	const name = req.query.search;
	const named = name.toLowerCase();
	console.log(named);
	try {
		const apiResponse = await axios(
			`${BASE_URL}games?search=${named}&key=${apiKey}&page_size=15`
		);

		const dbResults = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `${named}`,
				},
			},
			limit: 15,
		});

		const combinedResults = [...apiResponse.data.results, ...dbResults];

		if (combinedResults.length > 0) {
			return res.status(200).json({ results: combinedResults });
		} else {
			return res
				.status(404)
				.json({ message: "No se encontraron videojuegos con ese nombre." });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error interno del servidor." });
	}
};

module.exports = {
	getVideoGamesByName,
};
