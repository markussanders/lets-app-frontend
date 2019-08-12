import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Suggester from './components/Suggester';
import CardsContainer from './containers/CardsContainer';
import VenueShow from './components/VenueShow';
import Background from './containers/Background';
import Login from './components/LogIn';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: [],
      selectedVenue: null,
      imgUrl: '',
      loginForm: false,
      auth: { user: {} },
    }
  }

  updateSearched = searched => {
    this.setState({
      searched: searched,
    })
  }

  updateSelectedVenue = venue => {
    this.setState({selectedVenue: venue});
    console.log(this.state);
  }

  handleLogin = user => {
    this.setState({
      auth: { user }
    })
    localStorage.setItem('token', user.token);
  }

  loginForm = () => {
    this.setState({loginForm: !this.state.loginForm});
    console.log('in login');
  }

  handleLogout = user => {
    this.setState({
      auth: { user: {} }
    })
    localStorage.removeItem('token');
  }

  signupForm = () => {

  }

  fetchVenue = (path) => {
    console.log(`http://localhost:3000${path}`);
    fetch(`http://localhost:3000${path}`)
      .then(resp => resp.json())
      .then(venue => this.updateSelectedVenue(venue));
  }

  render () {
    return (
    <div>
      <Switch> 
      <Route exact path='/' render={(routeProps) => <Redirect to = "/home" />}/>
        <Route exact path='/home' render={(routeProps) => {
          return (
            <div>
              < NavBar currentUser = {
                this.state.auth.user
              }
              loginForm = {
                this.loginForm
              }
              signup = {
                this.signupForm
              }
              handleLogout = {
                this.handleLogout
              }
              />
              <section id="subcontainer">
                <Background imgUrl={this.state.imgUrl} />
              </section>
              <section id="topcontainer">
                {
                  this.state.loginForm ? <Login 
                  currentUser = {
                    this.state.auth.user
                  }
                  loginForm = {
                    this.loginForm
                  }
                  handleLogin = {
                    this.handleLogin
                  }
                  /> : null}
                <SearchBar {...routeProps} updateSearched={this.updateSearched} />
                <Suggester />
                <CardsContainer searched={this.state.searched} updateSelectedVenue={this.updateSelectedVenue}/>
              </section>
            </div>
          ) }}
        />
        <Route exact path='/venues/:id'  render={(routeProps) => {
          return (
            <div>
              < NavBar currentUser = {
                this.state.auth.user
              }
              loginForm = {
                this.loginForm
              }
              signup = {
                this.signupForm
              }
              handleLogout = {
                this.handleLogout
              }
              />
              {
                this.state.loginForm ? < Login
                currentUser = {
                  this.state.auth.user
                }
                loginForm = {
                  this.loginForm
                }
                handleLogin = {
                  this.handleLogin
                }
                /> : null}
              <VenueShow venue={(this.state.selectedVenue || this.fetchVenue(routeProps.location.pathname))} currentUser={this.state.auth.user}/>
            </div>
          )
        }} />
     </Switch>
    </div>
  );
  }
}

export default App;
