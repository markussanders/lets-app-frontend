import React from 'react';
import VenueCard from '../components/VenueCard';
import uniqBy from 'lodash/uniqBy';
import EventCard from '../components/EventCard';


class CardsContainer extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            currentUser: (this.props.currentUser || JSON.parse(localStorage.getItem('user'))),
            venues: [],
            searched: this.props.searched,
            query: this.props.query,
            value: 'relevance',
        }
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.fetchVenues();
    }

    fetchVenues() {
        fetch('http://localhost:3000/venues')
            .then(resp => resp.json())
            .then(venues => {
                console.log('venues', venues);
                this.setState({venues})
            })
    }

    fetchSearches = () => {
        fetch('http://localhost:3000/searches')
            .then(resp => resp.json())
            .then(searches => this.filterSearches(searches));
    }

    filterSearches = searches => {
        console.log('FILTER')
        // return searches.filter(search => search.categoery === this.state.value);
    }

    sortVenues = venues => {
        let param = this.state.value;
        if (param === 'rating') {
            let sorted = venues.sort((a, b) => (b.rating - a.rating));
            console.log('sorted rating =',sorted)
            return sorted;
        } else if (param === 'name') {
            let sorted = venues.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            console.log('sorted name =',sorted)
            return sorted;
        } else if (param === 'reverse') {
            let sorted = venues.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : -1);
            console.log('sorted reverse =',sorted);
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
                user_id: this.state.currneUser ? this.state.currentUser.id : 1, 
            })
        })
        .then(resp => resp.json())
        .then(results => {
            this.setState({
                venues: results, 
                query: term, 
                searched: results
            });
            window.scrollTo(0, this.ref.current.offsetTop);
        })

    }

    createVenueCards() {
        if (this.props.searched || this.state.venues) {
            let venues = this.props.searched.length >= 1 ? this.props.searched : this.state.venues;
            let uniqueVenues = uniqBy(venues, 'name');
            let sortedVenues = this.sortVenues(uniqueVenues);
            return sortedVenues.map(venue => {
               return <VenueCard venue={venue} key={venue.id} updateSelectedVenue={this.props.updateSelectedVenue} updateSearched={this.updateSearchedC}/>
            })
        }
    }

    createEventCards() {
        if (this.props.searched) {
            let events = this.props.searched;
            let uniqueEvents = uniqBy(events, 'description');
            uniqueEvents = uniqBy(uniqueEvents, 'business_id');
            return uniqueEvents.map(event => {
                return <EventCard event={event} key={event.id} updateSelectedEvent={this.props.updateSelectedEvent} />
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
                {this.state.searched.length > 1?
                    <div id="results-container">
                        <h2 id="showing-results-for">{`SHOWING RESULTS FOR "${this.state.query}"`}</h2>
                    </div> : <h1 id="trending">TRENDING: </h1 >
                }
                <div id="sort-by-dropdown">
                    <h6 id="sort-by">Sort by: </h6>
                    <select id="select" value={this.state.value} onChange={this.handleChange}>
                        <option value="relevance">--</option>
                        <option value="rating">Rating</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="reverse"> Name (Z- A)</option>
                    </select>
                </div>

                {this.props.selectedEvents ?
                <div id="event-cards-container">
                     {this.createEventCards()}
                </div>
                :
                <div className = "columns is-multiline is-mobile is-centered">
                     {this.createVenueCards()}
                </div>
                }
            </div>
        )
    }
}

export default CardsContainer;