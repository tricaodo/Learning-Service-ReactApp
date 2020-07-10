import React from "react";
import { fetchUserServices } from "../../actions/authAction";
import { connect } from "react-redux";
import ServiceItem from "../../components/service/ServiceItem";

class UserServices extends React.Component {
    componentDidMount() {
        this.props.fetchUserServices(this.props.match.params.userId);
    }

    renderServices() {
        return this.props.services.map(service => {
            return (
                <div key={service.id} className="column">
                    <ServiceItem service={service} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="content-wrapper">

                    <h1 className="title">Your Services</h1>
                    <div className="columns is-multiline">
                        {this.renderServices()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { services: state.auth.profile.services };
}
export default connect(mapStateToProps, {
    fetchUserServices
})(UserServices);