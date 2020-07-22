/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ServiceItem = ({ service, auth, noButton, children, className }) => {
    const shortText = (text, maxLength = 70) => {
        if (!text) return "";
        if (text.length < maxLength) return text;
        return `${text.substr(0, maxLength)}...`
    }

    return (
        <div className="column is-one-fifth">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={service.image} alt={service.title} />
                    </figure>
                </div>

                <div className="content is-size-5 has-text-weight-medium has-text-centered card-title">
                    {service.title}
                </div>
                <div className="card-content is-size-7">
                    <div className="content">
                        {shortText(service.description)}
                        <p><span className="has-text-weight-bold">Author: </span>{service.user.fullName}</p>
                    </div>
                </div>

                {
                    children &&
                    <div className="card-text">
                        {children}
                    </div>
                }
                {
                    !noButton &&
                    <div className="card-footer">
                        <div className="card-footer-item media">
                            <Link to={`services/${service.id}`} className="is-size-7 is-primary">Learn More</Link >
                        </div>
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