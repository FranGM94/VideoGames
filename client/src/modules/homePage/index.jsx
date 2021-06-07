import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { getVideoGames, getGenres } from '../../store/actions/videogamesActions';
import './index.css'

 function HomePageComponent({getVideoGames, getGenres, videogames}){
    function getVideoGamesFunction(){
        getVideoGames();
        getGenres();
    }

    useEffect(() => {
        getVideoGamesFunction();
    }, [])
    if (videogames.length >= 100){
        return(
            <div className="loading__page">
                <Link to='/videogames' className="loading__element" >        
                    <p>START GAME</p> 
                </Link>
            </div>
            )
    }else return(
        <div className="loading__page">
            <p className="loading__element">LOADING...</p>
            
        </div>
    )
    
}

function mapDispatchToProps(dispatch) {
    return {
        getVideoGames: videogame => dispatch(getVideoGames(videogame)),
        getGenres: genre => dispatch(getGenres(genre))

    }
}
function mapStateToProps(state){
    return{
        videogames: state.videogames
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);