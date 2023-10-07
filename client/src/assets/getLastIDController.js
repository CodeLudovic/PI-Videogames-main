// require("dotenv").config();
// const axios = require("axios");
// const { BASE_URL } = require("../../../api/src/utils/data");
// const apiKey = process.env.API_KEY;
// const { Videogame, Genre, conn } = require("../../../api/src/db");

// const getLastIDController = async () => {
// 	try {
// 		// Realiza la consulta para obtener el último ID
// 		const result = await Videogame.findOne({
// 			attributes: [[conn.fn("max", conn.col("id")), "lastId"]],
// 		});

// 		// El resultado 'lastId' contendrá el último ID generado en la tabla
// 		let lastId = result.get("lastId");
// 		if (lastId === null || lastId === undefined) {
// 			lastId = 900001;
// 		}
// 		return lastId;
// 	} catch (error) {
// 		console.error("Error:", error);
// 	}
// };

// module.exports = {
// 	getLastIDController,
// };
