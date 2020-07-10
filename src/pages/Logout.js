import React from "react";
import Spinner from "../components/Spinner";
import { signOut } from "../actions/authAction";
import { connect } from "react-redux";

class Logout extends React.Component {
    componentDidMount() {
        this.props.signOut();
    }
    render() {
        return (
            <Spinner />
        )
    }
}
export default connect(null, {
    signOut
})(Logout);