import React from 'react';
import Slider from '../containers/Slider';
import backbutton from '../backbutton.png';


class EventShow extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            event: this.props.event,
        }
    }

   renderURL = event => {
        return (
            <div>
                <h6 id="yelp-link"><a href={event.tickets_url} target="blank">GET TICKETS</a></h6>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderURL()}
            </div>
        )
    }


}

export default EventShow;