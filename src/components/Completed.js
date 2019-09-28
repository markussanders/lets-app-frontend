import React from 'react';


const Completed = props => {

    const venue = props.venue;
    let date = new Date().toLocaleDateString();
    let completed = props.userCompleted;

    let record = completed.find(el => el.venue_id === venue.id);
    return (
        <div id="completed-venues">
            <ul id="completed-list">
                <li key={venue.id}>
                    <p>{venue.name}<span>{`~(${date})`}</span></p>
                    <button className="mark-incomplete" onClick={() => props.markIncomplete(venue, record)}>X</button>
                </li>            
            </ul>
        </div>
    )

}


export default Completed;