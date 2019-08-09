import React from 'react';
 
const parseVal = val => {
    return JSON.parse(val);
}

class VenueShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            venue: this.props.venue,
        };
    }
    
    render () {
        const venue = this.state.venue;
        console.log(venue);
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
                    </div>
                    <div className="tile is-child box">
                        <p className="subtitle is-5">{venue.phone}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default VenueShow;