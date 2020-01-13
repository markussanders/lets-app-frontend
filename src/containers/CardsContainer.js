import React from 'react';
import VenueCard from '../components/VenueCard';
import uniqBy from 'lodash/uniqBy';
import EventCard from '../components/EventCard';


class CardsContainer extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser || JSON.parse(localStorage.getItem('user')),
            venues: [],
            searchResults: this.props.searchResults || JSON.parse(localStorage.getItem('searchResults')),
            noResults: this.props.noResults,
            query: this.props.query,
            value: 'relevance',
            events: this.props.selectedEvents
        }
        this.ref = React.createRef()
    }

    // componentDidMount() {
    //     // this.fetchVenues();
    // }

    // fetchVenues() {
    //     fetch('http://localhost:3000/venues')
    //         .then(resp => resp.json())
    //         .then(venues => {
    //             console.log('venues', venues);
    //             this.setState({venues})
    //         })
    // }

    // fetchSearches = () => {
    //     fetch('http://localhost:3000/searches')
    //         .then(resp => resp.json())
    //         .then(searches => this.filterSearches(searches));
    // }

    // filterSearches = searches => {
    //     console.log('FILTER')
    //     // return searches.filter(search => search.categoery === this.state.value);
    // }

    sortVenues = venues => {
        let param = this.state.value;
        if (param === 'rating') {
            let sorted = venues.sort((a, b) => (b.rating - a.rating));
            return sorted;
        } else if (param === 'name') {
            let sorted = venues.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            return sorted;
        } else if (param === 'reverse') {
            let sorted = venues.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : -1);
            return sorted;
        } else {
             return uniqBy(venues, 'name');
        }
    }

    updateSearchedC = term => {
        fetch('http://localhost:3000/searches', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: term,
                user_id: this.state.currrentUser.id, 
            })
        })
        .then(resp => resp.json())
        .then(results => {
            this.setState({
                venues: results, 
                query: term, 
                searchResults: results
            }); 
            window.scrollTo(0, this.ref.current.offsetTop);
        })

    }

    createVenueCards() {
        if (this.props.searchResults) {
            let venues = this.props.searchResults;
            let uniqueVenues = uniqBy(venues, 'name');
            let sortedVenues = this.sortVenues(uniqueVenues);
            return sortedVenues.map(venue => {
               return <VenueCard venue={venue} key={venue.id} updateSelectedVenue={this.props.updateSelectedVenue} updateSearched={this.updateSearchedC}/>
            })
        }
    }

    createEventCards() {
        if (this.props.searchResults) {
            let events = this.props.searchResults;
            events = uniqBy(events, 'name');
            return events.map(event => {
                return event.logo.url ? <EventCard event={event} key={event.id} updateSelectedEvent={this.props.updateSelectedEvent} /> : null;
            })
        }
    }
    handleChange = event => {
        this.setState({value: event.target.value});
        // this.sortVenues(this.state.venues);
    }

    render() {
        return (
            <div className="" id="cards-container" ref={this.ref}>
                { this.props.searchResults.length >= 1 ?
                    <div>
                        <div id="results-container">
                            <h2 id="showing-results-for">{`SHOWING RESULTS FOR "${this.state.query}"`}</h2>
                        </div> 
                        <div id="sort-by-dropdown">
                            <h6 id="sort-by">Sort by: </h6>
                            <select id="select" value={this.state.value} onChange={this.handleChange}>
                                <option value="relevance">--</option>
                                <option value="rating">Rating</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="reverse"> Name (Z- A)</option>
                            </select>
                        </div>
                        {/* <div className = "columns is-multiline is-mobile is-centered">
                            {this.createVenueCards()}
                        </div>                        */}
                        {this.props.selectedEvents ?
                        <div id="event-cards-container">
                            {this.createEventCards()}
                        </div>
                        :
                        <div className = "columns is-multiline is-mobile is-centered">
                            {this.createVenueCards()}
                        </div>
                        }}
                    </div>
                : null
            }
    
            </div>
        )
    }
}

export default CardsContainer;