import React, { useState } from "react";
import { connect } from "react-redux";
import { createService } from "../../actions/serviceAction";
import requiredAuth from "../../components/hoc/requiredAuth";

const ServiceCreate = props => {
    const [serviceForm, setServiceForm] = useState({
        title: "",
        category: "Mathematics",
        description: "",
        image: "",
        price: undefined
    });

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
        <section className="section" style={{ marginTop: "50px" }}>
            <div className="container">
                <div className="columns is-mobile is-centered ">
                    <div className="column is-two-thirds">
                        <h1 className="title has-text-centered has-text-grey-dark">Create Service</h1>
                        <div className="box ">
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
                                            placeholder="Title" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea
                                            name="description"
                                            onChange={handleChange}
                                            v-model="form.description"
                                            className="textarea has-fixed-size"
                                            placeholder="Description..."></textarea>
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
                                            placeholder="Price/Hour" />
                                    </div>
                                </div>
                                <div className="field">
                                    <input className="input button is-primary is-light is-outlined" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

const mapStateToProps = state => {
    return { auth: state.auth };
}

export default connect(mapStateToProps, {
    createService
})(requiredAuth(ServiceCreate));