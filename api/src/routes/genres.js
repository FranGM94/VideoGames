const { Router } = require('express');
const { Genre, Platform } = require ('../db');
const router = Router();
const axios = require('axios');
require('dotenv').config();
const api_key = process.env.API_KEY
const { API_GENRES } = require('../utils/constants')

const platforms =[
    {
        id: 1,
        name: "Playstation"
    },
    {
        id: 2,
        name: "Xbox"
    },
    {
        id: 3,
        name: "Nintendo"
    },
    {
        id: 0,
        name: "PC"
    }
]


router.get('/', function (req, res, next) {
    axios.get(`${API_GENRES}?key=${api_key}`)
        .then((results) => {
            const genreResult = results.data
            const response = genreResult.results
            for(let i = 0; i < response.length; i++){
                Genre.create({
                    id: response[i].id,
                    name: response[i].name
                })
            }
            for(let i = 0; i < platforms.length; i++){
                Platform.create({
                    id: platforms[i].id,
                    name: platforms[i].name
                })
            }
            
            res.send(response)
        })
    
        
        .catch((error) => next(error))
})


module.exports = router;
