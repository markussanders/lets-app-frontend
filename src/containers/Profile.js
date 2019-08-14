import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
        }
    }

    render() {
        console.log(this.state.currentUser);
        return (
            <div id="profile-sections">
                <div id="profile-your-account" className="profile-section">
                    <h2 id="your-account-text"> YOUR ACCOUNT</h2>
                </div>
                <div id="profile-update" className="profile-section">
                    <h4> view my: 
                        <Link to={`/users/${this.state.currentUser.id}/saved`}>
                             <span className="profile-option">saved</span>
                        </Link>
                    </h4>
                </div>
                <div id="profile-change" className="profile-section">
                    <h4> change my: 
                        <div className="profile-stacked">
                            <span className="profile-option">username</span>
                            <span className="profile-option">password</span>
                            <span className="profile-option-disabled">{"location (coming soon!)"}</span>
                        </div>
                    </h4>
                </div>
                <div id="profile-delete" className="profile-section">
                    <h4> delete my: <span className="profile-option">account</span></h4>
                </div>
            </div>
        )
    }
}

export default Profile;