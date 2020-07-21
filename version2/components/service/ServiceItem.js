/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ServiceItem = ({ service, auth, noButton, children, className }) => {
    const shortText = (text, maxLength = 50) => {
        if (!text) return "";
        if (text.length < maxLength) return text;
        return `${text.substr(0, maxLength)}...`
    }

    return (
        <div className="column is-one-third">
            <div className={`feature-card is-bordered has-text-centered revealOnScroll delay-2 ${className}`} data-animation="fadeInLeft">
                <div className="card-title">
                    <h4>{service.title}</h4>
                </div>
                <div className="card-icon">
                    <img src={service.image} alt="" />
                </div>
                <div className="card-text">
                    <p>{shortText(service.description)}</p>
                </div>
                {
                    children &&
                    <div className="card-text">
                        {children}
                    </div>
                }
                {
                    !noButton &&
                    <div className="card-action">
                        <Link to={`services/${auth.profile.id}/${service.id}`} className="button btn-align-md accent-btn raised">Get Started</Link>
                    </div>
                }
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(ServiceItem);