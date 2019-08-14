import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Suggester from './components/Suggester';
import CardsContainer from './containers/CardsContainer';
import VenueShow from './containers/VenueShow';
import Background from './containers/Background';
import Login from './components/LogIn';
import SavedList from './containers/SavedList';
import Profile from './containers/Profile';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: [],
      selectedVenue: null,
      imgUrl: '',
      loginForm: false,
      auth: { user: {
        id: 3,
        username: 'john'
      } },
    }
    this.updateState()
  }

  updateState() {
    let retrievedUser = JSON.parse(localStorage.getItem('user'));
    if (retrievedUser) {
      this.setState({auth: retrievedUser})
    }
    return retrievedUser;
  }

  updateSearched = searched => {
    this.setState({
      searched: searched,
    })
  }

  updateSelectedVenue = venue => {
    this.setState({selectedVenue: venue});
  }


  handleLogin = user => {
    this.setState({
      auth: { user }
    })
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', user.token)
    localStorage.setItem('user_id', user.id);
  }

  loginForm = () => {
    this.setState({loginForm: !this.state.loginForm});
  }

  handleLogout = user => {
    this.setState({
      auth: { user: {} }
    })
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
  }

  signupForm = () => {
  }

  fetchVenue = (path) => {
    fetch(`http://localhost:3000${path}`)
      .then(resp => resp.json())
      .then(venue => this.updateSelectedVenue(venue));
  }

  updateBackgroundImage = imgUrl => {
    this.setState({imgUrl: imgUrl})
  }

  renderBackground = () => {
    return <Background imgUrl={this.state.imgUrl} />
  }

  render () {
    console.log(this.state)
    return (
    <div>
      <Switch> 
        <Route exact path='/' render={(routeProps) => <Redirect to = "/home" />}/>
          <Route exact path='/home' render={(routeProps) => {
            return (
              <div>
                < NavBar currentUser = {this.state.auth.user} loginForm = {this.loginForm} signup = {this.signupForm}handleLogout = {this.handleLogout}/>
                <section id="subcontainer">
                  {this.renderBackground()}
                </section>
                <section id="topcontainer">

                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.auth.user} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }

                  <Suggester updateBackgroundImage={this.updateBackgroundImage} />
                  <SearchBar {...routeProps} updateSearched={this.updateSearched} />
                  <CardsContainer searched={this.state.searched} updateSelectedVenue={this.updateSelectedVenue}/>
                </section>
              </div>
            ) }}
          />
          
          <Route exact path='/venues/:id'  render={(routeProps) => {
            return (
              <div>
                < NavBar currentUser = {this.state.auth.user} loginForm = {this.loginForm} signup = {this.signupForm} handleLogout = {this.handleLogout}/>
                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.auth.user} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }
                <VenueShow venue={(this.state.selectedVenue || this.fetchVenue(routeProps.location.pathname))} currentUser={this.state.auth.user}/>
              </div>
            )
          }} />

          <Route exact path='/users/:id/saved_list' render={(routeProps) => {
            return (
              <section id="saved-list-page">
                <NavBar currentUser = {this.state.auth.user} loginForm = {this.loginForm} signup = {this.signupForm} handleLogout = {this.handleLogout}/>
                <SavedList currentUser={this.state.auth.user} />
              </section>
            )
          }} />

          <Route exact path='/users/:id' render={(routeProps) => {
            return localStorage.getItem('user_id') ?
                <section id="profile">
                  <NavBar currentUser = {this.state.auth.user} loginForm = {this.loginForm} signup = {this.signupForm} handleLogout = {this.handleLogout}/>
                  <Profile currentUser = {this.state.auth.user} />
                </section> :
                <Redirect to='/home'/>
            }
          } />

          <Route exact path='/users/:id/saved' render={(routeProps) => {
            return localStorage.getItem('user_id') ?
                <section id="saved">
                  <NavBar currentUser = {this.state.auth.user} loginForm = {this.loginForm} signup = {this.signupForm} handleLogout = {this.handleLogout}/>
                  <SavedList currentUser = {this.state.auth.user} />
                </section> :
                <Redirect to='/home'/>
            }
          } />
     </Switch>
    </div>
  );
  }
}

export default App;
