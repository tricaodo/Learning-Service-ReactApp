/* eslint jsx-a11y/anchor-is-valid: 0 */
import { Link } from "react-router-dom";
import React from 'react'
const Navbar = (props) => {
  const renderAuthLink = () => {
    return props.auth.profile.fullName
      ?
      (
        // menu error searching for Mutation Observer.
        <React.Fragment>
          <Link to="/" className="navbar-item is-secondary">
            Hello {props.auth.profile.fullName}
          </Link>
          <Link to="/logout" className="navbar-item">
            <span className="button signup-button rounded is-danger raised">
              Logout
                  </span>
          </Link>
        </React.Fragment>
      )
      :
      (
        <React.Fragment>
          <Link to="/login" className="navbar-item is-secondary modal-trigger" data-modal="auth-modal">
            Log in
          </Link>
          <Link to="/register" className="navbar-item">
            <span className="button signup-button rounded secondary-btn raised">
              Register
                  </span>
          </Link>
        </React.Fragment>
      )
  }
  return (
    <nav
      id={props.id || ''}
      className="navbar is-fresh is-transparent no-shadow"
      role="navigation"
      aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <div className="title">Servicio</div>
          </Link>

          <a className="navbar-item is-hidden-desktop is-hidden-tablet">
            <div id="menu-icon-wrapper" className="menu-icon-wrapper" style={{ visibility: 'visible' }}>
              <svg width="1000px" height="1000px">
                <path className="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                <path className="path2" d="M 300 500 L 700 500"></path>
                <path className="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
              </svg>
              <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
            </div>
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-menu" className="navbar-menu is-static">
          <div className="navbar-start">
            <a className="navbar-item is-hidden-mobile">
              <div id="menu-icon-wrapper" className="menu-icon-wrapper" style={{ visibility: 'visible' }}>
                <svg width="1000px" height="1000px">
                  <path className="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path className="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
                </svg>
                <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
              </div>
            </a>
          </div>

          <div className="navbar-end">
            <Link to="/" className="navbar-item is-secondary">
              Home
            </Link>
            <Link to="/services" className="navbar-item is-secondary">
              Services
            </Link>
            <Link to="/faq" className="navbar-item is-secondary">
              FAQ
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Dropdown
              </a>

              <div className="navbar-dropdown">
                <Link to="/services/new" className="navbar-item">
                  Create Service
                </Link>
                <a className="navbar-item">
                  Dropdown item
                </a>
                <a className="navbar-item">
                  Dropdown item
                </a>
              </div>
            </div>
            {renderAuthLink()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar