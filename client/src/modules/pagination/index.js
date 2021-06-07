import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VideoGameCards from '../cards/index';
import { changePage } from '../../store/actions/videogamesActions';
import { PaginationButtonsComponent } from './paginationButtons.jsx';

function PaginationComponent(props){
    const history = useHistory()
    let activeGames= props.videogames.slice(props.page*15,(props.page + 1) * 15)
    const disabledPrev = props.page === 0;
    const disabledNext = activeGames.length < 15;
    
    

    const handleClick = (e) =>{
        
        if(e.target.value === "prev"){
            props.changePage("prev");
            window.scrollTo(0,0)
        }
        if(e.target.value === "next"){
            props.changePage("next");
            window.scrollTo(0,0)
        }
    }

    if(props.videogamesTotal.length === 0){
        history.push(`/`)
        return null;
        
        
    }
    else{
    return (
        <div className="content__gamelist">
            <PaginationButtonsComponent handleClick={handleClick} disabledNext={disabledNext} disabledPrev={disabledPrev} />
            <VideoGameCards videogames={activeGames}/>
            <PaginationButtonsComponent handleClick={handleClick} disabledNext={disabledNext} disabledPrev={disabledPrev} />
        </div>
    )
    }   
    
}

function mapStateToProps(state){
    return {
        videogamesTotal: state.videogames,
        videogames: state.videogamesExposed,
        page: state.page
    }
}
function mapDispatchToProps(dispatch){
    return{
        changePage: page => dispatch(changePage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)