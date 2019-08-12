import React from 'react';
import { withRouter} from 'react-router-dom';



const VenueCard = props => {
    const { venue } = props;

    const addVenueToDataBase = venue => {
        // send  a post request to backend, save venue, and render its show page
       fetch('http://localhost:3000/venues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                yelp_id: venue.id,
                name: venue.name,
                phone: venue.phone,
                rating: venue.rating,
                image_url: venue.image_url,
                url: venue.url,
            })
        }).then(resp => resp.json()).then(result => retrieveVenue(venue));
    }
    const retrieveVenue = (venue) => {
        let venueId = venue.yelp_id ? venue.yelp_id : venue.id;
        fetch(`http://localhost:3000/venues/${venueId}`).then(resp => resp.json()).then(result => {
            props.updateSelectedVenue(result);
            props.history.push(`/venues/${venue.yelp_id}`);
        })
    }


    return (
        <div className="columns is-one-quarter" onClick={() => {
            //since the yelp_id is assigned once saved to database, if the property exists,
            //we don't need to make a post request.
            venue.yelp_id ? retrieveVenue(venue) : addVenueToDataBase(venue);
        }}>
            {/* <span data-label={venue.name} className="is-primary is-top is-medium b-tooltip">
                <figure className="card image">
                    <div className="text-container">
                        <img alt={venue.name} data-src={venue.image_url} src={venue.image_url} lazy="loaded"/>
                        <div className="bottom-left is-hidden-tablet">{venue.name}</div>
                    </div>
                </figure>
            </span> */}

             <div className="venue-card-image-container">
                <img className="card-image venue-card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
            </div>
            <footer className="card-footer">
                <p className="card-footer-item">{venue.name}</p>
                <p className="card-footer-item">{venue.categories ? venue.categories[0].title : 'Food'}</p>
            </footer>
    </div>
    )
}



export default withRouter(VenueCard);