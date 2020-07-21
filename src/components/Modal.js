import React, { useState } from "react";

const Modal = props => {
    const [isActive, setIsActive] = useState(false);
    const handleActive = flag => {
        setIsActive(flag);
    }
    return (
        <div>
            <button onClick={() => handleActive(true)}
                type="button"
                className="button is-primary is-outlined button-open-modal"
                data-toggle="modal"
                data-target="#offerModal">
                Make an Offer
            </button>

            <div className={`modal ${isActive ? "is-active" : ""}`} id="offerModal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Make an Offer</p>
                        <button className="delete" aria-label="close" onClick={() => handleActive(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        {props.children}
                    </section>
                    <footer className="modal-card-foot" style={{justifyContent: "center"}}>
                        <button className="button is-success is-outlined" onClick={() => {props.handleSubmit();handleActive(false) }}>Save changes</button>
                        <button className="button cancel-modal" onClick={() => handleActive(false)}>Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Modal;