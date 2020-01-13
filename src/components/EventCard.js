import React from 'react';


const EventCard = props => {
    const event = props.event;

    return (
        <div className="event-card">
            <img className="event-card-photo" alt={event.name.text} src={event.logo.url}/>
            <h2 className="event-card-name">{event.name.text}</h2>
        </div>
    )
}

export default EventCard;

// const EventCard = props => {
//     const { event } = props;

//     const addEventToDataBase = event => {
//         fetch('http://localhost:3000/events', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 yelp_id: event.id,
//                 name: event.name,
//                 category: event.category,
//                 description: event.description,
//                 event_site_url: event.event_site_url,
//                 image_url: event.image_url,
//                 time_start: event.time_start,
//                 time_end: event.time_end,
//                 location: event.location,
//                 tickets_url: event.tickets_url
//             })
//         }).then(resp => resp.json()).then(result => retrieveEvent(result));
//     }


//     const retrieveEvent = event => {
//         let eventID = event.yelp_id;
//         fetch(`http://localhost:3000/venues/${eventID}`)
//             .then(resp => resp.json())
//             .then(result => {
//                 props.updateSelectedEvent(result)
//             })
//     }

//     const renderCost = event => {
//         if (event.cost && event.cost_max) {
//             return `$${Math.floor(event.cost)} - $${Math.floor(event.cost_max)}`;
//         } else if (event.cost) {
//             return `$${Math.floor(event.cost)}`;
//         }
//         return "No pricing information available";
//     }

//     const renderLocation = event => {
//         let location = event.location;
//         let locationStr = `${location.address1} ${location.city}, IL ${location.zip_code}`
//         return <h4 className="event-location">{locationStr}</h4>
//     }
    

//     return (
//         <div className='event-card'>
//             <img className="event-card-photo" src={`${event.image_url}`} alt={`${event.name}`}/>
//             <div className="event-card-category">
//                 <ul className="tags">
//                     <li><p className="event-card-category-text">{`${event.category}`}</p></li>
//                 </ul>
//             </div>
//             <div className="event-card-description">
//                 <h1 className="event-card-name">{event.name}</h1>
//                 <h2>{renderCost(event)}</h2>
//                 <p className="event-card-summary">{`${event.description.substring(0, 90)}...`}</p>
//                 {renderLocation(event)}
//                 <div className='event-card-buttons'>
//                     <a className="event-tickets-button" href={event.tickets_url} target="_blank" rel='noopener noreferrer'>GET TICKETS</a>
//                     <a className="event-yelp-button" href={event.event_site_url} target="_blank" rel='noopener noreferrer'>MORE INFO</a>
//                     <button className="add-event-button" onClick={() => addEventToDataBase(event)}>ADD TO MY LIST</button>
//                 </div>
//             </div>
//                 {props.deleteSaved ?
//                 <div className="delete-saved" >
//                     <button className="delete-saved-button" onClick={() => {
//                         props.deleteSaved(event);
//                     }}>DELETE</button>
//                 </div> 
//             : null}
//             {props.markCompleted ?
//                 <div className="complete-saved" >
//                     <button className="complete-saved-button" onClick={() => {
//                         props.markCompleted(event);
//                     }}>MARK COMPLETE</button>
//                 </div> 
//             : null}
//         </div> 
//     )
// }

// export default EventCard; 