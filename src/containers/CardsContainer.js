import React from 'react';
import VenueCard from '../components/VenueCard';
import uniqBy from 'lodash/uniqBy';
import EventCard from '../components/EventCard';


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
                user_id: this.props.currentUser.id , 
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

    createEventCards() {
        if (this.props.searched) {
            let events = this.props.searched;
            let uniqueEvents = uniqBy(events, 'description')
            uniqueEvents = uniqBy(uniqueEvents, 'business_id')
            console.log('UNIQUE EVENT = ', uniqueEvents);
            return uniqueEvents.map(event => {
                return <EventCard event={event} key={event.id} updateSelectedEvent={this.props.updateSelectedEvent} />
            })
        }
    }

    render() {
        return (
            <div className="" id="cards-container">
                {this.props.searched.length > 1?
                    <div id="results-container">
                        <h2 id="showing-results-for">{`SHOWING RESULTS FOR "${this.props.query}"`}</h2>
                    </div> : <h1 id="trending">TRENDING: </h1 >
                }
                <div className="columns is-multiline is-mobile is-centered">
                    {this.props.selectedEvents ? this.createEventCards() : this.createVenueCards()}
                </div>
            </div>
        )
    }
}

export default CardsContainer;