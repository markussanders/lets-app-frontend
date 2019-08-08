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
        if (this.props.searched) {
            let venues = this.props.searched.length >= 1 ? this.props.searched : this.state.venues;
            let uniqueVenues = uniqBy(venues, 'name')
            return uniqueVenues.map(venue => {
               return <VenueCard venue={venue} key={venue.id} updateSelectedVenue={this.props.updateSelectedVenue}/>
            })
        }
    }

    render() {
        return (
            <div className="tile is-12 is-parent">
                {this.createVenueCards()}
            </div>
            
        )
    }
}

export default CardsContainer;