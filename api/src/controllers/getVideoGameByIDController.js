require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesByIDController = async (idVideogame) => {
	const videoGameFromDB = await Videogame.findByPk(idVideogame, {
		include: [
			{
				model: Genre,
				through: "VideoGameGenre",
				attributes: ["name"],
			},
		],
	});

	if (videoGameFromDB) {
		return videoGameFromDB;
	}

	const { data } = await axios(`${BASE_URL}games/${idVideogame}?key=${apiKey}`);

	if (data) {
		return data;
	}

	return Error("Hubo un error");
};

module.exports = {
	getVideoGamesByIDController,
};
