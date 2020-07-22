import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
export default ChildComponent => {
    class ComposedComponent extends React.Component {
        render() {
            return this.props.auth.isLoggined ? <Redirect to="/" /> : <ChildComponent {...this.props} />
        }
    }
    const mapStateToProps = state => {
        return { auth: state.auth };
    }
    return connect(mapStateToProps)(ComposedComponent);
}