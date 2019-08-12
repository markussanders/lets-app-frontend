import React from 'react';

class VenueShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            venue: this.props.venue,
        };
    }


    renderPhotos = venue => {
        console.log('VENUE PHOTOS ==', venue)
        let photos = JSON.parse(venue.venue.photos)
        return photos.map(photo => {
           return <img src={photo} alt={venue.name} key={photo}/>
        })
    }
    renderReviews = venue => {
        console.log('VENUE REVIEWS ==', venue)
        return venue.reviews.map(review => {
            return (
                <div key={review.id}>
                    <h2>Rating: {review.rating}</h2>
                    <p>{review.text}</p>
                    <h6>{review.user.name}</h6>
                </div>
            )
        })
    }

    saveVenue = () => {
        fetch('http://localhost:3000/saved_lists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                venue_id: this.state.venue.venue.id
            })
        }).then(resp => resp.json()).then(console.log);
    }
    

    render () {
        const venue = this.state.venue;
        const loginPrompt = (
            <div class="modal" id="login-prompt">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <h4>In order to save this venue, you must first log in.</h4>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        )
        console.log('this.state.venue =', this.state.venue)
        return (
            <div id="show-container" className="tile is-ancestor">
              <div className="tile is-6 is-parent">
                <div className="tile is-child-box">
                    <img className="image" id="venue-show-image" src={venue.venue.image_url} alt={venue.venue.name}/>
                    <div id="save-button" class="card">
                        {this.props.currentUser.id ? <h4 onClick={ () => {this.saveVenue()}}>Save</h4> : null}
                        <h4>Share</h4>
                    </div>
                </div>
              </div>
                <div className="tile is-6 is-vertical is-parent is right">
                    <div className="tile is-child box">
                        <p className="title">{venue.name}</p>
                        <p className="subtitle is-5">Currently {venue.open ? "open" : 'closed'}</p>
                        <p className="subtitle is-5">{venue.phone}</p>
                    </div>
                    <div className="tile is-child box">
                        <div>
                            {this.state.venue && this.state.venue.reviews ? this.renderReviews(venue) : <p> No reviews available </p>}
                            {this.state.venue && this.state.venue.venue.photos ? this.renderPhotos(venue) : <p> No additional photos</p>}
                        </div>
                        <div id="save-button">
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VenueShow;