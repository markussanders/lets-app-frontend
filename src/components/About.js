import React from 'react';
import backbutton from '../backbutton.png';


const About = props => {
    console.log(props);
    return (
        <div id="about-page">
            <div className="back-button-container" onClick={() => props.history.push('/home')}><img src={backbutton} alt="" className="back-button"/>GO BACK</div>
            <div id="about-title">
                <h2 id="about-title-text">LET'S</h2>
            </div>
            <div id="about-text">
                <p className="about-content"> LET'S ___ was created to help users find recommendations for things to do based on their search history and location. Each search you make gets categorized and rated in order to make more custom recommendations for you in the future. This is done by analyzing the content of your search, along with it's results and comparing them to your previous search history. The more you use this application, the more tailored it becomes to you. <br/> <br/> As a visiting user, your recommendations will be based on what others have searched for.</p>
            </div>
        </div>
    )
}


export default About;