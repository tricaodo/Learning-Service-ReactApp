import React from 'react'
import { connect } from "react-redux";
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
  sendChatMessage,
  subToChatMessages
} from "../actions/collaborationAction";
import JoinedPeople from '../components/JoinedPeople';
import moment from "moment";
import CollaborationMessages  from '../components/CollaborationMessages';

class Collaboration extends React.Component {

  state = {
    inputValue: ""
  }

  componentDidMount() {
    const { match, profile, subToCollaboration, subToChatMessages } = this.props
    joinCollaboration(match.params.id, profile.id);
    subToCollaboration(match.params.id);
    subToChatMessages(match.params.id);
    this.helper();
  }

  helper() {
    setTimeout(() => {
      const { collab: { joinedPeople }, subToProfile } = this.props;
      joinedPeople.forEach(person => subToProfile(person.id));
    }, 2000);
  }

  componentWillUnmount() {
    const { match, profile } = this.props
    leaveCollaboration(match.params.id, profile.id);
  }

  sendMessage = () => {
    const { inputValue } = this.state;
    if (inputValue.trim() === "") return;
    const content = inputValue.trim();
    const { profile, match: { params } } = this.props;
    const timestamp = moment().valueOf().toString()
    const message = {
      user: {
        uid: profile.id,
        fullName: profile.fullName,
        avatar: profile.avatar
      },
      timestamp: parseInt(timestamp, 10),
      content: content
    }
    this.setState({ inputValue: "" });
    sendChatMessage(params.id, message, timestamp)
  }

  handleKeyPress = e => {
    if (e.key === "Enter") this.sendMessage();
  }

  render() {
    const { collaboration, joinedPeople, messages } = this.props.collab;
    return (
      <div className="content-wrapper">
        <div className="root">
          <h1 className="title">{collaboration.title}</h1>
          <div className="body">
            <div className="viewListUser" >
              <JoinedPeople users={joinedPeople} />
            </div>
            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                  <img className="viewAvatarItem" src="https://i.imgur.com/cVDadwb.png" alt="icon avatar" />
                  <span className="textHeaderChatBoard">Filip Jerga</span>
                </div>
                <CollaborationMessages messages={messages} user={this.props.profile} />
                <div className="viewBottom">
                  <input
                    value={this.state.inputValue}
                    className="viewInput"
                    placeholder="Type your message..."
                    onKeyPress={(e) => { this.handleKeyPress(e) }}
                    onChange={(e) => this.setState({ inputValue: e.target.value })} />
                  <button
                    className="button is-primary"
                    onClick={() => this.sendMessage()}
                  >
                    Send
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { 
      collab: state.collab, 
      profile: state.auth.profile,
     };
}
export default connect(mapStateToProps, {
  subToCollaboration,
  subToProfile,
  subToChatMessages
})(Collaboration);