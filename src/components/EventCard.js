import React from 'react';


const EventCard = props => {
    const { event } = props;

    const addEventToDataBase = event => {
        fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                yelp_id: event.id,
                name: event.name,
                category: event.category,
                description: event.description,
                event_site_url: event.event_site_url,
                image_url: event.image_url,
                time_start: event.time_start,
                time_end: event.time_end,
                location: event.location,
                tickets_url: event.tickets_url
            })
        }).then(resp => resp.json()).then(result => retrieveEvent(result));
    }


    const retrieveEvent = event => {
        let eventID = event.yelp_id;
        fetch(`http://localhost:3000/venues/${eventID}`)
            .then(resp => resp.json())
            .then(result => {
                props.updateSelectedEvent(result)
            })
    }

    const renderCost = event => {
        if (event.cost && event.cost_max) {
            return `$${Math.floor(event.cost)} - $${Math.floor(event.cost_max)}`;
        } else if (event.cost) {
            return `$${Math.floor(event.cost)}`;
        }
        return "No pricing information available";
    }

    return (
        <div className="columns is-one-quarter">
            <div className='blog-card'>
                <img className="photo" src={`${event.image_url}`} alt={`${event.name}`}/>
                <div className="details">
                    <ul className="tags">
                        <li><p>{`${event.category}`}</p></li>
                    </ul>
                </div>
                <div className="description">
                    <h1 className="venue-card-name">{event.name}</h1>
                    <h2>{renderCost(event)}</h2>
                    <p className="summary">{`${event.description.substring(0, 45)}...`}</p>
                </div>
                 {props.deleteSaved ?
                    <div className="delete-saved" >
                        <button className="delete-saved-button" onClick={() => {
                            props.deleteSaved(event);
                        }}>DELETE</button>
                    </div> 
                : 
                    <div className="card-body"><button className="view-button" onClick={() => {
                            addEventToDataBase(event);
                        }}>MORE DETAILS</button>
                        {/* <br/><br/><br/><br/>            */}
                    </div>}
                {props.markCompleted ?
                    <div className="complete-saved" >
                        <button className="complete-saved-button" onClick={() => {
                            props.markCompleted(event);
                        }}>MARK COMPLETE</button>
                    </div> 
                : null}
            </div> 
        </div>
    )
}



export default EventCard; 