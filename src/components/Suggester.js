import React from 'react';
import take from 'lodash/take';




class Suggester extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: (this.props.currentUser || { id: 1, token: null }),
            currentUserMostSearched: false,
            userSearchHistory: '',
            mostFrequent: '',
            events: false,
            results: [],
            query: '',
        };
    }
    componentDidMount() {
      this.fetchUserSearchHistory();
    }


    fetchUserSearchHistory() {
      fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
        .then(resp => resp.json()).then(user => {
          let format = String(user['search_history']).replace(/=>/g, ':');
          let parsed = JSON.parse(format);
          this.setState({userSearchHistory: parsed});
        })
    }
  
    suggest = term => {
      switch (term) {
        case 'food':
          let sample = {
            "Salad" : 14,
            "Vegetarian" : 11,
            "American (New)" : 5,
            "Vegan" : 4,
            "Gluten-Free" : 5,
            "Asian Fusion" :1,
            "Cafes" :  1,
            "Breakfast & Brunch" : 1,
            "Burgers" : 2,
            "Sandwiches":  3,
            "Juice Bars & Smoothies" : 1,
            "Wraps" : 1,
            "Fast Food" : 2,
            "Poke" : 1,
            "Sushi Bars" : 1,
            "Delis" : 1
          }
          let foodHistory = this.state.userSearchHistory['food'] ? this.state.userSearchHistory['food']['food'] : sample ;
          let sortedFoods = Object.keys(foodHistory).sort((a, b) => foodHistory[b] - foodHistory[a]);
          let topThreeFoods = take(sortedFoods, 3);
          let foodSuggestion = topThreeFoods[Math.floor(Math.random() * topThreeFoods.length)];
          this.setState({
            query: foodSuggestion
          });
          this.search(foodSuggestion);
          break;
        case 'drinks':
          let sampleDrinks = {
            "American(New)": 4,
            "American(Traditional)": 1,
            "Bars": 4,
            "Beer Bar": 1,
            "Burgers": 1,
            "Cocktail Bars": 15,
            'Distilleries': 1,
            "Dive Bars": 4,
            "Lounges": 3,
            "Wine Bars": 1,
          }
          let drinksHistory = this.state.userSearchHistory['drinks'] ? this.state.userSearchHistory['drinks']['drinks'] : sample;
          let sortedDrinks = Object.keys(drinksHistory).sort((a, b) => drinksHistory[b] - drinksHistory[a]);
          let topFiveDrinks = take(sortedDrinks, 5);
          let drinksSuggestion = topFiveDrinks[Math.floor(Math.random() * topFiveDrinks.length)];
          this.setState({
            query: drinksSuggestion
          });
          this.search(drinksSuggestion);
          break;
        case 'music': 
          alert('Coming soon!')
          break;
        default: 
      }
    }

    eventSearch = category => {
      fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=Chicago%2C+IL&categories=${category}&token=46SWBQRPGACYPFBEUHZF`)
        .then(resp => resp.json())
        .then(eventResults => {
          this.setState({
            results: eventResults.events,
            events: true,
            noResults: '',
            query: 'Music & Concerts',
          });
          this.props.updateSearched(this.state);
        })
    }

    search = async (suggestion) => {
        const resp = await fetch('http://localhost:3000/searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: suggestion,
          user_id: this.props.currentUser.id,
        })
      });
      const result = await resp.json();
      this.setState({results: result});
      this.props.updateSearched(this.state);
    }

    render() {
        return (
        <div id="suggester-container">   
            <h2 className="title is-3" id="i-want-to">LET'S... </h2>
            <ul id="suggester-options">
                <li className="suggester-option" id="eat-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://cdn.shopify.com/s/files/1/0690/5295/files/dinner_outfits_party_outfit_2048x2048.jpg?687698953360450850')
                }} onClick={() => this.suggest('food')}>EAT</li>
                <li className="suggester-option" id="drink-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://washington-org.s3.amazonaws.com/s3fs-public/friends-drinking-cocktails-at-night-on-the-o-ku-rooftop_ddc-photo.jpg')
                }} onClick={() =>this.suggest('drinks')}>DRINK</li>
                <li className="suggester-option" id="listen-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://www.bumpclubandbeyond.com/wp-content/uploads/2018/05/concert-3387324_960_720-960x420.jpg')
                }} onClick={() => this.suggest('music')}>LISTEN</li>
                <li className="suggester-option" id="watch-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://www.signatureliving.co.uk/wp-content/uploads/2019/03/Fire-breathing-Voodoo.jpg')
                }} onClick={() => alert('Coming soon!')}>WATCH</li>
                {/* <div className="random-bg has-background-primary" id="image-container"></div> */}
            </ul>
        </div>
    )

    }
}


export default Suggester;