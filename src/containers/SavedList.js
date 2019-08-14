import React from 'react';
import VenueCard from '../components/VenueCard';
import Completed from '../components/Completed';

class SavedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            savedList: null,
            completed: [],
            allSaved: [],   
        }
    }

    componentWillMount() {
        fetch(`http://localhost:3000/saved_lists`)
        .then(resp => resp.json())
        .then(items => {
            this.setState({allSaved: items});
            console.log(items)
            let completed = items.filter(item => item.completed && item.user_id === this.state.currentUser.id);
            console.log(completed);
            this.setState({completed});
        })
        fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
            .then(resp => resp.json())
            .then(user => this.setState({savedList: user.venues}))
    }

    deleteSaved = venue => {
        let target = this.state.allSaved.find(saved => saved.venue_id === venue.id);
        console.log(venue, target);
        fetch(`http://localhost:3000/saved_lists/${target.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.state.currentUser.id,
                venue_id: venue.id,
            })
        }).then(resp => resp.json()).then(message => {
            this.setState({savedList: this.state.savedList.filter(el => el.id !== venue.id)})
        })
    }

    markCompleted = venue => {
        let target = this.state.allSaved.find(saved => saved.venue_id === venue.id && saved.user_id === this.state.currentUser.id);
        let date = new Date().toLocaleDateString();
        fetch(`http://localhost:3000/saved_lists/${target.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: true,
                venue_id: venue.id,
                completed_on: date,
            })
        }).then(resp => resp.json()).then(result => {
            this.setState({completed: [...this.state.completed, result.venue]})
        })
    }

    updateState = array => {
        this.setState({savedList: array})
    }

    createVenueCards = () => {
        let completedIDs = this.state.completed.map(venue => venue.id);
        let savedIDs = this.state.savedList.map(venue => venue.id);
        let notCompleted = savedIDs.filter(el => !completedIDs.includes(el) );
        let venues = this.state.savedList.filter(el => notCompleted.includes(el.id));
        return venues.map(venue => {
            return <VenueCard venue={venue} key={venue.id} deleteSaved={this.deleteSaved} markCompleted={this.markCompleted}/> 
        })
    }

    renderCompleted = () => {
        return this.state.completed.map(venue =>  {
            return <Completed key={venue.id} venue={venue} />
        })
    }

    render() {
        return (
            <div id="saved-list-page">
                <h2 id="your-list">YOUR LIST</h2>
                <div id="saved-completed-containers">
                    <div id="completed-container">
                        <h3 id="done">DONE</h3>
                        {this.state.savedList ? this.renderCompleted() : null}
                    </div>
                    < div id = "saved-list-container" >
                        {this.state.savedList ? this.createVenueCards() : null}
                    </div>
                </div>
            </div>
        )
    }

}

export default SavedList;