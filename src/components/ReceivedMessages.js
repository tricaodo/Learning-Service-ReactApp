import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateMessageAsRead } from "../actions/authAction";

const ReceivedMessage = ({ profile }) => {

    const handleMessageAsRead = messageId => {
        updateMessageAsRead(profile.id, messageId)
    }

    const renderMessages = () => {
        const { messages } = profile;
        const filterMessages = messages.filter(message => !message.isRead).map(message => (
            <div key={message.messageId} className="navbar-container-item-message">
                <div className="from-user">
                    <span>From: </span>{message.fromUser.fullName}
                </div>
                <hr />
                <div className="navbar-item navbar-item-message">
                    <div>
                        {message.text}
                    </div>
                    <Link onClick={() => { }} to={message.cta}>
                        <div className="button is-success">Join</div>
                    </Link>
                    <button
                        onClick={() => { handleMessageAsRead(message.messageId) }}
                        className="button is-warning">Later</button>
                </div>
            </div>
        ))
        if (filterMessages.length <= 0) {
            return <div className="navbar-item">No Messages</div>
        }
        return filterMessages;
    }
    return (
        renderMessages()
    )
}
const mapStateToProps = state => {
    return { profile: state.auth.profile }
}
export default connect(mapStateToProps)(ReceivedMessage);