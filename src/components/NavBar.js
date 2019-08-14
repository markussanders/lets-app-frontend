/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import lets from '../lets.png'
 const NavBar = props => {
     
    const loggedIn = (
        <div id="nav-bar-list" className="navbar-start">
            < a href={`/users/${props.currentUser.id}`} className = "navbar-item"> Hi, {props.currentUser.username}! </a> 
            <a href="#" className="navbar-item" onClick={() => {
            }}> Home </a> 
            <a href="/home" className="navbar-item" onClick={() => {
                props.handleLogout(props.currentUser);
            }}> Logout </a> 
        </div>
    )

    const notLoggedIn = (
        <ul id="nav-bar-list" className="breadcrumb is-right" aria-label="breadcrumbs">
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
            
            <div id='nav-bar' className="breadcrumb is-right">
                <div id="logo-and-nav">
                    <img className="logo" src={lets} alt="logo"/>
                    {props.currentUser.id ? loggedIn : notLoggedIn}
                </div>
            </div>
        </nav>
    )
 }

 export default NavBar;