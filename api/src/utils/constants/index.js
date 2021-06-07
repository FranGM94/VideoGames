const BASE_URL = "https://api.rawg.io/api"
const API_GAMES = BASE_URL  + "/games"
const API_GAMES_SEARCH = BASE_URL + "/games?search="
const API_GENRES = BASE_URL + "/genres"
const API_GAMES_ID = BASE_URL + "/games/"

module.exports= {
    BASE_URL,
    API_GAMES,
    API_GAMES_ID,
    API_GAMES_SEARCH,
    API_GENRES
}