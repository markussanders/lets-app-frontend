import React, { Component } from 'react';
// import axios from 'axios'


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      events: true,
    }
  }

  getInfo = () => {
    console.log('AT GETINFO ',this.state);
    fetch('http://localhost:3000/searches', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: this.state.query,
        user_id: (this.props.currentUser.id || 1),
        is_event: this.state.events, 
      })
    })
      .then(resp => resp.json())
      .then(results => {
        this.setState({results});
        console.log('this.state = ', this.state)
        this.props.updateSearched(this.state);
        this.props.query(this.state.query);
      })
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

  
  render() {
    return (
      <section className="tile is-5 is-parent" id="search">
          <form 
          id="search-from"
          onSubmit={(e) => {
            e.preventDefault();
            e.target.value = "";
            return this.getInfo(this.state.events);
          }} 
        >
          <input
            className="input"
            id="search-input"
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            />
            <p>IN</p>
            <div id="search-bar-buttons">
              <button onClick={() => this.setState({events: false})} className="button is-dark" id="search-submit" type='submit' name='submit'>Venues</button>
              <button onClick={() => this.setState({events: true})} className="button is-dark" id="search-events" type='submit' name='submit'>Events</button>
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
