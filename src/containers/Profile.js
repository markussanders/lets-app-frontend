import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import backbutton from '../backbutton.png';
import EditForms from '../components/EditForms';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: (this.props.currentUser || JSON.parse(localStorage.getItem('user'))),
            showForms: false
        }
    }

    render() {
        return (
            <div>
                <div className="back-button-container" onClick={() => this.props.history.goBack()}><img src={backbutton} alt="" className="back-button" />GO BACK</div>
                <div id="profile-sections">
                    <div id="profile-your-account" className="profile-section">
                        <h2 id="your-account-text"> YOUR ACCOUNT</h2>
                    </div>
                    <div id="profile-update" className="profile-section">
                        <h4 className="profile-text"> view my: <br/>
                            <Link to={`/users/${this.state.currentUser.id}/saved`}>
                                <span className="profile-option"> saved</span>
                            </Link>
                        </h4>
                    </div>
                    <div id="profile-change" className="profile-section">
                        <h4 className="profile-text"> change my: 
                            <div className="profile-stacked">
                                <span className="profile-option" onClick={()=> this.setState({showForms: !this.state.showForms})} >username / password</span>
                                <span className="profile-option-disabled">{"location (coming soon!)"}</span>
                            </div>
                        </h4>
                    </div>
                    <div id="profile-delete" className="profile-section">
                        <h4 className="profile-text"> delete my: <br/> <span className="profile-option">account</span></h4>
                    </div>
                </div>
                {this.state.showForms ? <EditForms /> : null}
            </div>
        )
    }
}

export default Profile;