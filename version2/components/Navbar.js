import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { fetchMessages } from "../actions/authAction";
import { connect } from "react-redux"
import ReceivedMessages from './ReceivedMessages';
const Navbar = (props) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/js/fresh.js`
    document.body.appendChild(script);
    script.async = true;
    console.log("useEffect");
  }, [])


  const renderAuthLink = () => {
    return props.auth.profile.fullName
      ?
      (
        <React.Fragment>
          <Link to="/" className="navbar-item">
            Hello {props.auth.profile.fullName}
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Messages
            </a>
            <div className="navbar-dropdown navbar-dropdown-messages">
              <ReceivedMessages />
            </div>
          </div>

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
console.log("Navbar");
  return (
    <nav id={props.id || ''} class="navbar is-primary is-fixed-top " role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <Link to="/" class="navbar-item" href="#">
            <span class="icon">
              <i class="fas fa-home fa-lg"></i>
            </span>
          </Link>
          <h1 class="navbar-item has-text-weight-bold is-size-4">Learning Service</h1>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBurger" class="navbar-menu">
          <div class="navbar-end">

            <Link to="/" class="navbar-item">Home</Link>
            <div class="navbar-item has-dropdown is-hoverable">
              <Link href="#" class="navbar-link">Manage</Link>

              <div class="navbar-dropdown">
                <Link to="/services/new" class="navbar-item">
                  Create Service
                        </Link>
                <Link to={`/services/${props.auth.profile.id}`} class="navbar-item">
                  My Services
                        </Link>
                <hr class="navbar-divider" />
                <Link to="/offers/sent" class="navbar-item">
                  Sent Offers
                        </Link>
                <Link to="/offers/received" class="navbar-item">
                  Received Offers
                        </Link>
                <hr class="navbar-divider" />
                <Link to="/collaborations/me" class="navbar-item">
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