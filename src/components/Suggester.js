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
          console.log(user['search_history'])
          let format = String(user['search_history']).replace(/=>/g, ':');
          let parsed = JSON.parse(format);
          console.log(parsed)
          console.log('parsed ====================', parsed);
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
          console.log('user.searchHistory', this.state.userSearchHistory)
          let foodHistory = (this.state.userSearchHistory['food']['food'] || sample);
          let sortedFoods = Object.keys(foodHistory).sort((a, b) => foodHistory[b] - foodHistory[a]);
          let topThreeFoods = take(sortedFoods, 3);
          console.log('top 3 foods = ', topThreeFoods);
          let foodSuggestion = topThreeFoods[Math.floor(Math.random() * topThreeFoods.length)];
          console.log('Food suggestion = ', foodSuggestion);
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
            "Dive Bars": 1,
            "Lounges": 3,
            "Venues & Event Spaces": 2,
            "Wine Bars": 1,
          }
          let drinksHistory = this.state.userSearchHistory['drinks']['drinks'];
          let sortedDrinks = Object.keys(drinksHistory).sort((a, b) => drinksHistory[b] - drinksHistory[a]);
          let topFiveDrinks = take(sortedDrinks, 5);
          console.log('top 3 = ', topFiveDrinks);
          let drinksSuggestion = topFiveDrinks[Math.floor(Math.random() * topFiveDrinks.length)];
          this.setState({
            query: drinksSuggestion
          });
          this.search(drinksSuggestion);
          break;
        default: 
          console.log('DEFAULT');
      }
    }

    // passSearch = term => {

    // }

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
      console.log('result = ', result);
      this.setState({results: result});
      console.log('search state = ', this.state);
      this.props.updateSearched(this.state);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   suggest = term => {
  //       switch (term) {
  //           case 'food':
  //             this.setState({events: false});
  //             if (this.state.currentUserMostSearched) {
  //               let foodSearches = this.filterSearches(this.state.userSearches, 'food');
  //               let mostFrequent = this.getMostFrequentSearch(foodSearches);
  //               this.search(false, mostFrequent, 'food');
  //             } else {  
  //               let foods = ['pizza', 'food', 'pasta', 'chicken', 'burger', 'nachos', 'hotdog', 'fries', 'ice cream', 'burrito'];
  //               this.search(false,foods[Math.floor(Math.random() * foods.length)]);
  //             }
  //           break;

  //           case 'drinks':
  //             this.setState({events: false});
  //             if (this.state.currentUserMostSearched) {
  //               let barSearches = this.filterSearches(this.state.userSearches, 'drinks');
  //               console.log('BARSEARCHES = ', barSearches);
  //               let mostFrequent = this.getMostFrequentSearch(barSearches);
  //               console.log('MOSTFREQ = ', mostFrequent);
  //               this.search(false, mostFrequent, 'drinks');
  //             } else {
  //               let bars = ['beer', 'wine', 'cocktails', 'tequila', 'vineyard', 'brewery', 'bar', 'pub', 'cocktail lounge', 'rooftop bar'];
  //               this.search(false,bars[Math.floor(Math.random() * bars.length)]);
  //             }
  //           break;

  //           // case 'concerts':
  //           //   this.setState({events: true});
  //           //   let concerts = ['music', 'classical', 'rap', 'hip-hop', 'pop', 'musical', 'show', 'recital', 'show']
  //           //   this.search(true, concerts[Math.floor(Math.random() * concerts.length)]);
  //           // break;

  //           // case 'performances':
  //           //   this.setState({events: true});
  //           //   let performances = ['comedian', 'player', 'fire-breather', 'karaoke', 'performance', 'live', 'performer'];
  //           //   this.search(true,performance[Math.floor(Math.random() * performances.length)]);             
  //           // break;

  //           default:
  //           return null;
  //       }
  // }

  // fetchSearches = () => {
  //   if (this.state.currentUser) {
  //     fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
  //       .then(resp => resp.json())
  //       .then(user => {
  //         this.setState({currentUserMostSearched: true, userSearches: user.searches});
  //       })
  //       console.log('GOT HERE', this.state)
  //   } else {
  //     fetch('http://localhost:3000/searches')
  //       .then(resp => resp.json())
  //       .then(searches => this.getMostFrequentSearch(searches));
  //       this.setState({currentUserMostSearched: false});
  //   }
  // }

  // getMostFrequentSearch = searches => {

  //   const count = searches.reduce((count, term) => {
  //     count[term.content] = (count[term.content] || 0) + 1;
  //     return count;
  //   }, {});
  //   // const mostFrequent = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
  //   const mostFrequent = Object.keys(count).sort((a, b) => count[b] - count[a]);

  //   console.log(mostFrequent, Object.keys(count));
    
  //   if (mostFrequent) {
  //     this.setState({mostFrequent: mostFrequent[0]});
  //   } 
  //   return mostFrequent[0];
  // }

  // filterSearches = (searches, term) => {
  //   return searches.filter(search => search.category === term);
  // }

  // search = async (isEvent=false, content=this.state.mostFrequent, category='all') => {
  //    const resp = await fetch('http://localhost:3000/searches', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       content: content,
  //       user_id: (this.state.currentUser.id || 1),
  //       is_event: isEvent,
  //       category: category
  //     })
  //   });
  //   const result = await resp.json();
  //   console.log('result = ', result);
  //   this.setState({results: result});
  //   console.log('search state = ', this.state);
  //   this.props.updateSearched(this.state);
  // }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                }} onClick={() => alert('Coming soon!')}>LISTEN</li>
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