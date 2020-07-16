import React from "react";

const CollaborationMessages = ({ messages, user }) => {
    // console.log(messages);
    const renderMessages = () => {
        // messages.map(message => {
        //     if (message.user.uid === user.id) {
        //         console.log("==========")
        // return (

        // )

        return (
            <div className="viewWrapItemLeft">
                                <div className="viewItemRight">
                    <span className="textContentItem">hey</span>
                </div>
                <div className="viewWrapItemLeft3">
                    <img src="https://i.imgur.com/cVDadwb.png" alt="avatar" className="peerAvatarLeft" />
                    <div className="viewItemLeft">
                        <span className="textContentItem">hey</span>
                    </div>
                </div>
                <span className="textTimeLeft">Oct 31, 2019</span>

            </div>

        )

    }
    return (
        <div className="viewListContentChat">
            {renderMessages()}
            <div style={{ float: "left", clear: "both" }}></div>
        </div>
    )
}

export default CollaborationMessages;