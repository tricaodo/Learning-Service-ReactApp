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
        const { service } = this.props;
        return (
            <section className="hero is-fullheight is-default is-bold service-detail-page">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="columns is-vcentered">
                            <div className="column is-5">
                                <figure className="image is-4by3">
                                    <img src={service.image} alt="Description" />
                                </figure>
                            </div>
                            <div className="column is-6 is-offset-1">
                                <div className="service-header-container">
                                    <div className="media service-user">
                                    </div>
                                    <div className="service-price">
                                        <div className="media service-user">
                                            <div className="media-content">
                                                <p className="title is-4">${service.price}</p>
                                                <p className="subtitle is-6">Per Hour</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="title service-title is-2">
                                    {service.title}
                                </h1>

                                <h2 className="subtitle is-4">
                                    {service.description}
                                </h2>
                                <br />
                                <div className="has-text-centered">
                                    <ModalOffer service={service} />
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
    return { service: state.services[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {
    fetchService
})(ServiceDetail);