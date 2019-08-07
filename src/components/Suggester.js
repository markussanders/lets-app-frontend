import React from 'react';



const Suggester = props => {


    return (
        <div className="columns">
            <h2 className="title is-3">I want to: </h2><br/>
            <div className="column is-3 has-text-primary" id="eat-button">Eat</div>
            <div className="column is-3 has-text-primary" id="dance-button">Dance</div>
            <div className="column is-3 has-text-primary" id="divsten-button">Listen</div>
            <div className="column is-3 has-text-primary" id="watch-button">Watch</div>
        </div>
    )

}

export default Suggester;