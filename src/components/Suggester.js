import React from 'react';



const Suggester = props => {


    return (
        <div id="suggester-container">
            <section className="tile is-12 is-parent" id="suggester">
                <div className="tile is-child" id="i-want-to-container">
                    <h2 className="title is-3" id="i-want-to">I want to: </h2>
                    <div className="columns">
                        <div className="column is-3 has-text-black" id="eat-button">Eat</div>
                        <div className="column is-3 has-text-black" id="drink-button">Drink</div>
                        <div className="column is-3 has-text-black" id="listen-button">Listen</div>
                        <div className="column is-3 has-text-bkacm" id="watch-button">Watch</div>
                        {/* <div className="random-bg has-background-primary" id="image-container"></div> */}
                    </div>
                </div>
            </section>
        </div>
    )

}

export default Suggester;