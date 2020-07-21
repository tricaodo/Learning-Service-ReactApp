/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import { connect } from "react-redux";
import { fetchService } from "../actions/serviceAction";
import Spinner from "../components/Spinner";
import ModalOffer from "../components/ModalOffer";

class ServiceDetail extends React.Component {

    componentDidMount() {
        this.props.fetchService(this.props.match.params.id);
    }

    render() {
        if (!this.props.service) return <Spinner />
        const { service, auth } = this.props;
        return (
            <section className="section mt-6" style={{ paddingTop: "15rem" }}>
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <figure className="image is-4by3">
                                <img src={service.image} alt="Description"
                                    style={{ width: "70%", height: "70%" }} />
                            </figure>
                        </div>
                        <div className="column">
                            <div className="box">
                                <div className="columns">
                                    <div className="column"><i className="fas fa-dollar-sign is-size-3"></i><span
                                        className="has-text-weight-bold is-size-3">{service.price}</span> Per Hours</div>
                                    <div className="column"><i className="fas fa-user-edit is-size-4"></i>: {service.user.fullName}</div>
                                    <div className="column"><i className="fas fa-list is-size-4"></i>: {service.category}</div>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        <h1 className="title has-text-centered">{service.title}</h1>
                                        <h3 className="subtitle has-text-centered">{service.description}</h3>

                                        <div className="has-text-centered">

                                            <ModalOffer service={service} auth={auth} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { service: state.services[ownProps.match.params.id], auth: state.auth };
}

export default connect(mapStateToProps, {
    fetchService
})(ServiceDetail);