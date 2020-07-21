/* eslint no-useless-escape: 0 */
import React from "react";
import { useForm } from "react-hook-form";
import { isValidImage, isSame } from "../../helper/validations";

const RegisterForm = (props) => {
    const { register, handleSubmit, errors, getValues } = useForm();
    const onSubmit = data => {
        props.handleRegister(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="field">
                <label class="label has-text-grey-dark">First Name</label>
                <div className="control">
                    <input
                        ref={register({ required: true })}
                        name="firstName"
                        className="input"
                        type="text"
                        placeholder="First Name"
                        autoFocus="" />
                    {errors.fullName &&
                        <div className="form-error">
                            <span className="help is-danger">First Name is required</span>
                        </div>
                    }
                </div>
            </div>

            <div className="field">
                <label class="label has-text-grey-dark">Last Name</label>
                <div className="control">
                    <input
                        ref={register({ required: true })}
                        name="lastName"
                        className="input"
                        type="text"
                        placeholder="Last Name"
                        autoFocus="" />
                    {errors.fullName &&
                        <div className="form-error">
                            <span className="help is-danger">Last Name is required</span>
                        </div>
                    }
                </div>
            </div>


            <div className="field">
                <label class="label has-text-grey-dark">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        name="email"
                        className="input"
                        type="email"
                        placeholder="Email"
                        autoFocus=""
                        autoComplete="email" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
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
                <label class="label has-text-grey-dark">Avatar</label>
                <div className="control  has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, validate: { isValidImage } })}
                        name="avatar"
                        className="input"
                        type="text"
                        placeholder="Avatar"
                        autoFocus="" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-image"></i>
                    </span>
                    {errors.avatar &&
                        <div className="form-error">
                            {errors.avatar.type === "required" && <span className="help is-danger">Avatar is required</span>}
                            {errors.avatar.type === "isValidImage" && <span className="help is-danger">Extension is not valid</span>}
                        </div>
                    }
                </div>
            </div>
            <div className="field">
                <label class="label has-text-grey-dark">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, minLength: 6 })}
                        name="password"
                        className="input"
                        type="password"
                        placeholder="Your Password"
                        autoComplete="current-password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
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
                <label class="label has-text-grey-dark">Confirm Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={register({ required: true, validate: { isSame: isSame(getValues, "password") } })}
                        name="passwordConfirmation"
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="current-password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    {errors.passwordConfirmation &&
                        <div className="form-error">
                            {errors.passwordConfirmation.type === "required" && <span className="help is-danger">Password Confirmation is required</span>}
                            {errors.passwordConfirmation.type === "isSame" && <span className="help is-danger">Passwords are not matched</span>}
                        </div>
                    }
                </div>
            </div>
            <div class="field">
                <input
                    type="submit"
                    className="input button is-primary" value="Register" />
            </div>
        </form>
    )
}

export default RegisterForm;