/* eslint no-useless-escape: 0 */
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { isSame } from "../../helper/validations";

const RegisterForm = (props) => {
    const { register, handleSubmit, errors, getValues } = useForm();
    const loadingBtn = useRef()
    const onSubmit = data => {
        props.handleRegister(data, loadingBtn);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label className="label has-text-grey-dark">Full Name</label>
                <div className="control">
                    <input
                        ref={register({ required: true })}
                        name="fullName"
                        className="input"
                        type="text"
                        placeholder="Full Name"
                        autoFocus="" />
                    {errors.fullName &&
                        <div className="form-error">
                            <span className="help is-danger">Full Name is required</span>
                        </div>
                    }
                </div>
            </div>


            <div className="field">
                <label className="label has-text-grey-dark">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        name="email"
                        className="input"
                        type="email"
                        placeholder="Email"
                        autoFocus=""
                        autoComplete="email" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    {errors.email &&
                        <div className="form-error">
                            {errors.email.type === "required" && <span className="help is-danger">Email is required</span>}
                            {errors.email.type === "pattern" && <span className="help is-danger">Email address is not valid</span>}
                        </div>
                    }
                </div>
            </div>

            <div className="field">
                <label className="label has-text-grey-dark">Avatar</label>
                <div className="control  has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true })}
                        name="avatar"
                        className="input"
                        type="text"
                        placeholder="Avatar"
                        autoFocus="" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-image"></i>
                    </span>
                    {errors.avatar &&
                        <div className="form-error">
                            {errors.avatar.type === "required" && <span className="help is-danger">Avatar is required</span>}
                        </div>
                    }
                </div>
            </div>
            <div className="field">
                <label className="label has-text-grey-dark">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, minLength: 6 })}
                        name="password"
                        className="input"
                        type="password"
                        placeholder="Your Password"
                        autoComplete="current-password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                    {errors.password &&
                        <div className="form-error">
                            {errors.password.type === "required" && <span className="help is-danger">Password is required</span>}
                            {errors.password.type === "minLength" && <span className="help is-danger">Password must be at least 6 characters</span>}

                        </div>
                    }
                </div>
            </div>
            <div className="field">
                <label className="label has-text-grey-dark">Confirm Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, validate: { isSame: isSame(getValues, "password") } })}
                        name="passwordConfirmation"
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="current-password" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                    {errors.passwordConfirmation &&
                        <div className="form-error">
                            {errors.passwordConfirmation.type === "required" && <span className="help is-danger">Password Confirmation is required</span>}
                            {errors.passwordConfirmation.type === "isSame" && <span className="help is-danger">Passwords are not matched</span>}
                        </div>
                    }
                </div>
            </div>
            <div className="field">
                <button
                    ref={loadingBtn}
                    type="submit"
                    className="input button is-primary">Register</button>
            </div>
        </form>
    )
}

export default RegisterForm;