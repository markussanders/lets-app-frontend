import React from 'react';
import VenueCard from '../components/VenueCard';

class SavedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            savedList: null,
            filtered: null,
        }
    }

    componentWillMount() {
        fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
            .then(resp => resp.json())
            .then(user => this.setState({savedList: user.saved_lists}))
        fetch('http://localhost:3000/venues')
            .then(resp => resp.json())
            .then(venues => this.filterVenues(venues))
    }

    filterVenues = venues => {
        if (this.state.savedList) {
            let ids = this.state.savedList.map(item => item.venue_id);
            let filtered = venues.filter(venue => ids.includes(venue.id));
            this.setState({filtered})
        }
    }

    deleteSaved = venue => {
        let target = this.state.savedList.find(saved => saved.venue_id === venue.id);
        console.log('TARGET = ', target);
        fetch(`http://localhost:3000/saved_lists/${target.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.state.currentUser.id,
                venue_id: venue.id,
            })
        }).then(resp => resp.json()).then(console.log)
    }

    markCompleted = venue => {
        let target = this.state.savedList.find(saved => saved.venue_id === venue.id);
        fetch(`http://localhost:3000/saved_lists/${target.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: true,
            })
        }).then(resp => resp.json()).then(console.log)
    }

    createVenueCards = () => {
       if (this.state.filtered) {
            return this.state.filtered.map(venue => {
                return <VenueCard venue={venue} key={venue.id} deleteSaved={this.deleteSaved} markCompleted={this.markCompleted}/>
            })
       }
    }

    render() {
        console.log(this.state)
        return (
            <div id="saved-list-container">
                {this.createVenueCards()}
            </div>
        )
    }

}

export default SavedList;