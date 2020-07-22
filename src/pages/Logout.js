import React from "react";
import Spinner from "../components/Spinner";
import { signOut } from "../actions/authAction";
import { connect } from "react-redux";
import requiredAuth from "../components/hoc/requiredAuth";

class Logout extends React.Component {
    componentDidMount() {
        this.props.signOut(this.props.profile.id);
    }
    render() {
        return (
            <Spinner />
        )
    }
}
const mapStateToProps = state => {
    return { profile: state.auth.profile }
}
export default connect(mapStateToProps, {
    signOut
})(requiredAuth(Logout));