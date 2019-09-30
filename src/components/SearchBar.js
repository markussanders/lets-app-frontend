import React, { Component } from 'react';
// import axios from 'axios'


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      events: false,
      value: 'food',
      noResults: '',
      userSearchHistory: {},
    };
  }
  componentDidMount() {
    this.fetchUserSearchHistory();
  }

  getInfo = () => {
    console.log('AT GETINFO ',this.state);
    fetch('http://localhost:3000/searches', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: this.state.query,
        user_id: this.props.currentUser.id,
        is_event: this.state.events, 
        category: this.state.value,
      })
    })
      .then(resp => resp.json())
      .then(results => {
        if (results.message) {
          this.setState({
            noResults: results.message,
          });
          this.props.updateSearched(this.state);
        } else {
          this.setState({
            results: results,
            noResults: '',
          })
          this.recordCategories(results);
          this.props.updateSearched(this.state);  
        }
      })
  }

  recordCategories = searchResults => {
    let searchCategories = {};
    let categoriesCount = {};
    searchResults.forEach(result => {
      result.categories.forEach(category => {
        categoriesCount[category.title] = (categoriesCount[category.title] || 0) + 1;
      })
    })
    searchCategories[this.state.value] = categoriesCount;
    console.log('search categories = ', searchCategories);
    //Adding search category to user, next step update subsequent methods after append categories to users
    this.appendCategoriesToUser(this.state.userSearchHistory, searchCategories);
  }

  fetchUserSearchHistory = () => {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
      .then(resp => resp.json())
      .then(user => {
        if (user.search_history) { 
          let format = String(user.search_history).replace(/=>/g, ':');
          this.setState({userSearchHistory: JSON.parse(format)});
        }
      });
  }

  appendCategoriesToUser = (userSearchHistory, searchCategories) => {

      for (let cat in searchCategories) {
        // userSearchHistory[this.state.value] = userSearchHistory[this.state.value] || {};
        if (!userSearchHistory.hasOwnProperty(this.state.value)) {
          userSearchHistory[this.state.value] = {};
        }
        let subCats = userSearchHistory[this.state.value];
        subCats[cat] ? subCats[cat] += searchCategories[cat] : subCats[cat] = searchCategories[cat];
      }
    this.updateUserSearchHistory(userSearchHistory);

  }

  updateUserSearchHistory = updatedHistory => {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        search_history: updatedHistory
      }),
    }).then(resp => resp.json()).then(user => console.log('UPDATE RESP = ', user));
  }

  // addResultsToLocalStorage = (results=this.state.searchResults) => {
  //   localStorage.setItem('searchResults', results);
  // }
  
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }
    // For future autocomplete functionality
    // , () => {
    //   if (this.state.query && this.state.query.length > 1) {
    //     if (this.state.query.length % 2 === 0) {
    //       this.getInfo()
    //     }
    //   } 
    // })
    )
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  
  render() {
    console.log('state= ', this.state);
    return (
      <section className="tile is-5 is-parent" id="search">
          <form 
          id="search-from"
          onSubmit={(e) => {
            e.preventDefault();
            e.target.value = "";
            return this.getInfo();
          }} 
        >
          <input
            className="input"
            id="search-input"
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            />
  
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="food">Food</option>
              <option value="drinks">Drinks</option>
              {/* <option value="music">Music</option>
              <option value="movies">Movies/Visual Arts</option> */}
            </select>

            <div id="search-bar-buttons">
              <button onClick={() => this.setState({events: false})} className="button is-dark" id="search-submit" type='submit' name='submit'>Search</button>
              {/* <button onClick={() => this.setState({events: true})} className="button is-dark" id="search-events" type='submit' name='submit'>Events</button> */}
            </div>
          {/* <button onClick={() => this.props.suggest('random')} className="button is-primary" id="search-suggest" type='button' name='Suggest'>Random</button> */}
        </form>
      </section>
    )
  }
}


export default Search;


// const API_URL = "https://api.yelp.com/v3/businesses/search"

// const yelp = require('yelp-fusion');
// const client = yelp.client(process.env.REACT_APP_API_KEY);
//     client.search({
//         term: 'True Food Kitchen',
//         location: 'chicago',
//     }).then(response => {
//         console.log(response.jsonBody.businesses[0].name);
//     }).catch(e => {
//         console.log(e);
//     });

//   getInfo = () => {
  
  //   }
  //   getInfo = () => {
    //     axios.get(API_URL, {
      //         headers: {'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`}, 
      //         params: {term: this.state.query}
      //     })
      //       .then(({ data }) => {
        //         this.setState({
          //           results: data                            
          //         })
                    //       })
                    //   }
                    
                        // getInfo = () => {
                        //     fetch(API_URL, {
                        //         mode: 'no-cors',
                        //         headers: {Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`},
                        //         params: {term: this.state.query}
                        //     }).then(resp => resp.json).then(console.log)
                        // }
