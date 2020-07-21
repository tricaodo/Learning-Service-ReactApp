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
        note: "",
        collaborateCreated: false
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
                <div className="control">
                    <textarea
                        className="textarea has-fixed-size"
                        placeholder="Your Note..."
                        onChange={handleChange}
                        name="note"
                    ></textarea>
                </div>
                <p className="help">Note can increase chance of getting the service</p>
            </div>

            <div className="field">
                <div className="control">
                    <input
                        onChange={handleChange}
                        name="time"
                        className="input"
                        type="number"
                        placeholder="How long is for the service?" />
                    <p className="help">Enter time in hours</p>
                </div>
            </div>

            <div className="has-text-centered">
                <div className="service-price-title">
                    <p>Uppon acceptance {props.service.user.fullName} will charge you:</p>
                    <span className="is-size-3"><i className="fas fa-dollar-sign"></i>{`${offerDetail.price}`}</span>
                </div>
            </div>
        </Modal>
    )
}

export default ModalOffer;