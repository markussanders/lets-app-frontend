import React from 'react';


const Background = props => {

    return (
        <div id="background">
            <img id="background-image" src={props.imgUrl} alt="background"/>
        </div>
    )
}

export default Background;