const { Router } = require('express');
const {Videogame} = require ('../db');
const { v4: uuidv4 } = require ('uuid');
const router = Router();

router.post('/', async function(req, res) {
    const game = req.body;
    const videogameCreated = await Videogame.create({
        ...game,
        id: uuidv4(),
    })
    await videogameCreated.addGenre(game.genres) 
    await videogameCreated.addPlatform(game.platforms)     
    res.send(videogameCreated)
    
})



module.exports = router;