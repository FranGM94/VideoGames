import React from 'react';
import { connect } from 'react-redux';
import { searchVideoGame } from '../../store/actions/videogamesActions'

function SearchBarComponent(props){
    const searchBox = (e) =>{
        props.searchVideoGame(e.target.value);
    }

    return(
        <input className="content__searchbar" type="text" placeholder="VideoGame..." onChange={searchBox} />
    )
}

function mapDispatchToProps(dispatch){
    return{
        searchVideoGame: name => dispatch(searchVideoGame(name))
    }
}

export default connect(null, mapDispatchToProps)(SearchBarComponent)