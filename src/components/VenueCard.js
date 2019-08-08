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
        }).then(resp => resp.json()).then(result => {
            props.updateSelectedVenue(result);
            props.history.push(`/venues/${venue.id}`);
        });
    }


    return (
        <div className="card" onClick={() => {
            addVenueToDataBase(venue);
        }}>
            <div className="card-content">
                <img className="card-image venue-card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
                <footer className="card-footer">
                    <p className="card-footer-item">{venue.name}</p>
                    <p className="card-footer-item">{venue.categories ? venue.categories[0].title : 'Food'}</p>
                </footer>
            </div>

        </div>
    )
}



export default withRouter(VenueCard);