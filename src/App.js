import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Suggester from './components/Suggester';
import CardsContainer from './containers/CardsContainer';
import VenueShow from './containers/VenueShow';
import EventShow from './containers/EventShow';
import Background from './containers/Background';
import Login from './components/LogIn';
import SavedList from './containers/SavedList';
import Profile from './containers/Profile';
import Signup from './components/Signup';
import UserCalendar from './containers/UserCalendar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searched: [],
      selectedVenue: null,
      selectedEvent: null,
      imgUrl: '',
      loginForm: false,
      signupForm: false,
      auth: { user: {}},
      currentUser: false,
      currentUserMostSearched: false,
      mostFrequent: [],
      events: false,
      query: '',
    }
  }

  componentWillMount() {
    let retrievedUser = localStorage.length > 0 ? JSON.parse(localStorage.user) : false;
    this.setState({currentUser: retrievedUser})
  }

  updateSearched = childState => {
    console.log('CHILD STATE =', childState)
    this.setState({
      searched: childState.results,
      events: childState.events
    })
  }

  updateSelectedVenue = venue => {
    this.setState({selectedVenue: venue});
  }
  updatedSelectedEvent = event => {
    this.setState({selectedEvent: event})
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
      .then(venue => {
        this.setState({currentUserMostSearched: false})
        this.updateSelectedVenue(venue)
      });
  }

  fetchEvent = (path) => {
    fetch(`http://localhost:3000${path}`)
      .then(resp => resp.json())
      .then(event => {
        this.setState({
          currentUserMostSearched: false
        })
        this.updateSelectedEvent(event)
      });
  }

  updateBackgroundImage = imgUrl => {
    this.setState({imgUrl: imgUrl})
  }

  query = term => {
    this.setState({query: term.toUpperCase()})
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
                  {/* {this.renderBackground()} */}
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
                  <Background imgUrl={this.state.imgUrl} />
                  <Suggester updateBackgroundImage={this.updateBackgroundImage} updateSearched={this.updateSearched} currentUser={this.state.currentUser} />
                  <SearchBar {...routeProps} query={this.query} updateSearched={this.updateSearched} currentUser = {this.state.currentUser} suggest={this.suggest}/>
                  <CardsContainer searched={this.state.searched} query={this.state.query} updateSelectedVenue={this.updateSelectedVenue} updateSearched={this.updateSearched} handleSignup={this.handleSignup} selectedEvents={this.state.events} updatedSelectedEvent={this.updatedSelectedEvent}/>
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
                <VenueShow venue={this.state.selectedVenue} venuePath={routeProps.location.pathname} history={routeProps.history} currentUser={this.state.currentUser}/>
              </div>
            )
          }} />

          <Route exact path='/events/:id'  render={(routeProps) => {
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
                <EventShow event={(this.state.selectedEvent || this.fetchEvent(routeProps.location.pathname))} history={routeProps.history} currentUser={this.state.currentUser}/>
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
                <SavedList currentUser={this.state.currentUser} history={routeProps.history} />
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
                  <Profile currentUser = {this.state.currentUser} history={routeProps.history} />
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
                  <SavedList currentUser = {this.state.currentUser} history={routeProps.history} />
                </section> :
                <Redirect to='/home'/>
            }
          } />
          <Route exact path='/users/:id/calendar' render={(routeProps) => {
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
                  <UserCalendar />
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
