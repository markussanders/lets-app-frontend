import React from 'react';
import { withRouter} from 'react-router-dom';



const VenueCard = props => {
    const { venue } = props;

    const addVenueToDataBase = venue => {
        // send  a post request to backend, save venue, and render its show page
       fetch('http://localhost:3000/venues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                yelp_id: venue.id,
                name: venue.name,
                phone: venue.phone,
                rating: venue.rating,
                image_url: venue.image_url,
                url: venue.url,
            })
        }).then(resp => resp.json()).then(result => {
            retrieveVenue(result);
        });
    }
    const retrieveVenue = (venue) => {
        fetch(`http://localhost:3000/venues/${venue.yelp_id}`).then(resp => resp.json()).then(result => {
            props.updateSelectedVenue(result);
            props.history.push(`/venues/${venue.yelp_id}`);
        })
    }

    const renderCategories = venue => {
        if (Array.isArray(venue.categories)) {
            return venue.categories.map(category => {
                return <li><p onClick={() => {
                    props.updateSearched(category.title)
                }}>{category.title}</p></li>
            })
        }

        const replaced = String(venue.categories).replace(/=>/g, ':');
        let categories = JSON.parse(replaced);
        return categories.map(category => {
            return <li key={""}><p onClick={() => {
                props.updateSearched(category.title)
            }}>{category.title}</p></li>
        })
    }

    // const deleteButton = () => {
    //     return (
    //         <div className="delete-saved" >
    //             <button className="delete-saved-button" onClick={() => {
    //                 props.deleteSaved(venue);
    //             }}>DELETE</button>
    //         </div>
    //     )
    // }
    return (
        
        <div className="columns is-one-quarter" >
             <div className="blog-card">
                <img className="photo" src={`${venue.image_url}`} alt={`${venue.name}`}/>
                <div className="details">
                    <ul className="tags">
                        {venue.categories? renderCategories(venue) : null}
                    </ul>
                </div>
                <div className="description">
                    <h1 className="venue-card-name">{venue.name}</h1>
                    <p className="summary">Rated {venue.rating} out of 5</p>
                        {props.deleteSaved ?
                            <div className="delete-saved" >
                                <button className="delete-saved-button" onClick={() => {
                                    props.deleteSaved(venue);
                                }}>DELETE</button>
                            </div> 
                        : <div className="card-body"><button className="view-button" onClick={() => {
                                //since the yelp_id is assigned once saved to database, if the property exists,
                                //we don't need to make a post request.
                                venue.yelp_id ? retrieveVenue(venue) : addVenueToDataBase(venue);
                            }}>MORE DETAILS</button>
                                <br/><br/><br/><br/>           
                            </div>}
                        {props.markCompleted ?
                            <div className="complete-saved" >
                                <button className="complete-saved-button" onClick={() => {
                                    props.markCompleted(venue);
                                }}>MARK COMPLETE</button>
                            </div> 
                        : null}
                </div>
            </div>
        </div>
    //     <div className="columns is-one-quarter" onClick={() => {
    //         //since the yelp_id is assigned once saved to database, if the property exists,
    //         //we don't need to make a post request.
    //         venue.yelp_id ? retrieveVenue(venue) : addVenueToDataBase(venue);
    //     }}>
    //          <div className="venue-card">
    //             <img className="venue-card-image" src={`${venue.image_url}`} alt={`${venue.name}`}/>
    //             {/* <p className="venue-card-info">Some text about this venue</p> */}
    //             <p className="venu-card-name">{venue.name}</p>
    //             <p className="venu-card-categories">{venue.categories ? renderCategories(venue) : null}</p>
    //         </div>
    // </div>
    )
}



export default withRouter(VenueCard);