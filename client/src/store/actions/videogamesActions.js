import axios from 'axios'
import { GAMES_URL, GENRES_URL, POST_URL } from '../../constants'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const FILTER_VIDEOGAME = 'FILTER_VIDEOGAME';
export const RESET_FILTER = 'RESET_FILTER';
export const SORT_VIDEOGAME = 'SORT_VIDEOGAME';
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
export const PAGINATE_VIDEOGAME = 'PAGINATE_VIDEOGAME';
export const LOADING_SWITCH = 'LOADING_SWITCH';


export function getVideoGames() {
    return function(dispatch){
        return axios.get(GAMES_URL)
            .then((response) => {
                dispatch({
                    type: GET_VIDEOGAMES,
                    payload: response.data,
                });
            })
    }
}
export function getGenres() {
    return function(dispatch){
        return axios.get(GENRES_URL)
            .then((response) => {               
                dispatch({
                    type: GET_GENRES,
                    payload: response.data,
                });
            })
    }
}

export function addGames(payload){
    return async function(dispatch){
    return axios.post(POST_URL, payload)
        .then((response) => {
            dispatch({
                type: ADD_VIDEOGAME,
                payload: response.data
            })
        
        return (response.data.id)
    })
}}

export function sortVideoGames(payload){
    return async function(dispatch){
        dispatch({
            type: SORT_VIDEOGAME,
            payload
        })
    }
}
export function filterVideoGames(payload){
    return async function(dispatch){
        dispatch({
            type: FILTER_VIDEOGAME,
            payload
        })
    }
}
export function resetFilter(payload){
    return async function (dispatch){
        dispatch({
            type: RESET_FILTER,
            payload
        })
    }
}
export function searchVideoGame(payload){
    return async function(dispatch){
        dispatch({
            type: SEARCH_VIDEOGAME,
            payload
        })
    }
}
export function changePage(payload){
    return function(dispatch){
        dispatch({
            type: PAGINATE_VIDEOGAME,
            payload
        })
    }
}
export function switchLoading(){
    return function(dispatch){
        dispatch({
            type: LOADING_SWITCH,
        })
    }
}
