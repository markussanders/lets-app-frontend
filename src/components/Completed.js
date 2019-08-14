import React from 'react';


const Completed = props => {

    const venue = props.venue;
    let date = new Date().toLocaleDateString();

    return (
        <div id="completed-venues">
            <ul id="completed-list">
                <li key={venue.id}>
                    <p>{venue.name}<span>{`~(${date})`}</span></p>
                </li>            
            </ul>
        </div>
    )

}


export default Completed;