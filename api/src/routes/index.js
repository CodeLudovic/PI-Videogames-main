const { Router } = require("express");
const { getVideoGames } = require("../controllers/getVideoGames");
const { getVideoGamesByID } = require("../controllers/getVideoGameByID");
const { getVideoGamesByName } = require("../controllers/getVideoGameByName");
const { postVideoGames } = require("../controllers/postVideoGame");
const { getGenres } = require("../controllers/getGenres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames/name", getVideoGamesByName);
router.get("/videogames/:idVideogame", getVideoGamesByID);
router.get("/videogames", getVideoGames);
router.post("/videogames", postVideoGames);
router.get("/genres", getGenres);

module.exports = router;
