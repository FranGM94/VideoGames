import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterVideoGames, resetFilter, sortVideoGames } from '../../store/actions/videogamesActions'


function SideBarComponent(props) {
    const sortItems = [
        {
            name: 'Nombre ascendente',
            sortDirection: 'ascending',
            condition: 'name'
        },
        {
            name: 'Nombre descendente',
            sortDirection: 'descending',
            condition: 'name'
        },
        {
            name: 'Rating ascendente',
            sortDirection: 'ascending',
            condition: 'rating'
        },
        {
            name: 'Rating descendente',
            sortDirection: 'descending',
            condition: 'rating'
        },
]
    
    const handleSortClick = (e) => {
        const sortCondition = e.target.value;    
        props.sortVideoGames(sortCondition);
    }
    
    const handleFilterClick = (e) => {
        const filterCondition = e.target.value;
        props.filterVideoGames(filterCondition);
    }
    
    const handleResetClick = (e) => {
        props.resetFilter();
    }

    return (
        <div className="container__sidebar">
            <Link to='/add' className="sidebar__add-game">        
                ADD GAMES  
            </Link>
            <h4 className="sidebar__titles">SORT</h4>
            <ul className="sidebar__section">
                {
                    sortItems.map(
                        item => (
                        <li className="section__item" >
                            <button
                                className="section__item" 
                                onClick={handleSortClick} 
                                value={`${item.sortDirection} ${item.condition}`} 
                            >
                            {item.name}
                            </button>
                        </li>)
                    )
                }
            </ul>
            <h4 className="sidebar__titles">FILTERS</h4>
            <h5 className="sidebar__titles">BY GENRES</h5>
            <ul className="sidebar__section">
                {props.genres.map((genre)=>{
                    return <li className="section__item" key={genre.id}> <button className="section__item" onClick={handleFilterClick} value={genre.id}>{genre.name}</button></li>
                })}
            </ul>
            <div className="sidebar__section2">
                <h5 className="sidebar__titles">BY DATA BASE </h5>
                <button className="section__item" onClick={handleFilterClick} value="db">Data Base</button>
                <h5 className="sidebar__titles">BY API</h5>
                <button className="section__item" onClick={handleFilterClick} value="api">API</button>
            </div>
            <button onClick={handleResetClick} className="sidebar__clear">CLEAR FILTERS</button>
        </div>
    )

}

function mapStateToProps(state){
    return {
        genres: state.genres
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sortVideoGames: sort => dispatch(sortVideoGames(sort)),
        filterVideoGames: filter => dispatch(filterVideoGames(filter)),
        resetFilter: action => dispatch(resetFilter(action))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SideBarComponent)
