import React from "react";

const JoinedPeople = ({ users }) => {

    const renderUserState = state => {
        return (
            <span className={`textItem tag ${state === "online" ? "is-success" : "is-danger"}`}>
                {state}
            </span>
        )
    }

    if (users.length > 0) {
        return users.map(user => (
            <div
                key={user.id}
                className="viewWrapItem">
                <img
                    className="viewAvatarItem"
                    src={user.avatar}
                    alt="icon avatar"
                />
                <div className=" viewWrapContentItem">
                    <span className="textItem">{user.fullName}
                    </span>
                    {renderUserState(user.state)}
                </div>
            </div>
        ))
    }
    return null;
}

export default JoinedPeople;