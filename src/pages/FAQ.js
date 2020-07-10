import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const FAQ = props => {
    if (!props.auth.isLoggined) return <Redirect to="/login" />
    return (
        <div>FAQ Page</div>
    );
}
const mapStateToProps = state => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(FAQ);