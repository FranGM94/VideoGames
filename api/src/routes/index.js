const { Router } = require('express');
const GamesRouter = require('./games.js');
const GenresRouter = require('./genres.js');
const GameRouter = require('./game.js');

const router = Router();

router.use('/videogames', GamesRouter);
router.use('/videogame', GameRouter);
router.use('/genres', GenresRouter);



module.exports = router;
