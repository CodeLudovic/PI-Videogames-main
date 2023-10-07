const { Router } = require("express");
const {
	videoGamesHandler,
	videoGamesByIDHandler,
	getVideoGamesHandler,
	postVideoGamesHandler,
	getGenresHandler,
	videoGamesByBDHandler,
	getLastIDHandler,
} = require("../handlers/videoGamesHandlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames/name", videoGamesHandler);
router.get("/videogames/:idVideogame", videoGamesByIDHandler);
router.get("/videogames/bd/all", videoGamesByBDHandler);
router.get("/videogames", getVideoGamesHandler);
router.post("/videogames", postVideoGamesHandler);
router.get("/genres", getGenresHandler);

module.exports = router;
