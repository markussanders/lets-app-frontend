import React from 'react';



const VenueCard = props => {
    const { venue } = props;

    return (
        <div className="card">
            <div className="card-content">
                <img className="card-image venue-card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
                <footer className="card-footer">
                    <p className="card-footer-item">{venue.name}</p>
                    <p className="card-footer-item">Food</p>
                </footer>
            </div>

        </div>
    )
}



export default VenueCard;