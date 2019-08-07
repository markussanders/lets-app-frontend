import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import './App.css';
import '../node_modules/bulma/css/bulma.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Suggester from './components/Suggester';
import CardsContainer from './containers/CardsContainer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      searched: [],
    }
  }

  updateSearched = searched => {
    console.log(this.state);
    this.setState({
      searched: searched,
    })
    console.log(this.state);
  }
  
  render () {
    return (
    <div>
      <Route exact path='/' render={(routeProps) => <Redirect to = "/home" />}/>
          <Route exact path='/home' render={(routeProps) => {
          return (
            <div>
              <NavBar currentUser={this.state.currentUser} />
              <SearchBar {...routeProps} updateSearched={this.updateSearched} />
              <Suggester />
              <CardsContainer searched={this.state.searched}/>
            </div>
          ) }}
          />
    </div>

  );
  }
}

export default App;
