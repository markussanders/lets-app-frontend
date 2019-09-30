import React from 'react';
import VenueCard from '../components/VenueCard';
import Completed from '../components/Completed';
import backbutton from '../backbutton.png';


class SavedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.user),
            savedList: null,
            completed: [],
            incomplete: [],
            userItems: [],  
            yay: false,
            whoops: false, 
        }
    }

    componentDidMount() { 
        this.fetchUserSavedList();
        this.fetchAllSavedList();
    }

    fetchUserSavedList() {
        fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
            .then(resp => resp.json())
            .then(user => this.setState({savedList: user.venues}))

    }

    fetchAllSavedList() {
        fetch(`http://localhost:3000/saved_lists`)
        .then(resp => resp.json())
        .then(items => {
            console.log(items)
            let userItems = items.filter(item => item.user_id === this.state.currentUser.id);
            this.setState({userItems});
            console.log(userItems);
            let completed = this.state.userItems.filter(item => item.completed);
            let incomplete = this.state.userItems.filter(item => !item.completed);
            this.setState({incomplete, completed})
        })
    }

    deleteSaved = venue => {
        let target = this.state.incomplete.find(saved => saved.venue_id === venue.id);
        console.log(venue, this.state.incomplete, target);
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
        // this.setState({yay: true});
        let target = this.state.incomplete.find(saved => saved.venue_id === venue.id);
        console.log(venue)
        console.log(this.state);
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
            console.log('RESULT +', result)
            this.setState({
                completed: [...this.state.completed, result.saved_list],
                incomplete: this.state.incomplete.filter(el => el.venue_id !== result.venue.id)
            })
        })
    }

    updateState = array => {
        this.setState({savedList: array})
    }

    createVenueCards = () => {
        let incompletedIDs = this.state.incomplete.map(el => el.venue_id);
        let venues = this.state.savedList.filter(el => incompletedIDs.includes(el.id));
        if (venues.length === 0 ) {
            return (
                <div>
                    <h2 id="empty-saved-list">Your list is currently empty!</h2>
                    <h4 id="empty-saved-prompt">Businesses you've saved will show up here.</h4>
                </div>
            )
        }
        return venues.map(venue => {
            return <VenueCard venue={venue} key={venue.id} deleteSaved={this.deleteSaved} markCompleted={this.markCompleted}/> 
        })
    }

    renderCompleted = () => {
        let sortedCompleted = this.state.completed.sort((a, b) => a.created_at < b.created_at ? -1 : 1)
        let completedIDs = sortedCompleted.map(el => el.venue_id);
        console.log('this.state.completed', this.state.completed);
        let userCompleted = this.state.completed;
        let venues = this.state.savedList.filter(el => completedIDs.includes(el.id));
        return venues.map(venue =>  {
            return <Completed key={venue.id} venue={venue} markIncomplete={this.markIncomplete} userCompleted={userCompleted}/>
        })
    }
    
    markIncomplete = (venue, record) => {
        // this.setState({whoops: true});
        console.log('state completed before', this.state.completed);
        fetch(`http://localhost:3000/saved_lists/${record.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: false,
            })
        }).then(resp => resp.json()).then(result => {
            console.log(result);
            this.setState({
                incomplete: [...this.state.incomplete, result],
                completed: this.state.completed.filter(el => el.id !== result.saved_list.id),
                userItems: this.state.completed.concat(this.state.incomplete)
            })
        }).then(this.fetchUserSavedList(), this.fetchAllSavedList())
    }

    render() {
        return (
            <div id="saved-list-page">
            <div className="back-button-container"  onClick={() => this.props.history.goBack()}><img src={backbutton} alt="" className="back-button"/>GO BACK</div>
                <h2 id="your-list">YOUR LIST</h2>
                <div id="saved-completed-containers">
                    <div id = "saved-list-container" >
                        {this.state.savedList ? this.createVenueCards() : null}
                    </div>
                    <div id="completed-container">
                        <h3 id="done">DONE</h3>
                        {this.state.savedList ? this.renderCompleted() : null}
                    </div>
                </div>
            </div>
        )
    }

}

export default SavedList;