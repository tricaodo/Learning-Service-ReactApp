import React from 'react'
import { connect } from "react-redux";
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
  sendChatMessage,
  subToChatMessages,
  startCollaboration,
  endCollaboration
} from "../actions/collaborationAction";
import JoinedPeople from '../components/JoinedPeople';
import moment from "moment";
import CollaborationMessages from '../components/CollaborationMessages';
import Timer from '../components/Timer';
import { Timestamp } from '../db';

class Collaboration extends React.Component {

  state = {
    inputValue: ""
  }

  componentDidMount() {
    const { match, profile, subToCollaboration, subToChatMessages } = this.props
    joinCollaboration(match.params.id, profile.id);
    this.unSubToCollaboration = subToCollaboration(match.params.id);
    this.unSubToChatMessages = subToChatMessages(match.params.id);
    this.helper();
  }

  helper() {
    this.unSubToProfiles = []
    setTimeout(() => {
      const { collab: { joinedPeople, collaboration }, subToProfile } = this.props;
      joinedPeople.forEach(person => this.unSubToProfiles.push(subToProfile(person.id)));
      if (collaboration.expiredAt && Timestamp.now().seconds > collaboration.expiredAt.seconds)
        this.onEndCollaboration(collaboration.id);
    }, 2000);
  }

  componentWillUnmount() {
    const { match, profile, leaveCollaboration } = this.props
    leaveCollaboration(match.params.id, profile.id);
    this.unSubToCollaboration();
    this.unSubToChatMessages();
    this.unSubToProfiles.forEach(unSubToProfile => unSubToProfile())
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

  handleStartCollaboration = collaborate => {
    const { time } = collaborate;
    const { match: { params: { id } } } = this.props;
    startCollaboration(id, time);
  }

  renderCollaborationHeader = collaboration => {
    if (collaboration.status === "pending") {
      return (
        <div className="headerChatButton">
          <button
            className="button is-success is-light is-outlined"
            onClick={() => this.handleStartCollaboration(collaboration)}>
            Start Collaboration
        </button>
        </div>
      )
    }
    if (collaboration.status === "activated") {
      return (
        collaboration.expiredAt &&
        <Timer
          seconds={collaboration.expiredAt.seconds - Timestamp.now().seconds}
          handleEndCollaboration={this.onEndCollaboration}
          collabId={collaboration.id}
        />
      )
    }
    if (collaboration.status === "finished") {
      return (
        <span className="tag is-danger is-small ">
          Collaboration has been finished
        </span>
      )
    }
  }

  onEndCollaboration = collabId =>
    endCollaboration(collabId)

  render() {
    const { collaboration, joinedPeople, messages } = this.props.collab;
    const { profile } = this.props;
    return (
      <div className="content-wrapper" style={{marginTop: "150px"}}>
        <div className="root">
          <h1 className="title">{collaboration.title}</h1>
          <div className="body">
            <div className="viewListUser" >
              <JoinedPeople users={joinedPeople} />
            </div>
            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                  <div className="headerChatUser">
                    <img className="viewAvatarItem" src="https://i.imgur.com/cVDadwb.png" alt="icon avatar" />
                    <span className="textHeaderChatBoard">{profile.fullName}</span>
                  </div>

                  {this.renderCollaborationHeader(collaboration)}

                </div>
                <div className="viewListContentChat">
                  <CollaborationMessages
                    messages={messages}
                    user={this.props.profile}
                  />
                  <div style={{ float: "left", clear: "both" }}></div>
                </div>
                <div className="viewBottom">
                  <input
                    disabled={collaboration.status === "finished" || collaboration.status === "pending"}
                    value={this.state.inputValue}
                    className="viewInput"
                    placeholder="Type your message..."
                    onKeyPress={(e) => { this.handleKeyPress(e) }}
                    onChange={(e) => this.setState({ inputValue: e.target.value })} />
                  <button
                    disabled={collaboration.status === "finished" || collaboration.status === "pending"}
                    className="button is-primary is-light is-outlined"
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
  subToChatMessages,
  leaveCollaboration
})(Collaboration);