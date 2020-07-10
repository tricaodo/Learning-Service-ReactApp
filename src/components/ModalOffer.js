import React, { useState } from "react";
import Modal from "./Modal";

const ModalOffer = props => {
    const [offerDetail, setOfferDetail] = useState({
        fromUser: "",
        toUser: "",
        service: "",
        status: "pending",
        price: 0,
        time: 0,
        note: ""
    });

    const handleChange = ({ target: { name, value } }) => {
        if (name === "time") {
            const totalPrice = Math.round(props.service.price * value * 100) / 100;
            return setOfferDetail({ ...offerDetail, [name]: value, price: totalPrice });
        }
        return setOfferDetail({ ...offerDetail, [name]: value });
    }

    const handleSubmit = () => {
        console.log(offerDetail);
    }

    return (
        <Modal handleSubmit={handleSubmit}>
            <div className="field">
                <input
                    onChange={handleChange}
                    name="note"
                    className="input is-large"
                    type="text"
                    placeholder="Write some catchy note"
                    max="5"
                    min="0" />
                <p className="help">Note can increase chance of getting the service</p>
            </div>
            <div className="field">
                <input
                    onChange={handleChange}
                    name="time"
                    className="input is-large"
                    type="number"
                    placeholder="How long you need service for ?"
                    max="5"
                    min="0" />
                <p className="help">Enter time in hours</p>
            </div>
            <div className="service-price has-text-centered">
                <div className="service-price-title">
                    Uppon acceptance "Filip Jerga" will charge you:
                </div>
                <div className="service-price-value">
                    <h1 className="title">${`${offerDetail.price}`}</h1>
                </div>
            </div>
        </Modal>
    )
}

export default ModalOffer;