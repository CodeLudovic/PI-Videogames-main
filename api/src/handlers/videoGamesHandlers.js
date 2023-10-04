require("dotenv").config();
const apiKey = process.env.API_KEY;
const axios = require("axios");
const { getGenresController } = require("../controllers/getGenresController");
const {
	getVideoGamesByIDController,
} = require("../controllers/getVideoGameByIDController");
const {
	getVideoGamesByNameController,
} = require("../controllers/getVideoGameByNameController");
const {
	getVideoGamesBDController,
} = require("../controllers/getVideoGamesBDController");
const {
	getVideoGamesController,
} = require("../controllers/getVideoGamesController");
const {
	postVideoGamesController,
} = require("../controllers/postVideoGameController");

const CircularJSON = require("circular-json");

const { Videogame } = require("../db");

const videoGamesHandler = async (req, res) => {
	const name = req.query.search;
	const named = name.toLowerCase();

	try {
		const response = await getVideoGamesByNameController(named, apiKey);
		if (response.length > 0) {
			return res.status(200).json({ results: response });
		} else {
			return res
				.status(404)
				.json({ message: "Not found games with that name" });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const videoGamesByIDHandler = async (req, res) => {
	const { idVideogame } = req.params;
	try {
		const response = await getVideoGamesByIDController(idVideogame);
		if (response) {
			return res.status(200).json(response);
		} else {
			return res.status(404).json({ message: "Game not found" });
		}
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

const getVideoGamesHandler = async (req, res) => {
	try {
		const response = await getVideoGamesController();
		return res.status(200).json(response);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const postVideoGamesHandler = async (req, res) => {
	const { id, name, description, platforms, image, release, rating, genres } =
		req.body;
	const source_by = "DB";
	console.log(id, name, description, platforms, image, release, rating, genres);
	if (
		(!name || !description || !platforms || !image,
		!release || !rating || !genres)
	) {
		return res.status(403).json({ message: "Lack of Data" });
	}

	try {
		await postVideoGamesController(
			id,
			name,
			description,
			platforms,
			image,
			release,
			rating,
			source_by,
			genres
		);
		const allVg = await axios.get(`http://localhost:3001/videogames`);

		//const serializedData = JSON.stringify(allVg);

		return res.status(200).json(allVg.data);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const getGenresHandler = async (req, res) => {
	try {
		const response = await getGenresController();
		return res.status(200).json({ response });
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const videoGamesByBDHandler = async (req, res) => {
	try {
		const response = await getVideoGamesBDController();
		if (response) {
			return res.status(200).json(response);
		} else {
			return res.status(404).json({ message: "Not founded games" });
		}
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

const getGenresForVideoGame = async (videoGameId) => {
	try {
		const videoGameFromDB = await Videogame.findByPk(videoGameId, {
			include: [
				{
					model: Genre,
					through: "VideoGameGenre",
					attributes: ["name"],
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
	videoGamesHandler,
	videoGamesByIDHandler,
	getVideoGamesHandler,
	postVideoGamesHandler,
	getGenresHandler,
	videoGamesByBDHandler,
	getGenresForVideoGame,
};
