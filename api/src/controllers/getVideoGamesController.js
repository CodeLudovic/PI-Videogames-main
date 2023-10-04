require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesController = async () => {
	try {
		//Realiza las solicitudes a la API externa para obtener los resultados
		const apiResults = [];

		for (let i = 0; i < 3; i++) {
			const response = await axios.get(
				`${BASE_URL}games?key=${apiKey}&page_size=40&page=${i + 1}`
			);
			apiResults.push(...response.data.results);
		}

		await axios.get(`http://localhost:3001/genres`);

		const apiResultsWithSource = apiResults.map((game) => ({
			...game,
			source_by: "Api",
		}));

		//Obtiene los datos de mi base de datos local
		const dbData = await Videogame.findAll({
			include: Genre,
		});

		const formattedDbData = dbData.map((videojuego) => {
			const formattedVideojuego = { ...videojuego.toJSON() };

			if (formattedVideojuego.Genres) {
				formattedVideojuego.genres = formattedVideojuego.Genres;
				delete formattedVideojuego.Genres;
			}

			return formattedVideojuego;
		});

		// Combina los resultados de la API externa con los datos de mi base de datos local
		const combinedData = [...apiResultsWithSource, ...formattedDbData];

		// Elimina elementos duplicados usando un Set
		const uniqueData = [...new Set(combinedData)];

		// Devuelve los datos únicos como resultado
		return uniqueData;
	} catch (error) {
		console.error("Error en la función getVideoGamesController:", error);
		throw error;
	}
};

module.exports = {
	getVideoGamesController,
};
