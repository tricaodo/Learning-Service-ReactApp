import React from "react";
import { connect } from "react-redux";
import { fetchService, updateServiceById } from "../../actions/serviceAction";
import history from "../../history";

class ServiceEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            description: "",
            image: "",
            price: 0
        };
    }

    async componentDidMount() {
        await this.props.fetchService(this.props.match.params.id)
        const { service } = this.props;
        this.setState({
            title: service.title,
            category: service.category,
            description: service.description,
            image: service.image,
            price: service.price
        })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handeSubmit = e => {
        e.preventDefault();
        const data = { ...this.state, price: parseInt(this.state.price) }
        updateServiceById(this.props.match.params.id, data)
            .then(() => {
                history.push("/services");
            })
    }

    handleLoading = () => {
        this.refs.myloading.className = "input button is-primary is-light is-outlined is-loading";
    }

    render() {
        const { title, category, description, image, price } = this.state;
        return (
            <section className="section" style={{ marginTop: "50px" }}>
                <div className="container">
                    <div className="columns is-mobile is-centered ">
                        <div className="column is-two-thirds">
                            <h1 className="title has-text-centered has-text-grey-dark">Edit Service</h1>
                            <div className="box ">
                                <form onSubmit={this.handeSubmit}>
                                    <div className="field">
                                        <label className="label">Category</label>
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    name="category"
                                                    onChange={this.handleChange}
                                                    value={category}>
                                                    <option value="Mathematics">Mathematics</option>
                                                    <option value="Programming">Programming</option>
                                                    <option value="Chemistry">Chemistry</option>
                                                    <option value="Physic">Physic</option>
                                                    <option value="AI">Artificial Intelligence</option>
                                                    <option value="History">History</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Title</label>
                                        <div className="control">
                                            <input
                                                name="title"
                                                onChange={this.handleChange}
                                                className="input"
                                                type="text"
                                                placeholder="Title"
                                                value={title}
                                            />

                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Price per Hour</label>
                                        <div className="control">
                                            <input
                                                name="price"
                                                onChange={this.handleChange}
                                                className="input"
                                                type="number"
                                                placeholder="Price/Hour"
                                                value={price} />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Description</label>
                                        <div className="control">
                                            <textarea
                                                name="description"
                                                onChange={this.handleChange}
                                                v-model="form.description"
                                                className="textarea has-fixed-size"
                                                placeholder="Description..."
                                                value={description}></textarea>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Image Url</label>
                                        <div className="control">
                                            <input
                                                name="image"
                                                onChange={this.handleChange}
                                                className="input"
                                                type="text"
                                                placeholder="Image Url"
                                                value={image} />
                                        </div>
                                    </div>


                                    <div className="field">
                                        <button ref="myloading" className="input button is-primary is-light is-outlined" onClick={() => { this.handleLoading() }}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { service: state.services[ownProps.match.params.id], auth: state.auth };
}

export default connect(mapStateToProps, {
    fetchService,
})(ServiceEdit);