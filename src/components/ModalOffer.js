import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Modal from "./Modal";
import { createRef } from "../actions/helper";
import { createOffer } from "../actions/offerAction";

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

    const { addToast } = useToasts();

    const handleChange = ({ target: { name, value } }) => {
        if (name === "time") {
            const totalPrice = Math.round(props.service.price * value * 100) / 100;
            return setOfferDetail({ ...offerDetail, [name]: value, price: totalPrice });
        }
        return setOfferDetail({ ...offerDetail, [name]: value });
    }

    const handleSubmit = () => {
        const copyOffer = updateOffer();
        createOffer(copyOffer)
            .then(
                () => {
                    // closeModal();
                    addToast("Offer was created successfully", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
                },
                error =>
                    addToast(error.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 }))
    }

    const updateOffer = () => {
        const { auth, service } = props;
        const copyOffer = { ...offerDetail };
        copyOffer.fromUser = createRef("profiles", auth.profile.id);
        copyOffer.toUser = createRef("profiles", service.user.uid);
        copyOffer.service = createRef("services", service.id);
        copyOffer.price = parseInt(offerDetail.price, 10);
        copyOffer.time = parseInt(offerDetail.time, 10);
        return copyOffer;
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
                    Uppon acceptance {props.service.user.fullName} will charge you:
                </div>
                <div className="service-price-value">
                    <h1 className="title">${`${offerDetail.price}`}</h1>
                </div>
            </div>
        </Modal>
    )
}

export default ModalOffer;