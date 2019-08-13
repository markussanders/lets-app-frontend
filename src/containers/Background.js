import React from 'react';


const Background = props => {
    

    const renderBackground = () => {
        if (props.imgUrl) {
            return  <img id="background-image" src={props.imgUrl} alt="background"/>
        } else if (props.imgUrl === "") {
            return <section id="color-block"></section>
        }
    }
    console.log(props);
    return (
        <div id="background">
            {renderBackground()}
        </div>
    )
}

export default Background;