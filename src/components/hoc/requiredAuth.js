import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

export default (ChildComponent) => {
    class ComposedComponent extends React.Component {
        render() {
            if (!this.props.auth.isLoggined) {
                return <Redirect to="/login" />
            }
            return <ChildComponent {...this.props} {...this.state} />
        }
    }

    const mapStateToProps = state => {
        return { auth: state.auth }
    }

    return connect(mapStateToProps)(ComposedComponent);
}