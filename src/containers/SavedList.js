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
        fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
            .then(resp => resp.json())
            .then(user => this.setState({savedList: user.venues}))
        fetch(`http://localhost:3000/saved_lists`)
            .then(resp => resp.json())
            .then(items => {
                this.setState({allSaved: items})
                let completed = items.filter(item => item.completed && item.user_id === this.state.currentUser.id);
                console.log('COMPLETED ===', completed);
                this.setState({completed});
            })
    }

    deleteSaved = venue => {
        let target = this.state.allSaved.find(saved => saved.venue_id === venue.id);
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
        console.log('venue.id = ', venue.id)
        console.log('this.state =', this.state)
        let target = this.state.allSaved.find(saved => saved.venue_id === venue.id && saved.user_id === this.state.currentUser.id);
        console.log('target= ', target);
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
            this.setState({completed: [...this.state.completed, result.venue]});
        })
    }

    createVenueCards = () => {
       if (this.state.savedList) {
            return this.state.savedList.map(venue => {
                return <VenueCard venue={venue} key={venue.id} deleteSaved={this.deleteSaved} markCompleted={this.markCompleted}/>
            })
       }
    }

    renderCompleted = () => {
        if (this.state.completed) {
            return this.state.completed.map(item => {
                return (
                    <Completed venue={item}/>
                )
            })
        }
    }


    render() {
        console.log(this.state)
        return (
            <div id="saved-list-page">
                <h2 id="your-list">YOUR LIST</h2>
                <div id="saved-completed-containers">
                    < div id = "saved-list-container" >
                        {this.createVenueCards()}
                    </div>
                    <div id="completed-container">
                        <h3 id="done">DONE</h3>
                        {this.renderCompleted()}
                    </div>
                </div>
            </div>
        )
    }

}

export default SavedList;