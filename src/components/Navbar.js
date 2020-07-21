/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { fetchMessages } from "../actions/authAction";
import { connect } from "react-redux"
import ReceivedMessages from './ReceivedMessages';
const Navbar = (props) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/js/fresh.js`;
    script.async = true;
    document.body.appendChild(script);
  },[])

  const renderAuthLink = () => {
    return props.auth.profile.fullName
      ?
      (
        <React.Fragment>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Messages
            </a>
            <div className="navbar-dropdown navbar-dropdown-messages">
              <ReceivedMessages />
            </div>
          </div>
          <span to="/" className="navbar-item">
            Hello {props.auth.profile.fullName}
          </span>
          <Link to="/logout" className="navbar-item">
            Logout
          </Link>
        </React.Fragment>
      )
      :
      (
        <React.Fragment>
          <Link to="/login" className="navbar-item">
            Log in
          </Link>
          <Link to="/register" className="navbar-item">
            Register
          </Link>
        </React.Fragment>
      )
  }

  return (
    <nav className="navbar is-primary is-fixed-top " role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" href="#" >
            <span className="icon">
              <i className="fas fa-home fa-lg"></i>
            </span>
          </Link>
          <h1 className="navbar-item has-text-weight-bold is-size-4">Learning Service</h1>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBurger" className="navbar-menu">
          <div className="navbar-end">
            <Link to="/" className="navbar-item">Home</Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a href="#" className="navbar-link">Manage</a>

              <div className="navbar-dropdown">
                <Link to="/services/new" className="navbar-item">
                  Create Service
                </Link>
                <Link to={`/services`} className="navbar-item">
                  My Services
                </Link>
                <hr className="navbar-divider" />
                <Link to="/offers/sent" className="navbar-item">
                  Sent Offers
                        </Link>
                <Link to="/offers/received" className="navbar-item">
                  Received Offers
                        </Link>
                <hr className="navbar-divider" />
                <Link to="/collaborations/me" className="navbar-item">
                  Collaborations
                        </Link>
              </div>
            </div>
            {renderAuthLink()}
          </div>
        </div>
      </div>
    </nav >
  )
}
const mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps, {
  fetchMessages
})(Navbar);