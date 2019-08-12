/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

 const NavBar = props => {

    const loggedIn = (
        <div className="navbar-start">
            <a href="#" className="navbar-item"> Hi, {props.currentUser.username}! </a> 
            <a href="#" className="navbar-item" onClick={() => {
            }}> Home </a> 
            <a href="#" className="navbar-item" onClick={() => {
                props.handleLogout(props.currentUser);
            }}> Logout </a> 
        </div>
    )

    const notLoggedIn = (
        <ul className="breadcrumb is-right" aria-label="breadcrumbs">
            <li> <span className="icon is-small"> <i className="fas fa-home" aria-hidden="true"></i></span><a href="/" className="navbar-item"> Home </a> </li>
            <li><a href="/about" className="navbar-item"> About </a></li>
            <li><a href="#" className="navbar-item" onClick={() => {
                props.loginForm();
            }}> Login </a></li>
            <li><a href="#" className="navbar-item" onClick={() => {
                props.signupForm()
            }}> Signup </a> </li>
        </ul>
    )

    return (
        <nav className="navbar is-fixed-top has-shadow">
            {/* h2 to logo image */}
            <div id='nav-bar' className="breadcrumb is-right">
                <h2 className="navbar-brand"> LET'S ____  </h2>
                {props.currentUser.id ? loggedIn : notLoggedIn}
            </div>
        </nav>
    )
 }

 export default NavBar;