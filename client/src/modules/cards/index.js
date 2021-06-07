
import { Link } from 'react-router-dom';
import './index.css';


function VideoGameCards({videogames}){

    return <div>{videogames.map((game)=>{
        return <Link to={`/videogames/${game.id}`}  key={game.id} className="gamelist__card">
                <img src={game.background_image}
                 alt= ' Not Available'
                 className= "card__img"
                />
                <div className="card__details">
                    <div className="details__header">
                        <h2 className="details__name">{game.name}</h2>
                        <p className="details__rating">★ {game.rating}</p>
                    </div>

                    <ul className="details__genres">
                        {game.genres.map((genre) => {
                            return <li className="genres__item" key={genre.id}><p>{genre.name}</p></li>
                        })}                
                    </ul>
                </div>
                
            </Link>
    })}</div>

}


export default VideoGameCards
