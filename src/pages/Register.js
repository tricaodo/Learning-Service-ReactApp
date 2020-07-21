/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/authAction";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";

const Register = (props) => {
    const { addToast } = useToasts();
    const handleRegister = info => {
        props
            .register(info)
            .then(() => { })
            .catch(error => {
                addToast(error.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
            })
    }
    if (props.auth.isLoggined) return <Redirect to="/" />
    return (
        // <div className="auth-page">
        //     <div className="container has-text-centered">
        //         <div className="column is-4 is-offset-4">
        //             <h3 className="title has-text-grey">Register</h3>
        //             <p className="subtitle has-text-grey">Please Register to proceed.</p>
        //             <div className="box">
        //                 <figure className="avatar">
        //                     <img src="https://placehold.it/128x128" alt="register-logo" />
        //                 </figure>
        //                 <RegisterForm handleRegister={handleRegister} />
        //             </div>
        //             <p className="has-text-grey">
        //                 <a>Sign In With Google</a>&nbsp;
        //                 <a href="/">Sign Up</a> &nbsp;·&nbsp;
        //                 <a href="../">Need Help?</a>
        //             </p>
        //         </div>
        //     </div>
        // </div>

        <section class="section" style={{ marginTop: "50px" }}>
            <div class="container ">
                <div class="columns is-mobile is-centered ">
                    <div class="column is-one-third">
                        <div class="box ">
                            <h1 class="title has-text-centered has-text-grey-dark">Sign Up</h1>
                            <RegisterForm handleRegister={handleRegister} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
const mapStateToProps = state => {
    return { auth: state.auth };
}
export default connect(mapStateToProps, {
    register
})(Register);