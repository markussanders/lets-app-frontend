import React from 'react';



class Suggester extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            currentUserMostSearched: false,
            mostFrequent: '',
            events: false,
        };
        this.fetchSearches();
    }

    suggest = term => {
        switch (term) {

            case 'food':
              this.setState({events: false});
              let foods = ['pizza', 'food', 'pasta', 'chicken', 'burger', 'nacho', 'hotdog', 'fries', 'ice cream', 'burrito'];
              this.search(foods[Math.floor(Math.random() * foods.length)]);
            break;

            case 'bars':
              this.setState({events: false});
              let bars = ['beer', 'wine', 'cocktails', 'tequila', 'vineyard', 'brewery', 'bar', 'pub', 'cocktail lounge', 'rooftop bar'];
              this.search(bars[Math.floor(Math.random() * bars.length)]);
            break;

            case 'concerts':
              this.setState({events: true});
              this.search('music');
            break;

            case 'restaurants': 
            break;

            case 'random':
            break;

            default:
            return null;
        }
  }

  fetchSearches = () => {
    if (this.state.currentUser) {
      fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
        .then(resp => resp.json())
        .then(user => {
          this.setState({currentUserMostSearched: true});
          this.getMostFrequentSearch(user.searches);
        })
    } else {
      fetch('http://localhost:3000/searches')
        .then(resp => resp.json())
        .then(searches => this.getMostFrequentSearch(searches));
        this.setState({currentUserMostSearched: false});
    }
  }

  getMostFrequentSearch = searches => {

    const count = searches.reduce((count, term) => {
      count[term.content] = (count[term.content] || 0) + 1;
      return count;
    }, {});

    const mostFrequent = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    console.log(mostFrequent)
    if (mostFrequent) {
      this.setState({mostFrequent});
    } 
  }

  search = async (content=this.state.mostFrequent) => {
    console.log(this.state);
    console.log(content);
     const resp = await fetch('http://localhost:3000/searches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: content,
        user_id: (this.state.currentUser.id || 1),
        is_event: this.state.events,
      })
    });
    const result = await resp.json();
    return result;
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
                }} onClick={() =>this.suggest('bars')}>DRINK</li>
                <li className="suggester-option" id="listen-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://www.bumpclubandbeyond.com/wp-content/uploads/2018/05/concert-3387324_960_720-960x420.jpg')
                }} onClick={() => this.suggest('concerts')}>LISTEN</li>
                <li className="suggester-option" id="watch-button" onMouseEnter={()=> {
                    this.props.updateBackgroundImage('https://www.signatureliving.co.uk/wp-content/uploads/2019/03/Fire-breathing-Voodoo.jpg')
                }} onClick={() => this.suggest('performances')}>WATCH</li>
                {/* <div className="random-bg has-background-primary" id="image-container"></div> */}
            </ul>
        </div>
    )

    }
}


export default Suggester;