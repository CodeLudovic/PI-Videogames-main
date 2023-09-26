require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesByID = async (req, res) => {
	const { idVideogame } = req.params;

	try {
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
			return res.status(200).json(videoGameFromDB);
		}

		const { data } = await axios(
			`${BASE_URL}games/${idVideogame}?key=${apiKey}`
		);

		const apiVideoGame = data;
		if (!apiVideoGame) {
			return res.status(404).json({ message: "Video game not found" });
		}

		return res.status(200).json(apiVideoGame);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getVideoGamesByID,
};
