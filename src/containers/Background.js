import React from 'react';


const Background = props => {
    

    const renderBackground = () => {
        if (props.imageUrl) {
            return  <img id="background-image" src={props.imgUrl} alt="background"/>
        } else {
            return <section id="color-block"></section>
        }
    }
    return (
        <div id="background">
            {renderBackground()}
        </div>
    )
}

export default Background;