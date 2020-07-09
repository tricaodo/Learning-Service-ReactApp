/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/authAction";
import { useToasts } from "react-toast-notifications";

const Register = (props) => {
    const { addToast } = useToasts();
    const handleRegister = info => {
        props
            .register(info)
            .then(() => {
            })
            .catch(error => {
                console.log(error);
                addToast(error.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
            })
    }
    return (
        <div className="auth-page">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-grey">Register</h3>
                    <p className="subtitle has-text-grey">Please Register to proceed.</p>
                    <div className="box">
                        <figure className="avatar">
                            <img src="https://placehold.it/128x128" alt="register-logo" />
                        </figure>
                        <RegisterForm handleRegister={handleRegister} />
                    </div>
                    <p className="has-text-grey">
                        <a>Sign In With Google</a>&nbsp;
                        <a href="/">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return state;
}
export default connect(mapStateToProps, {
    register
})(Register);