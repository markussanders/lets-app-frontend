import React from 'react';
import Api from '../services/api';
import lets from '../lets.png';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            // passwordConfirmation: '',
            error: false,
            errorMessage: ''
        }
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    // handlePasswordConfirmationChange(e) {
    //     this.setState({
    //         passwordConfirmation: e.target.value
    //     })
    // }

    // confirmPasswordMatch = () => {
    //     return this.state.password === this.state.passwordConfirmation;
    // }

    handleSignup(e){
        e.preventDefault();
        Api.signup(this.state)
        .then(data => {
            console.log('DATA =', data)
            if (data.error) {
            this.setState({
                error: true,
                errorMessage: data.error,
            })
            } else {
            this.props.handleSignup(data);
            this.props.signupForm();
            }
        })
    }

    render(){
    return (
      <div>
        <div id="login-modal" className="modal">
            <div className="modal-background"></div>
            <div className="modal-content">
                <form onSubmit={(e)=>{
                    this.handleSignup(e);
                }}>
                  <div id="form-inputs">
                  <img className="logo" src={lets} alt="logo" />
                    <div id="input-text">
                    {this.state.error ? <h4>{this.state.errorMessage}</h4> : null}
                      <label className="login-username">First Name</label>
                      <input className="form-input" onChange={(e) => this.handleNameChange(e)} value={this.state.name} />
                      <br/>
                      <label className="login-username">Email</label>
                      <input className="form-input" onChange={(e) => this.handleEmailChange(e)} value={this.state.email} />
                      <br/>
                      <label className="login-username">Username</label>
                      <input className="form-input" onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} />
                      <br/>
                      <label className="login-password">Password</label>
                      <input className="form-input" type="password" onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} />
                      <br/>
                      {/* <label className="login-password">Password Confirmation</label>
                      <input className="form-input" type="password" onChange={(e) => this.handlePasswordConfirmationChange(e)} value={this.state.passwordConfirmation} />                       */}
                    </div>
                    <input type='submit' value='login'  />
                  </div>
                </form>
            </div>
            <button id="x-button" className="modal-close is-large" aria-label="close" onClick={this.props.signupForm}></button>
        </div>
      </div>
    );
  }

}

export default Signup;