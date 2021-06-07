import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGames, getVideoGames, switchLoading } from '../../store/actions/videogamesActions'
import './index.css';




function AddGames(props){
    const history = useHistory()

    const [formData, setFormData] = React.useState({
        name:"",
        description:"",
        releaseDate:"",
        rating:"",
        platforms: [],
        genres: [],
    })
  

    function handleInput(event){
        const newState = {
            ...formData,
            [event.target.name] : event.target.value
        }
        setFormData(newState);
    }
    function handleCheckbox(event){
        if(event.target.name === "platforms"){
            if(event.target.checked){
                const newState = {
                    ...formData,    
                    platforms: [...formData.platforms, event.target.value]
                }
                setFormData(newState);
            }else {
                const newState = {
                    ...formData,
                    platforms: formData.platforms.filter((e) => e !== event.target.value)
                }
                setFormData(newState);
            }
        }
        if(event.target.name === "genres"){
            if(event.target.checked){
                const newState = {
                    ...formData,    
                    genres: [...formData.genres, event.target.value]
                }
                setFormData(newState);
            }else {
                const newState = {
                    ...formData,
                    genres: formData.genres.filter((e) => e !== event.target.value)
                }
                setFormData(newState);
            }
        }

    }


    const handleSubmit= async(e)=> {
        await props.switchLoading();
        e.preventDefault(); 
        const response = await props.addGames(formData);
        await props.getVideoGames();
        await props.switchLoading();
        history.push(`/videogames/${response}`)

        
    }
    if(props.loading == true){
        return (
            <div className="loading">
           <h1 > Loading, Please Wait...</h1>
           </div>
        )
    } else {
        return(
            <div >
            <Link to='/videogames' className="back__button">        
                Go back
            </Link>
            <div className="wrapper">
            <h1 className="title"> ADD A GAME:</h1>
            <form onSubmit={handleSubmit} className="form">
                <label>Name</label>
                <input name="name" onChange={(handleInput)} required/>
                <label>Description</label>
                <textarea name="description" onChange={(handleInput)}/>
                <label>Release Date</label>
                <input type="date" name="releaseDate" onChange={(handleInput)} required/>
                <label>Rating</label>
                <input type="number" min="0" max="5" step="0.5" name="rating" onChange={(handleInput)} required />
                <label>Platforms</label>
                <div>
                    
                    <input  type="checkbox" name="platforms" value="1" onChange={(handleCheckbox)}/> 
                    <label>Playstation</label>
                    
                    
                    <input type="checkbox" name="platforms" value="2" onChange={(handleCheckbox)}/> 
                    <label>Xbox</label>

                    <br/>
                    
                    <input type="checkbox" name="platforms" value="3" onChange={(handleCheckbox)}/> 
                    <label>Nintendo</label>
                    
                    <input type="checkbox" name="platforms" value="0" onChange={(handleCheckbox)}/> 
                    <label>PC</label>
                </div>
                <label>Genres</label>
                <div>
                    {props.genres.map((genre)=>{
                        return <>
                            
                            <input type="checkbox" name="genres" value={genre.id} onChange={(handleCheckbox)}></input>
                            <label>{genre.name}</label>
                         </>
                    })}
                </div>
                <label> Image</label>
                <input type="url" placeholder="Img URL" name="background_image" onChange={handleInput} />
                <input type="submit" value="Submit" />
            </form>
            </div>
        </div>
        )
    }
    }
    

function mapStateToProps(state){
    return{
        genres: state.genres,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getVideoGames: videogame => dispatch(getVideoGames(videogame)),
        addGames: game => dispatch(addGames(game)),
        switchLoading: () => dispatch(switchLoading())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGames)