import React from 'react';



const VenueCard = props => {
    const { venue } = props;

    return (
        <div className="card">
            <img className="card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
        </div>
    )
}


export default VenueCard;