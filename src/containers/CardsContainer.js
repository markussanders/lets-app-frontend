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

    createVenueCards() {
        let venues = this.state.searched ? this.props.searched : this.state.venues;
        let uniqueVenues = uniqBy(venues, 'name')
        console.log('Uniqvenues = ', uniqueVenues);
        return uniqueVenues.map(venue => {
           return <VenueCard venue={venue} key={venue.id} />
        })
    }

    render() {
        return (
            <div id="venue-cards-container">
                {this.createVenueCards()}
            </div>
            
        )
    }
}

export default CardsContainer;