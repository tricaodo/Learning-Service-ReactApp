import React from 'react'
import { connect } from "react-redux";
import { subToCollaboration, joinCollaboration } from "../actions/collaborationAction";
import JoinedPeople from '../components/JoinedPeople';

class Collaboration extends React.Component {
  componentDidMount() {
    const { subToCollaboration, match, profile } = this.props
    subToCollaboration(match.params.id)
    joinCollaboration(match.params.id, profile.id)
  }

  render() {
    const { collaboration, joinedPeople } = this.props.collab;
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
                <div className="viewListContentChat">
                  <div className="viewWrapItemLeft">
                    <div className="viewWrapItemLeft3">
                      <img src="https://i.imgur.com/cVDadwb.png" alt="avatar" className="peerAvatarLeft" />
                      <div className="viewItemLeft">
                        <span className="textContentItem">hey</span>
                      </div>
                    </div>
                    <span className="textTimeLeft">Oct 31, 2019</span>
                  </div>
                  <div className="viewItemRight">
                    <span className="textContentItem">hey</span>
                  </div>
                  <div style={{ float: "left", clear: "both" }}></div>
                </div>
                <div className="viewBottom">
                  <input className="viewInput" placeholder="Type your message..." />
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
  return { collab: state.collab, profile: state.auth.profile };
}
export default connect(mapStateToProps, {
  subToCollaboration
})(Collaboration);