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

		const apiResultsWithSource = apiResults.map((game) => ({
			...game,
			source_by: "Api",
		}));

		//Obtiene los datos de mi base de datos local
		const dbData = await Videogame.findAll();

		// Combina los resultados de la API externa con los datos de mi base de datos local
		const combinedData = [...apiResultsWithSource, ...dbData];

		// Elimina elementos duplicados usando un Set
		const uniqueData = [...new Set(combinedData)];

		await axios.get(`http://localhost:3001/genres`);

		const videoGamesWithGenres = await Promise.all(
			uniqueData.map(async (videoGame) => {
				if (videoGame.source_by === "DB") {
					// Aplicar géneros solo a videojuegos obtenidos de la base de datos local
					const genres = await getGenresForVideoGame(videoGame.id);
					const { _previousDataValues } = genres;
					return {
						...videoGame,
						_previousDataValues,
					};
				}

				// Para los videojuegos obtenidos de la API, mantenerlos sin géneros
				return videoGame;
			})
		);

		return videoGamesWithGenres;
	} catch (error) {
		console.error("Error en la función getVideoGamesController:", error);
		throw error;
	}
};

const getGenresForVideoGame = async (videoGameId) => {
	try {
		const videoGameFromDB = await Videogame.findByPk(videoGameId, {
			include: [
				{
					model: Genre,
					atr,
				},
			],
		});

		// Devuelve los géneros asociados a este videojuego
		return videoGameFromDB;
	} catch (error) {
		console.error("Error en getGenresForVideoGame:", error);
		throw error;
	}
};

module.exports = {
	getVideoGamesController,
};
