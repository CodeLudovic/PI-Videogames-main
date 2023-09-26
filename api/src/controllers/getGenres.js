require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getGenres = async (req, res) => {
	try {
		const genresInDB = await Genre.findAll();

		if (genresInDB.length === 0) {
			const { data } = await axios(`${BASE_URL}genres?key=${apiKey}`);
			for (const gen of data.results) {
				await Genre.findOrCreate({
					where: { id: gen.id },
					defaults: {
						name: gen.name,
					},
				});
			}
		}
		const genres = await Genre.findAll();
		return res.status(200).json({ genres });
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

module.exports = {
	getGenres,
};
