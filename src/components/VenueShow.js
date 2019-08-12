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
           return <img src={photo} alt={venue.name}/>
        })
    }
    renderReviews = venue => {
        console.log('VENUE REVIEWS ==', venue)
        return venue.reviews.map(review => {
            return (
                <div>
                    <h2>Rating: {review.rating}</h2>
                    <p>{review.text}</p>
                    <h6>{review.user.name}</h6>
                </div>
            )
        })
    }
    
    render () {
        const venue = this.state.venue;
        return (
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child-box">
                    <img className="image" id="venue-show-image" src={venue.image_url} alt={venue.name}/>
                </div>
              </div>
                <div className="tile is-4 is-vertical is-parent">
                    <div className="tile is-child box">
                        <p className="title">{venue.name}</p>
                        <p className="subtitle is-5">Currently {venue.open ? "open" : 'closed'}</p>
                        <p className="subtitle is-5">{venue.phone}</p>
                    </div>
                    <div className="tile is-child box">
                        <div>
                            {this.state.venue ? this.renderReviews(venue) : null}
                            {this.state.venue ? this.renderPhotos(venue) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VenueShow;