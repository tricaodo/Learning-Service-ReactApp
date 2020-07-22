/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { connect } from "react-redux";
import { register } from "../actions/authAction";
import { useToasts } from "react-toast-notifications";
import guest from "../components/hoc/guest";
import Spinner from "../components/Spinner";

const Register = (props) => {
    const { addToast } = useToasts();
    const handleRegister = (info, loadingBtn) => {
        loadingBtn.current.className = "input button is-primary is-loading";
        props
            .register(info)
            .then(() => {
                addToast(`Hi ${info.fullName}! Welcome to our service.`, { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
            })
            .catch(error => {
                addToast(error.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
                loadingBtn.current.className = "input button is-primary";
            })
    }
    if (props.isFetching) return <Spinner />
    return (
        <section className="section" style={{ marginTop: "50px" }}>
            <div className="container ">
                <div className="columns is-mobile is-centered ">
                    <div className="column is-one-third">
                        <div className="box ">
                            <h1 className="title has-text-centered has-text-grey-dark">Sign Up</h1>
                            <RegisterForm handleRegister={handleRegister} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default connect(null, {
    register
})(guest(Register));