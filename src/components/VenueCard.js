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

    const renderCategories = venue => {
        const replaced = venue.categories.replace(/=>/g, ':');
        let categories = JSON.parse(replaced);
        return categories.map(category => {
            return <li><a href="#">{category.title}</a></li>
        })
    }

    return (
        <div className="columns is-one-quarter" onClick={() => {
            //since the yelp_id is assigned once saved to database, if the property exists,
            //we don't need to make a post request.
            venue.yelp_id ? retrieveVenue(venue) : addVenueToDataBase(venue);
        }}>
             <div className="blog-card">
                <img className="photo" src={`${venue.image_url}`} alt={`${venue.name}`}/>
                <ul className="details">
                    <li className="tags">
                        {venue.categories? renderCategories(venue) : null}
                    </li>
                </ul>
                <div className="description">
                    <h1>{venue.name}</h1>
                    <p className="summary">Rated {venue.rating} out of 5</p>
                </div>
            </div>
        </div>
    //     <div className="columns is-one-quarter" onClick={() => {
    //         //since the yelp_id is assigned once saved to database, if the property exists,
    //         //we don't need to make a post request.
    //         venue.yelp_id ? retrieveVenue(venue) : addVenueToDataBase(venue);
    //     }}>
    //          <div className="venue-card">
    //             <img className="venue-card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
    //             {/* <p className="venue-card-info">Some text about this venue</p> */}
    //             <p className="venu-card-name">{venue.name}</p>
    //             <p className="venu-card-categories">{venue.categories ? renderCategories(venue) : null}</p>
    //         </div>
    // </div>
    )
}



export default withRouter(VenueCard);