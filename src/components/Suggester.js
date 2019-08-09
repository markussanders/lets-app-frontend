import React from 'react';



const Suggester = props => {


    return (
        <section className="tile is-12 is-parent" id="suggester">
            <div className="tile is-child">
                <h2 className="title is-3" id="i-want-to">I want to: </h2>
                <div className="columns">
                    <div className="column is-2 has-text-primary" id="eat-button">Eat</div>
                    <div className="column is-2 has-text-primary" id="dance-button">Dance</div>
                    <div className="column is-2 has-text-primary" id="divsten-button">Listen</div>
                    <div className="column is-2 has-text-primary" id="watch-button">Watch</div>
                </div>
            </div>
        </section>
    )

}

export default Suggester;