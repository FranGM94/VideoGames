import './App.css';
import HomePageComponent from './modules/homePage/index.jsx';
import AddGame from './modules/addGame/index.jsx'
import VideoGameComponent from './modules/VideogameComponent/index.jsx'
import SearchBarComponent from './modules/searchBar/index'
import PaginationComponent from './modules/pagination/index'
import { Route} from 'react-router-dom';
import SideBarComponent from './modules/sidebar';


function App() {
  return (
    <>
      <Route exact path='/' component={HomePageComponent}/>
      <Route exact path='/videogames' component={() => 
        <div className="container">
          <SideBarComponent />
          <div className="container__content">
            <SearchBarComponent />
            <PaginationComponent />
          </div>
        </div>
        } //homepage
      />
      <Route exact path='/add' component={AddGame} />
      <Route exact path='/videogames/:id' component={VideoGameComponent} />
    </>
  );
}

export default App;
