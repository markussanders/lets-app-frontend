import React from 'react';



const Suggester = props => {




    return (
        <div id="suggester-container">
            
            <h2 className="title is-3" id="i-want-to">LET'S... </h2>
            <ul id="suggester-options">
                <li className="suggester-option" id="eat-button" onClick={()=> {
                    props.updateBackgroundImage('https://cdn.shopify.com/s/files/1/0690/5295/files/dinner_outfits_party_outfit_2048x2048.jpg?687698953360450850')
                }}>EAT</li>
                <li className="suggester-option" id="drink-button" onClick={()=> {
                    props.updateBackgroundImage('https://blogs.bmj.com/bmjopen/files/2016/11/alcohol-492871_960_720.jpg')
                }}>DRINK</li>
                <li className="suggester-option" id="listen-button" onClick={()=> {
                    props.updateBackgroundImage('https://media2.giphy.com/media/13ekKst01ih7Vu/source.gif')
                }}>LISTEN</li>
                <li className="suggester-option" id="watch-button" onClick={()=> {
                    props.updateBackgroundImage('https://www.cityofchicago.org/content/dam/city/depts/dca/Millennium%20Park/mpfilmseries650.jpg')
                }}>WATCH</li>
                {/* <div className="random-bg has-background-primary" id="image-container"></div> */}
            </ul>
        </div>
    )

}


export default Suggester;