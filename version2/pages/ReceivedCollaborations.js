import React from 'react'
import { Link, Redirect } from "react-router-dom"
import moment from 'moment'
import { connect } from "react-redux";
import { fetchCollaborations } from "../actions/collaborationAction";

class Collaborations extends React.Component {

    state = {
        collaborations: []
    }

    componentDidMount() {
        const { id } = this.props.auth.profile;
        if(!id) return <Redirect to="/" />
        fetchCollaborations(id)
            .then(collaborations => this.setState({ collaborations }))
    }

    render() {
        const { collaborations } = this.state
        return (
            <div className="content-wrapper">
                <div className="container">
                    <h1 className="title">Collaborations</h1>
                    <div className="box content">
                        {collaborations.map(c => (
                            <article className="post" key={c.id}>
                                <h4>{c.title}</h4>
                                <div className="media">
                                    <div className="media-left">
                                        <p className="image is-32x32">
                                            <img src={c.image} alt={c.image} />
                                        </p>
                                    </div>
                                    <div className="media-content">
                                        <div className="content">
                                            <p>
                                                <span href="#">{c.fromUser.name}</span> replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                                                <span className="tag">{c.status}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="media-right">
                                        <span className="has-text-grey-light">
                                            <Link to={`/collaborations/${c.id}`}>
                                                <button className="button">Enter</button>
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Collaborations);