/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

 const NavBar = props => {


    const loggedIn = (
        <div className="navbar-start">
            <a href="#" className="navbar-item"> {props.currentUser.name} </a> 
            <a href="#" className="navbar-item"> Browse Events </a> 
            <a href="#" className="navbar-item"> Logout </a> 
        </div>
    )

    const notLoggedIn = (
        // < div className = "navbar-start">
            <ul className="breadcrumb is-right" aria-label="breadcrumbs">
                <li><a href="/" className="navbar-item"> Browse Events </a> </li>
                <li><a href="/about" className="navbar-item"> About </a></li>
                <li><a href="#" className="navbar-item" onClick={() => props.login()}> Login </a></li>
                <li><a href="#" className="navbar-item" onClick={() => props.signup()}> Signup </a> </li>
            </ul>
        // </div>
    )

    return (
        <nav className="breadcrumb is-fixed-top">
            {/* h2 to logo image */}
            <div className="navbar">
                <h2 className="navbar-brand"> LET'S ____  </h2>
                {props.currentUser ? loggedIn : notLoggedIn}
            </div>
        </nav>
    )
 }

 export default NavBar;