const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require ('sequelize');
const { Videogame, Genre, Platform } = require('../db');
const { API_GAMES, API_GAMES_SEARCH, API_GAMES_ID } = require('../utils/constants')
require('dotenv').config();
const API_KEY = process.env.API_KEY


router.get('/', async (req, res) => {   
    try{
        
         let allGames = [];
         const page = `${API_GAMES}?key=${API_KEY}`
         if(req.query.name) {
             Videogame.findAll({
                 where: {
                     name: {[Op.like]: `%${req.query.name}%`}
                 },
                 limit: 15,
                 include: [
                 {
                        model: Genre,
                 },
                {
                        model: Platform,
                },
            ]
             }).then(r => {
                 r.map( game => {
                     allGames.push(game);
                 })
             })

             const apiSearch = await axios.get(`${API_GAMES_SEARCH}${req.query.name}&key=${API_KEY}`);
             let format = apiSearch.data.results.map( game => {
                 let gameStructure = {
                     id: game.id,
                     name: game.name,
                     releaseDate: game.released,
                     background_image: game.background_image,
                     rating: game.rating,
                     genres: game.genres,
                     platforms: game.parent_platforms,
                 };
                 return gameStructure;
             });
             allGames = allGames.concat(format);
             return res.json(allGames);
         } else 
         Videogame.findAll({
             
             include: [
                {
                       model: Genre,
                },
               {
                       model: Platform,
               }],
         }).then(r => {
             r.map( game => {
                 allGames.push(game);
             })
         })
         let n = 1
         while(allGames.length < 100 ) {
             const apiVideogame = await axios.get(`${page}&page=${n}`)
             let format = apiVideogame.data.results.map( game => {
                 let gameStructure = {
                     id: game.id,
                     name: game.name,
                     releaseDate: game.released,
                     background_image: game.background_image,
                     rating: game.rating,
                     genres: game.genres,
                     platforms: game.parent_platforms,
                 };
                 return gameStructure;
             });
             allGames = allGames.concat(format);
             n = n + 1; 
             }
             res.json(allGames);
     } catch(error) {
         res.send.error("No se ha encontrado el juego");
     }
 })
// router.get('/', videogameController.getByName)

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if(id.includes('-')){
    return Videogame.findByPk(id) 
        .then((results) => res.send(results))
        .catch((error) => next(error))
    }
    const searchId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    let game = searchId.data
        let gameStructure = {
            id: game.id,
            name: game.name,
            releaseDate: game.released,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres,
            platforms: game.parent_platforms,
        };
        return res.json(gameStructure)
})

// router.get('/:id/image', async (req, res, next) => {
//     const id = req.params.id;
//     if(id.includes('-')){
//         return Videogame.findByPk(id) 
//             .then((results) => {
//                 console.log(results.background_image)
//                 const foto =  results.background_image
//                 res.send(foto).contentType('image/png');
//             })
//             .catch((error) => next(error))
//         }
// })
// router.post('/', videogameController.add)


module.exports = router;
