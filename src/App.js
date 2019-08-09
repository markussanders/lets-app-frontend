import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Suggester from './components/Suggester';
import CardsContainer from './containers/CardsContainer';
import VenueShow from './components/VenueShow';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      searched: [],
      selectedVenue: null,
    }
  }

  updateSearched = searched => {
    this.setState({
      searched: searched,
    })
  }

  updateSelectedVenue = venue => {
    this.setState({selectedVenue: venue});
    console.log(this.state)
  }

  render () {
    return (
    <div>
      <Switch> 
      <Route exact path='/' render={(routeProps) => <Redirect to = "/home" />}/>
        <Route exact path='/home' render={(routeProps) => {
          return (
            <div>
              <NavBar currentUser={this.state.currentUser} />
              <SearchBar {...routeProps} updateSearched={this.updateSearched} />
              <Suggester />
              <CardsContainer searched={this.state.searched} updateSelectedVenue={this.updateSelectedVenue}/>
            </div>
          ) }}
        />
        <Route exact path='/venues/:id'  render={(routeProps) => {
          return (
            <div>
              <NavBar currentUser={this.state.currentUser} />
              <VenueShow venue={this.state.selectedVenue} />
            </div>
          )
        }} />
     </Switch>
    </div>
  );
  }
}

export default App;
