import React from 'react';




class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: (this.props.currentUser || JSON.parse(localStorage.getItem('user'))),
            username: '',
            password: '',
            passwordConfirmation: '',
            errors: false,
            usernameTaken: false,
        }
    }

    updateUsername = state => {
        this.setState({usernameTaken: true});
        fetch(`http://localhost:3000/users${this.state.currentUser.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: state.username,
            })
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    updatePassword = state => {
        fetch(`http:/localhost:3000/users${this.state.currentUser.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: state.password,
            })
        })
        .then(resp => resp.json())
        .then(console.log)
    }
    
    confirmPassword() {
        if (this.state.password === this.state.passwordConfirmation) {
            this.setState({errors: false})
            this.updatePassword(this.state);
        } else {
            this.setState({errors: true});
        }
    }

    validateUsername() {
        fetch('http:localhost:3000/users')
            .then(resp => resp.json())
            .then(result => {
                let usernames = result.map(user => user.username);
                if (usernames.includes(this.state.username)){
                    this.setState({usernameTaken: true})
                }
            })
    }

    render() {
        console.log('current user = ', this.state.currentUser)
        return (
        <div id="edit-forms">
                {this.state.usernameTaken ?  <h6 className="error-message">your desired username is unavailable</h6> : null}
            <form id="edit-username" onSubmit={e => {
                e.preventDefault();
                this.updateUsername(this.state);
            }}>
                <label className="form-label">new username</label>
                <input className="input" onChange={e => {
                    this.setState({username: e.target.value});
                }}/>

                <button className="button button-change" type="submit" >submit</button>
            </form>
                {this.state.errors ? <h6 className="error-message">password must match password confirmation</h6> : null}
            <form id="edit-password" onSubmit={e => {
                e.preventDefault();
                this.confirmPassword();
            }}>
                <label className="form-label">new password</label>
                <input className="input" type="password" onChange={e => {
                    this.setState({password: e.target.value});
                }}/>
                <label className="form-label">confirmation</label>
                <input className="input" type="password" onChange={e => {
                    this.setState({passwordConfirmation: e.target.value});
                }}/>               
                <button className="button button-change" type="submit" >submit</button>

            </form>
        </div>
    )
    }

}

export default EditForm;