import React from "react";
import {Link } from "react-router-dom";

const ReceivedMessage = () => {
    return (
        <div>
            <div className="from-user">
                <span>From: </span>Filip Jerga
        </div>
            <hr />
            <div className="navbar-item navbar-item-message">
                <div>
                    Hello Filip Jerga, I would like to collaborate with you
          </div>
                <Link onClick={() => { }} to='/collaborations/dsada99786967'>
                    <div className="button is-success">Join</div>
                </Link>
                <button
                    onClick={() => { }}
                    className="button is-warning">Later</button>
            </div>
        </div>
    )
}

export default ReceivedMessage;