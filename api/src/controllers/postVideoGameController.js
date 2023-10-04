require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");

const postVideoGamesController = async (
	id,
	name,
	description,
	platforms,
	image,
	release,
	rating,
	source_by,
	genres
) => {
	const [videoGame, created] = await Videogame.findOrCreate({
		where: { name: name },
		defaults: {
			id: id,
			description: description,
			platforms: platforms,
			image: image,
			released: release,
			rating: rating,
			source_by: source_by,
		},
	});

	if (!created) {
		return { message: "The videogame already exist" };
	}

	for (const genreName of genres) {
		const [genre] = await Genre.findOrCreate({
			where: { name: genreName },
		});
		await videoGame.addGenres(genre);
	}

	const allVg = await axios.get(`http://localhost:3001/videogames`);

	return allVg;
};

module.exports = {
	postVideoGamesController,
};
