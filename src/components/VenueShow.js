import React from 'react';

class VenueShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            venue: this.props.venue,
        };
    }

    renderPhotos = venueInfo => {
        let photos = JSON.parse(venueInfo.venue.photos)
        return photos.map(photo => {
           return <img src={photo} alt={venueInfo.venue.name} key={photo}/>
        })
    }
    renderReviews = venue => {
        return venue.reviews.map(review => {
            return (
                <div key={review.id}>
                    <h2>Rating: <span id="rating">{review.rating}</span></h2>
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
        const venueInfo = this.state.venue;
        const loginPrompt = (
            <div class="modal" id="login-prompt">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <h4>In order to save this venue, you must first log in.</h4>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        )


        return (
            <div id="venue-show-page">
                <div id="venue-show-main-image">
                    <img className="image" id="venue-show-image" src={venueInfo.venue.image_url} alt={venueInfo.venue.name}/>
                </div>
                <div id="venue-show-other-images">
                    {this.state.venue && this.state.venue.venue.photos ? this.renderPhotos(venueInfo) : null}
                </div>
                <div id="venue-show-reviews">
                    <h4>Reviews</h4> 
                    {venueInfo && venueInfo.reviews ? this.renderReviews(venueInfo) : <p> No reviews available </p>}  
                </div>
                <div id="save-button" class="card">
                    {this.props.currentUser.id ? <h4 onClick={ () => {this.saveVenue()}}>Save</h4> : null}
                    <h4>Share</h4>
                </div>
            </div>


            // <div id="show-container" className="tile is-ancestor">
            //   <div className="tile is-6 is-parent">
            //     <div className="tile is-child-box">
            //         <img className="image" id="venue-show-image" src={venue.venue.image_url} alt={venue.venue.name}/>
            //         <div id="save-button" class="card">
            //             {this.props.currentUser.id ? <h4 onClick={ () => {this.saveVenue()}}>Save</h4> : null}
            //             <h4>Share</h4>
            //         </div>
            //     </div>
            //   </div>
            //     <div className="tile is-6 is-vertical is-parent is right">
            //         <div className="tile is-child box">
            //             <p className="title">{venue.name}</p>
            //             <p className="subtitle is-5">Currently {venue.open ? "open" : 'closed'}</p>
            //             <p className="subtitle is-5">{venue.phone}</p>
            //         </div>
            //         <div className="tile is-child box">
            //             <div>
            //                 {this.state.venue && this.state.venue.reviews ? this.renderReviews(venue) : <p> No reviews available </p>}
            //                 {this.state.venue && this.state.venue.venue.photos ? this.renderPhotos(venue) : <p> No additional photos</p>}
            //             </div>
            //             <div id="save-button">
            //         </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default VenueShow;