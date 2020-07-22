import React from 'react'
import { Link, Redirect } from "react-router-dom"
import moment from 'moment'
import { connect } from "react-redux";
import { fetchCollaborations } from "../actions/collaborationAction";
import requiredAuth from "../components/hoc/requiredAuth";

class Collaborations extends React.Component {

    state = {
        collaborations: []
    }

    componentDidMount() {

        const { id } = this.props.auth.profile;
        if (!id) return <Redirect to="/" />
        fetchCollaborations(id)
            .then(collaborations => this.setState({ collaborations }))
    }

    render() {
        const { collaborations } = this.state
        return (
            <section className="section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="columns is-mobile is-centered is-multiline">
                        <div className="column is-two-thirds">
                            <h1 className="title">Collaborations</h1>
                            <div className="box content">
                                {collaborations.map(c => (
                                    <article className="media" key={c.id}>
                                        <div className="media-left">
                                            <figure className="image is-32x32">
                                                <img src={c.image} alt={c.image} />
                                            </figure>
                                        </div>
                                        <div className="media-content">

                                            <div className="content">

                                                <span className="has-text-weight-semibold">{c.title}  </span>
                                                <p>
                                                    <span className="is-size-7 is-italic">replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;</span>
                                                    <span className="tag">{c.status}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="media-right">
                                            <span className="has-text-grey-light">
                                                <Link to={`/collaborations/${c.id}`}>
                                                    <button className="button is-primary is-light is-outlined">Enter</button>
                                                </Link>
                                            </span>
                                        </div>

                                    </article>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(requiredAuth(Collaborations));