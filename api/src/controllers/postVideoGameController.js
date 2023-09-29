require("dotenv").config();
const { Videogame, Genre } = require("../db");

const postVideoGamesController = async (
	name,
	description,
	platforms,
	image,
	released,
	rating,
	source_by,
	genres
) => {
	const [videoGame, created] = await Videogame.findOrCreate({
		where: { name: name },
		defaults: {
			description: description,
			platforms: platforms,
			image: image,
			released: released,
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
	return { message: "Game created succesfully" };
};

module.exports = {
	postVideoGamesController,
};
