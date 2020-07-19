import React from "react";
import moment from "moment"


class CollaborationMessages extends React.Component {

    scrollTo = (ref) => {
        console.log(ref);
        if (ref) {
            ref.scrollIntoView();
        }
    }

    renderMessages = ({ messages, user }) => {
        if (messages.length > 0) {
            return messages.map(message => {
                // Message is from currently logged in USER
                if (message.user.uid === user.id) {
                    return (
                        <div ref={this.scrollTo} key={message.id} className="viewWrapItemRight">
                            <div className="viewWrapItemRight3">
                                <img
                                    src={message.user.avatar}
                                    alt="avatar"
                                    className="peerAvatarLeft" />
                                <div className="viewItemRight">
                                    <span className="textContentItem">{message.content}</span>
                                </div>
                            </div>
                            <span className="textTimeLeft">{moment(message.timestamp).fromNow()}</span>
                        </div>
                    )
                }

                return (
                    <div ref={this.scrollTo} key={message.id} className="viewWrapItemLeft">
                        <div className="viewWrapItemLeft3">
                            <img
                                src={message.user.avatar}
                                alt="avatar"
                                className="peerAvatarLeft" />
                            <div className="viewItemLeft">
                                <span className="textContentItem">{message.content}</span>
                            </div>
                        </div>
                        <span className="textTimeLeft">{moment(message.timestamp).fromNow()}</span>
                    </div>
                )
            })
        }
        return null
    }

    render() {
        return this.renderMessages(this.props);
    }
}

// const CollaborationMessages = ({ messages, user }) => {
//     const renderMessages = () => {
//         if (messages.length > 0) {
//             return messages.map(message => {
//                 // Message is from currently logged in USER
//                 if (message.user.uid === user.id) {
//                     return (
//                         <div key={message.id} className="viewWrapItemRight">
//                             <div className="viewWrapItemRight3">
//                                 <img
//                                     src={message.user.avatar}
//                                     alt="avatar"
//                                     className="peerAvatarLeft" />
//                                 <div className="viewItemRight">
//                                     <span className="textContentItem">{message.content}</span>
//                                 </div>
//                             </div>
//                             <span className="textTimeLeft">{moment(message.timestamp).fromNow()}</span>
//                         </div>
//                     )
//                 }

//                 return (
//                     <div key={message.id} className="viewWrapItemLeft">
//                         <div className="viewWrapItemLeft3">
//                             <img
//                                 src={message.user.avatar}
//                                 alt="avatar"
//                                 className="peerAvatarLeft" />
//                             <div className="viewItemLeft">
//                                 <span className="textContentItem">{message.content}</span>
//                             </div>
//                         </div>
//                         <span className="textTimeLeft">{moment(message.timestamp).fromNow()}</span>
//                     </div>
//                 )
//             })
//         }

//         return null
//     }
//     return renderMessages()
// }

export default CollaborationMessages;