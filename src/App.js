import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
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
    this.setState({
      searched: searched,
    })
    console.log('this.state.searched =', this.state.searched)
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

        {/* <Route exact path='/venues/:id' render={(routeProps) => {
          return (
            <div>
              <NavBar currentUser={this.state.currentUser} />
              <h2>VENUE SHOW</h2>
              <CardsContainer />
            </div>
          ) 
        }} />*/}
    </div>
  );
  }
}

export default App;
