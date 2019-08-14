import React from 'react';
import VenueCard from '../components/VenueCard';
import uniqBy from 'lodash/uniqBy';


class CardsContainer extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            venues: [],
            searched: this.props.searched,
        }
    }

    componentDidMount() {
        this.fetchVenues();
    }

    fetchVenues() {
        fetch('http://localhost:3000/venues')
            .then(resp => resp.json())
            .then(venues => this.setState({venues}))
    }

    fetchSearches = () => {
        fetch('http://localhost:3000/searches')
            .then(resp => resp.json())
            .then(searches => this.filterSearches(searches));
    }

    filterSearches = searches => {
        // searches.filter(searches => {})
    }

    updateSearchedC = term => {
            fetch('http://localhost:3000/searches', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: term,
            user_id: 3, 
        })
        })
        .then(resp => resp.json())
        .then(results => {
            this.setState({venues: results});
            console.log('this.state.results = ', this.state.results)
        })

    }

    createVenueCards() {
        if (this.props.searched) {
            let venues = this.props.searched.length >= 1 ? this.props.searched : this.state.venues;
            let uniqueVenues = uniqBy(venues, 'name')
            return uniqueVenues.map(venue => {
               return <VenueCard venue={venue} key={venue.id} updateSelectedVenue={this.props.updateSelectedVenue} updateSearched={this.updateSearchedC}/>
            })
        }
    }

    render() {
        return (
            <div className="" id="cards-container">
                <h1 className="Title">Trending</h1>
                <div className="columns is-multiline is-mobile is-centered">
                    {this.createVenueCards()}
                </div>
            </div>
        )
    }
}

export default CardsContainer;