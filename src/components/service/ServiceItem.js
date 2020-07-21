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

    console.log(service);
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
                <div className="content is-size-7  card-title">
                    <p><span className="has-text-weight-medium ">Description: </span>{shortText(service.description)}</p>
                </div>
                <div className="card-content">
                    <div className="media mb-1">
                        <div className="media-left">
                            <figure className="image is-32x32">
                                <img className="is-rounded" src={service.user.avatar} alt="user" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="is-size-7 has-text-weight-bold">{service.user.fullName}</p>
                            <p className="is-size-7">{service.user.email}</p>
                        </div>
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
                        <Link to={`services/${auth.profile.id}/${service.id}`} className="card-footer-item button is-primary is-small">Learn More</Link >
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