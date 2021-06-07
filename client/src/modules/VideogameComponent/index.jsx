import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import './index.css';


function VideoGameComponent({videogames, match}){
    const gameSearched = videogames.find(
        (game) => game.id.toString() === match.params.id
    )

    return( 
        <div > 
            <Link to='/videogames' className="videogame__back">        
                Go back
            </Link>
            <div className="videogame__wrapper">
            <img className="videogame__image" src={gameSearched && gameSearched.background_image} alt=" Not Available" />
            <h2 className="videogame__title"> {gameSearched && gameSearched.name}</h2>
            <p>Release Date: {gameSearched && gameSearched.releaseDate}</p>
            <p>Rating: ★{gameSearched && gameSearched.rating}</p>
            <div>
                Genres:
            <ul className="videogame__list">
                {gameSearched && gameSearched.genres.map((genre) => {
                    return <li>{genre.name}</li>
                })}                
            </ul>
            </div>
            <div>
                Platforms:
            
            <ul className="videogame__list">
                {gameSearched && gameSearched.platforms.map((item) => {
                    return <li>{item.name || item.platform.name }</li>
                })}                
            </ul>
            </div>
            <div>
                Description:
                <p>{gameSearched.description ? gameSearched.description : "There's no description available"}</p>
            </div>
            
            </div>
        </div>
)

}


function mapStateToProps(state){
    return {
        videogames: state.videogames
    }
}
export default connect(mapStateToProps,null)(VideoGameComponent);