import React from 'react';




class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    updateUsername = state => {
        fetch(`http://localhost:3000/users${this.props.currentUser.id}`, {
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
        fetch(`http:/localhost:3000/users${this.props.currentUser.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: state.password,
            })
        })
        .then(resp => resp.json())
        .then(console.log)
    }


    render() {
        return (
        <div id="edit-form">
            <form onSubmit={e => {
                e.preventDefault();
                this.updateUsername(this.state);
            }}>
                <label>Username</label>
                <input className="input" onChange={e => {
                    this.setState({username: e.target.value});
                }}/>

                <button className="button button-change" type="submit" >Submit</button>
            </form>

            <form onSubmit={e => {
                e.preventDefault();
                this.updatePassword(this.state);
            }}>
                <label>password</label>
                <input className="input" onChange={e => {
                    this.setState({password: e.target.value});
                }}/>
                <button className="button button-change" type="submit" >Submit</button>

            </form>
        </div>
    )
    }

}

export default EditForm;