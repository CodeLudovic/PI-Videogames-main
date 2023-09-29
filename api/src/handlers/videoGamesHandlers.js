require("dotenv").config();
const apiKey = process.env.API_KEY;
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
	let vgs = await Videogame.findAll();
	const { page } = req.query;
	try {
		const response = await getVideoGamesController(page);
		let allData = [...response, ...vgs];
		return res.status(200).json(allData);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const postVideoGamesHandler = async (req, res) => {
	const { name, description, platforms, image, released, rating, genres } =
		req.body;
	const source_by = "DB";
	if (
		(!name || !description || !platforms || !image,
		!released || !rating || !genres)
	) {
		return res.status(403).json({ message: "Lack of Data" });
	}
	try {
		const response = await postVideoGamesController(
			name,
			description,
			platforms,
			image,
			released,
			rating,
			source_by,
			genres
		);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const getGenresHandler = async (req, res) => {
	try {
		const response = await getGenresController();
		return res.status(200).json(response);
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

module.exports = {
	videoGamesHandler,
	videoGamesByIDHandler,
	getVideoGamesHandler,
	postVideoGamesHandler,
	getGenresHandler,
	videoGamesByBDHandler,
};
