import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createService } from "../../actions/serviceAction";

const ServiceCreate = props => {
    const [serviceForm, setServiceForm] = useState({
        title: "",
        category: "Mathematics",
        description: "",
        image: "",
        price: undefined
    });

    if (!props.auth.isLoggined) return <Redirect to="/login" />

    const handleChange = e => {
        const { name, value } = e.target;
        setServiceForm({ ...serviceForm, [name]: value });
    }

    const handeSubmit = e => {
        e.preventDefault();
        const data = { ...serviceForm, price: parseInt(serviceForm.price) }
        props.createService(props.auth.profile.id, data);
    }

    return (
        <div className="create-page">
            <div className="container">
                <div className="form-container">
                    <h1 className="title">Create Service</h1>
                    <form onSubmit={handeSubmit}>
                        <div className="field">
                            <label className="label">Category</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        name="category"
                                        onChange={handleChange}>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="programming">Programming</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="physic">Physic</option>
                                        <option value="ai">Artificial Intelligence</option>
                                        <option value="history">History</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                    name="title"
                                    onChange={handleChange}
                                    className="input"
                                    type="text"
                                    placeholder="Text input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    v-model="form.description"
                                    className="textarea"
                                    placeholder="Textarea"></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Image Url</label>
                            <div className="control">
                                <input
                                    name="image"
                                    onChange={handleChange}
                                    className="input"
                                    type="text"
                                    placeholder="Text input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Price per Hour</label>
                            <div className="control">
                                <input
                                    name="price"
                                    onChange={handleChange}
                                    className="input"
                                    type="number"
                                    placeholder="Text input" />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    type="submit" className="button is-link">Create</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth };
}

export default connect(mapStateToProps, {
    createService
})(ServiceCreate);