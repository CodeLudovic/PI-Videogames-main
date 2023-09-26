require("dotenv").config();
const { Videogame, Genre } = require("../db");

const postVideoGames = async (req, res) => {
	try {
		const { name, description, platforms, image, released, rating, genres } =
			req.body;
		const newVideoGame = {
			name,
			description,
			platforms,
			image,
			released,
			rating,
			genres,
		};
		// console.log(newVideoGame);
		if (
			(!name || !description || !platforms || !image,
			!released || !rating || !genres)
		) {
			return res.status(404).json({ message: "Lack of data" });
		}

		const [videoGame, created] = await Videogame.findOrCreate({
			where: { name: newVideoGame.name },
			defaults: {
				description: newVideoGame.description,
				platforms: newVideoGame.platforms,
				image: newVideoGame.image,
				released: newVideoGame.released,
				rating: newVideoGame.rating,
			},
		});

		if (!created) {
			return res.status(200).json({ message: "The videogame already exist" });
		}

		for (const genreName of newVideoGame.genres) {
			const [genre] = await Genre.findOrCreate({
				where: { name: genreName },
			});
			await videoGame.addGenres(genre);
		}
		return res.status(200).json({ message: "Game created succesfully" });
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

module.exports = {
	postVideoGames,
};
