import React, { Component } from 'react';
// import axios from 'axios'


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    }
  }

  getInfo = () => {
    fetch('http://localhost:3000/searches', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: this.state.query,
        user_id: 1, 
      })
    })
      .then(resp => resp.json())
      .then(results => {
        console.log(" results = ", results);
        this.setState({results});
        console.log('this.state.results = ', this.state.results)
        this.props.updateSearched(this.state.results);
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
      <form 
        className="input"
        onSubmit={(e) => {
          e.preventDefault()
          return this.getInfo()
        }} 
      >
        <input
          className="input"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          />
        <input className="button is-dark" type='submit' name='submit' />
      </form>
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
