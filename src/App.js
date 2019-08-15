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
import Signup from './components/Signup';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: [],
      selectedVenue: null,
      imgUrl: '',
      loginForm: false,
      signupForm: false,
      auth: { user: {}},
      currentUser: false,
    }
  }

  componentWillMount() {
    let retrievedUser = localStorage.length > 0 ? JSON.parse(localStorage.user) : false;
    this.setState({currentUser: retrievedUser})
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

  handleSignup = () => {
    this.setState({loginForm: true});
  }

  loginForm = () => {
    this.setState({loginForm: !this.state.loginForm});
  }
  
  signupForm = () => {
    this.setState({signupForm: !this.state.signupForm});
  }

  handleLogout = user => {
    this.setState({
      auth: { user: {} }
    })
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
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
    return (
    <div>
      <Switch> 
        <Route exact path='/' render={(routeProps) => <Redirect to = "/home" />}/>
          <Route exact path='/home' render={(routeProps) => {
            return (
              <div>
                < NavBar currentUser = {this.state.currentUser} loginForm = {this.loginForm} signupForm= {this.signupForm}handleLogout = {this.handleLogout} handleSignup={this.handleSignup}/>
                <section id="subcontainer">
                  {this.renderBackground()}
                </section>
                <section id="topcontainer">

                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.currentUser} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }
                  {this.state.signupForm ? 
                    <Signup currentUser = {this.state.currentUser} signupForm = {this.signupForm} handleSignup = {this.handleSignup}/>
                  : 
                    null
                  }

                  <Suggester updateBackgroundImage={this.updateBackgroundImage} />
                  <SearchBar {...routeProps} updateSearched={this.updateSearched} />
                  <CardsContainer searched={this.state.searched} updateSelectedVenue={this.updateSelectedVenue} updateSearched={this.updateSearched} handleSignup={this.handleSignup}/>
                </section>
              </div>
            ) }}
          />
          
          <Route exact path='/venues/:id'  render={(routeProps) => {
            return (
              <div>
                < NavBar currentUser = {this.state.currentUser} loginForm = {this.loginForm} signupForm = {this.signupForm} handleLogout = {this.handleLogout} handleSignup={this.handleSignup}/>
                  {this.state.signupForm ? 
                    <Login currentUser = {this.state.currentUser} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }
                  {this.state.signupForm ? 
                    <Signup currentUser = {this.state.currentUser} signupForm = {this.signupForm} handleSignup = {this.handleSignup}/>
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
                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.currentUser} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                    : 
                    null
                  }
                  {this.state.signupForm ? 
                    <Signup currentUser = {this.state.currentUser} signupForm = {this.signupForm} handleSignup = {this.handleSignup}/>
                    : 
                    null
                  }
                  <NavBar currentUser = {this.state.currentUser} loginForm = {this.loginForm} signupForm= {this.signupForm} handleLogout = {this.handleLogout} handleSignup={this.handleSignup}/>
                <SavedList currentUser={this.state.currentUser} />
              </section>
            )
          }} />

          <Route exact path='/users/:id' render={(routeProps) => {
            return localStorage.getItem('user_id') ?
                <section id="profile">
                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.currentUser} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }
                  {this.state.signupForm ? 
                    <Signup currentUser = {this.state.currentUser} signupForm = {this.signupForm} handleSignup = {this.handleSignup}/>
                  : 
                    null
                  }
                  <NavBar currentUser = {this.state.currentUser} loginForm = {this.loginForm} signupForm = {this.signupForm} handleLogout = {this.handleLogout} handleSignup={this.handleSignup}/>
                  <Profile currentUser = {this.state.currentUser} />
                </section> :
                <Redirect to='/home'/>
            }
          } />

          <Route exact path='/users/:id/saved' render={(routeProps) => {
            return localStorage.getItem('user_id') ?
                <section id="saved">
                  {this.state.loginForm ? 
                    <Login currentUser = {this.state.currentUser} loginForm = {this.loginForm} handleLogin = {this.handleLogin}/>
                  : 
                    null
                  }
                  {this.state.signupForm ? 
                    <Signup currentUser = {this.state.currentUser} signupForm = {this.signupForm} handleSignup = {this.handleSignup}/>
                  : 
                    null
                  }
                  <NavBar currentUser = {this.state.currentUser} loginForm = {this.loginForm} signupForm = {this.signupForm} handleLogout = {this.handleLogout} handleSignup={this.handleSignup}/>
                  <SavedList currentUser = {this.state.currentUser} />
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
