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
    fetch('https://www.eventbriteapi.com/v3/users/me/?token=7U7O53E6ZSUCFGW5LE7H')
      .then(resp => resp.json()).then(console.log);
  }

  getInfo = () => {
    this.setState({events: false})
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
  // relaySearch = () => {
  //   // this.state.events ? this.searchEvent() : this.getInfo();
  //   switch (this.state.value) {
  //     case 'food': 
  //       this.getInfo();
  //       break;
  //     case 'drinks':
  //       this.getInfo();
  //       break;
  //     case 'music':
  //       this.eventSearch();
  //       break;
  //     default:
  //       console.log('DEFAULT');
  //   }
  // }

  // eventSearch = () => {
  //   fetch("https://www.eventbriteapi.com/v3/events/search/?location.address=Chicago%2C+IL&categories=103&token=46SWBQRPGACYPFBEUHZF")
  //     .then(resp => resp.json())
  //     .then(results => this.setState({results: results.events}))
  // }

  recordCategories = searchResults => {
    let searchCategories = {};
    let categoriesCount = {};
    searchResults.forEach(result => {
      result.categories.forEach(category => {
        categoriesCount[category.title] = (categoriesCount[category.title] || 0) + 1;
      })
    })
    searchCategories[this.state.value] = categoriesCount;
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
              {/* <option value="music">Music</option> */}
              {/*<option value="movies">Movies/Visual Arts</option> */}
            </select>

            <div id="search-bar-buttons">
              <button onClick={() => this.setState({events: false})} className="button is-dark" id="search-submit" type='submit' name='submit'>Search</button>
            </div>
        </form>
      </section>
    )
  }
}

export default Search;