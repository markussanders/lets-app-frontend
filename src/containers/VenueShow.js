import React from 'react';
import Slider from '../containers/Slider';
import backbutton from '../backbutton.png';
import MyFancyComponent from '../components/MyFancyComponent';


const getLocation = venueInfo => {
    let location = venueInfo.venue.location.replace(/=>/g, ':');
    let replaced = location.replace(/nil/g, '""');
    let locationObj = JSON.parse(replaced);
    let str = locationObj.address1.split(' ').join('+')
}
const getCoordinates = venue => {
    if (venue) {
        let coordinates = venue.venue.coordinates.replace(/=>/g, ':');
        let output = JSON.parse(coordinates);
        return coordinates;
    }
    return false;
}


class VenueShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            venue: this.props.venue,
            path: this.props.venuePath,
            active: false,
            saved: null,
            coordinates: getCoordinates(this.props.venue),
        };
        this.fetchVenue(this.props.path);

    }
    componentDidMount() {
        window.scrollTo(0, 0);
            // console.log('HERE')
            // let coordinates = this.state.venue.venue.coordinates.replace(/=>/g, ':');
            // let output = JSON.parse(coordinates);
            // console.log('coordinates', output);
            // this.setState({coordinates});
    }

    checkForCoordinates = () => {
        return this.state.coordinates ? true : false;
    }

    // setCoordinates = () => {
    //     let coordinates = getCoordinates(this.props.venue);
    //     this.setState({coordinates});
    // }

    fetchVenue = (path) => {
        fetch(`http://localhost:3000${this.state.path}`)
            .then(resp => resp.json())
            .then(venue => {
                this.setState({
                    venue: venue, 
                })
            })
    }

    sliderData = photos => {
        return photos.map(photo => {
            return {
                index: photos.indexOf(photo),
                src: photo
            }
        })
    }

     renderPhotos = venueInfo => {
        let photos = JSON.parse(venueInfo.venue.photos);
        let sliderData = this.sliderData(photos);
        return <Slider heading={venueInfo.venue.name} slides={sliderData} />
    }

    renderPhoneNumber = venueInfo => {
        let phone = venueInfo.venue.phone;
        return (
            <h4 id="venue-phone">
                <span>{phone}</span>
            </h4>
        )
    }

    renderURL = venueInfo => {
        let url = venueInfo.venue.url;
        return (
            <h6 id="yelp-link"><a href={url} target="blank">VIEW ON YELP</a></h6>
        )
    }
    

    
    renderAddress = venueInfo => {
        let location = venueInfo.venue.location.replace(/=>/g, ':');
        let replaced = location.replace(/nil/g,'""');
        let locationObj = JSON.parse(replaced);
        const address = locationObj.display_address.join(' ')
        return (
            <h4 id="venue-address-text">
                <span id="venue-address-text">
                    {address.toUpperCase()}
                </span>
            </h4>
        )
    }

    renderReviews = venue => {
        return venue.reviews.map(review => {
            return (
                <div key={review.id}>
                    <h2 className="yelp-user-rating">Rating: <span className={`rating-${review.rating}`}>{review.rating}</span></h2>
                    <p>{review.text}</p>
                    <h6>{review.user.name}</h6>
                </div>
            )
        })
    }

    saveVenue = () => {
        fetch('http://localhost:3000/saved_lists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                venue_id: this.state.venue.venue.id
            })
        }).then(resp => resp.json()).then(saved => this.setState({saved: saved.id}));
    }

    unsaveVenue = () => {
        fetch(`http://localhost:3000/saved_lists/${this.state.saved}`, {
            method: 'DELETE'
        }).then(resp => resp.json()).then(message => console.log(message));
    }


    // renderLocationObj = () => {
    //     if (this.state.venue) {
    //         const venueInfo = this.state.venue;
    //         let location = venueInfo.venue.location;
    //     }
    // }
    render () {
        const venueInfo = this.state.venue;
        /// If save button is chosen to be visible to those not logged in, if they are not logged in, then return this prompt.
        // const loginPrompt = (
        //     <div class="modal" id="login-prompt">
        //         <div class="modal-background"></div>
        //         <div class="modal-content">
        //             <h4>In order to save this venue, you must first log in.</h4>
        //         </div>
        //         <button class="modal-close is-large" aria-label="close"></button>
        //     </div>
        // )
        return (
            <div id="venue-show-page">
                {this.state.venue ? 
                <div>
                {getCoordinates(venueInfo)}
                <div id="venue-show-name">
                    <h2 id="venue-name">{venueInfo ? venueInfo.venue.name.toUpperCase() : null}</h2>
                </div>
                <div className="back-button-container" onClick={() => this.props.history.goBack()}><img src={backbutton} alt="" className="back-button"/>GO BACK</div>
                <div id="venue-show-other-images">
                    {this.state.venue && this.state.venue.venue.photos ? this.renderPhotos(venueInfo) : null}
                </div>
                <div id="venue-show-info-container">
                <div id="venue-show-details">
                        <div id="venue-show-reviews">
                            <h4 id="yelp-reviews">YELP REVIEWS</h4> 
                            {venueInfo && venueInfo.reviews ? this.renderReviews(venueInfo) : <p> No reviews available </p>}  
                        </div>
                    < div id="venue-details-container" >
                        <h2 id="currently-open-closed">CURRENTLY {venueInfo ? venueInfo.venue.open ? 
                            <span className="venue-open">OPEN</span> 
                            :
                             <span className="venue-closed">CLOSED</span> : null}
                        </h2>
                        {this.renderPhoneNumber(venueInfo)}
                        {this.renderAddress(venueInfo)}
                        {this.renderURL(venueInfo)}
                    </div>
                    </div>
                </div>
                <div className="share-save-buttons">
                    {this.state.currentUser.id ? <h4 id={this.state.active ? "save-button-active" : "save-button"} onClick={ () => {
                        this.state.active ? this.unsaveVenue() : this.saveVenue();
                        this.setState({active: !this.state.active})
                        }}>{this.state.active ? "UNSAVE" : "SAVE"}</h4> : null}
                    <h4 id="share-button" onClick={() => {
                        window.location.href = `mailto:yourfriend@email.com?subject=lets%20go%20here!&body=Have%20you%20been%20to%20${venueInfo.venue.name}?%20It%20looks%20awesome!%20It%20also%20has%20a%20${venueInfo.venue.rating}%20star%20rating%20on%20Yelp!`
                    }}>SHARE</h4>
                </div>
                <div>
                    {this.checkForCoordinates() ? <MyFancyComponent venueLocation={getLocation(venueInfo)} coordinates={getCoordinates(venueInfo)} /> : null}
                </div>
                </div> : null}
            </div>
        )
    }
}

export default VenueShow;