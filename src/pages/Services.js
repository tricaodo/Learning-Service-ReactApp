
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchServicesForUser, resetServiceState } from "../actions/serviceAction";
import requiredAuth from "../components/hoc/requiredAuth";
import Spinner from "../components/Spinner";
class Services extends React.Component {

    componentDidMount() {
        if (this.props.auth.profile.id) {
            this.props.fetchServicesForUser(this.props.auth.profile.id);
        }
    }

    componentWillUnmount() {
        this.props.resetServiceState();
    }

    renderServices = () => {
        return this.props.services.map(service => {
            return (
                <div key={service.id} className="column is-one-quarter">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={service.image} alt={service.title} />
                            </figure>
                        </div>
                        <div className="content is-size-5 has-text-weight-medium has-text-centered card-title">
                            {service.title}
                        </div>

                        <div className="card-content pt-3 card-content-border">
                            <div className="content is-size-7 has-text-weight-medium">
                                <strong>Description: </strong>{service.description}
                            </div>
                        </div>

                        <div className="card-footer">
                            <p className="card-footer-item is-size-7 has-text-weight-medium "><i className="fas fa-dollar-sign fa-lg"></i>: {service.price}</p>
                            <Link to={`/services/${service.id}/edit`} className="card-footer-item is-size-7 has-text-success ">Edit</Link>
                            <button
                                className="card-footer-item button  is-large is-size-7 has-text-danger "
                                style={{ width: "102.5px", height: "42px", border: "none" }}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.props.isFetching) return <Spinner />
        return (
            <section className="section section-padding-top">
                <div className="container">
                    <h1 className="title"><i className="fas fa-gift"></i> My Services</h1>
                    <div className="columns is-multiline">
                        {this.renderServices()}
                    </div>
                </div>
            </section>
        );

    }
}
const mapStateToProps = state => {
    return { auth: state.auth, services: Object.values(state.services), isFetching: state.isFetching };
}
export default connect(mapStateToProps, {
    fetchServicesForUser, resetServiceState
})(requiredAuth(Services));