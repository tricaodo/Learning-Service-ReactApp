import React from "react";
import { connect } from "react-redux";
import { updateMessageAsRead } from "../actions/authAction";
import { useHistory } from "react-router-dom";

const ReceivedMessage = ({ profile }) => {
    const history = useHistory();
    const handleMessageAsRead = messageId => {
        updateMessageAsRead(profile.id, messageId)
    }

    const handleJoinCollaboration = message => {
        updateMessageAsRead(profile.id, message.messageId)
        history.push(message.cta);
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
                    <div onClick={() => handleJoinCollaboration(message)} >
                        <div className="button is-success">Join</div>
                    </div>
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