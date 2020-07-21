/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { signIn } from "../actions/authAction";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";

const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const { addToast } = useToasts();
    const onSubmit = data => {
        props
            .signIn(data)
            .then(() => {

            })
            .catch(error => {
                addToast(error, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
            })
    }
    if (props.auth.isLoggined) {
        return <Redirect to="/" />
    }
    return (
        <section className="section" style={{ marginTop: "100px" }}>
            <div className="container">
                <div className="columns is-mobile is-centered ">
                    <div className="column is-one-third">
                        <div className="box">
                            <h1 className="title has-text-centered has-text-grey-dark">Login</h1>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="field">
                                    <label className="label has-text-grey-dark">Email</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input
                                            ref={register}
                                            name="email"
                                            className="input"
                                            type="email"
                                            placeholder="Your Email"
                                            // autoFocus=""
                                            autoComplete="email" />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        {/* <div className="form-error">
                                        <span className="help is-danger">Email is required</span>
                                        <span className="help is-danger">Email address is not valid</span>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label has-text-grey-dark">Password</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input
                                            ref={register}
                                            name="password"
                                            className="input"
                                            type="password"
                                            placeholder="Your Password"
                                            autoComplete="current-password" />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        {/* <div className="form-error">
                                        <span className="help is-danger">Password is required</span>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="field">
                                    <input
                                        type="submit"
                                        className="input button is-primary" value="Sign In" />
                                </div>
                            </form>
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
    signIn
})(Login);