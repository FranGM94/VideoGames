import { ADD_VIDEOGAME, SORT_VIDEOGAME, GET_VIDEOGAMES, GET_GENRES, FILTER_VIDEOGAME, RESET_FILTER, SEARCH_VIDEOGAME, PAGINATE_VIDEOGAME, LOADING_SWITCH} from  '../actions/videogamesActions'

const initialState = {
    videogames: [],
    videogamesFiltered: [],
    videogamesExposed: [],
    genres: [],
    page: 0,
    loading: false,
}
function rootReducer ( state = initialState, action )  {
    switch(action.type) {
        case LOADING_SWITCH:
            if(state.loading == true){
                return{
                    ...state,
                    loading: false
                }
            }else if(state.loading == false){
                return{
                    ...state,
                    loading: true
                }
            }
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesExposed: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case ADD_VIDEOGAME:
            const newGame = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                releaseDate: action.payload.releaseDate,
                rating: action.payload.rating,
                platforms: action.payload.platforms,
                genres: action.payload.genres,
            }
            return {
                ...state,
                newGame,    
            }
        case SORT_VIDEOGAME:
            switch(action.payload)  {
                case "ascending name": {
                state.videogamesExposed.sort((a, b) =>{
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                 })
                return{
                    ...state,
                    page: 0,
                    videogamesExposed: [...state.videogamesExposed],
                    
                } 
            }
             case "descending name": {
                
                state.videogamesExposed.sort((a, b) =>{
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                 })
                return{
                    ...state,
                    page: 0,
                    videogamesExposed: [...state.videogamesExposed]
                } 
            }
            case "ascending rating": {
                
                state.videogamesExposed.sort((a, b) =>{
                    return a.rating - b.rating;
                 })
                return{
                    ...state,
                    page: 0,
                    videogamesExposed: [...state.videogamesExposed]
                } 
            }
            case "descending rating": {
                
                state.videogamesExposed.sort((a, b) =>{
                    return b.rating - a.rating;
                 })
                return{
                    ...state,
                    page: 0,
                    videogamesExposed: [...state.videogamesExposed]
                } 
            }
        
        }
        case FILTER_VIDEOGAME:
            if(action.payload === "db"){
                state.videogamesFiltered = state.videogames.filter((game) =>{
                    return typeof game.id === 'string';
                }) 
                return {
                    ...state,
                    page: 0, 
                    videogamesExposed: state.videogamesFiltered
                }
            }else if(action.payload === "api"){
                    state.videogamesFiltered = state.videogames.filter((game) =>{
                        return typeof game.id === 'number';
                    })
                return {
                    ...state,
                    page: 0, 
                    videogamesExposed: state.videogamesFiltered
                    
                }
            }else{ 
                state.videogamesFiltered = state.videogames.filter((game)=> {
                    var flag = false
                    for(var i = 0; i < game.genres.length; i ++){ 
                        if(game.genres[i].id == action.payload){
                            flag = true;
                        }
                    }
                    return flag === true 
                })
                return{
                ...state,
                page: 0,
                videogamesExposed: state.videogamesFiltered
            }}
        case RESET_FILTER:
                return{
                    ...state,
                    page: 0,
                    videogamesFiltered: [],
                    videogamesExposed: state.videogames
            }
        case SEARCH_VIDEOGAME:
                if(state.videogamesFiltered.length > 0){
                    return{
                        ...state,
                        page: 0,
                        videogamesExposed: state.videogamesFiltered.filter((game) =>{
                            return game.name.toLowerCase().includes(action.payload.toLowerCase());
                        })
                    }
                }
                return{
                    ...state,
                    page: 0,
                    videogamesExposed: state.videogames.filter((game) =>{
                        return game.name.toLowerCase().includes(action.payload.toLowerCase());
                    })
                }
        case PAGINATE_VIDEOGAME:
                if(action.payload === "next"){
                    return {
                        ...state,
                        page: state.page + 1,    
    
                    }
                } else if(action.payload === "prev"){
                        return {
                            ...state,
                            page: state.page - 1,
    
                    }
                }
        default: 
            return {
                ...state,
            }
    }
}

export default rootReducer;