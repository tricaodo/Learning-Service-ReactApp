import db from "../db";
import { createRef } from "./helper";
import { FETCH_SENT_OFFERS, FETCH_RECEIVED_OFFERS, UPDATE_RECEIVED_OFFER } from "../types";

export const createOffer = offer => {
    return db
        .collection("offers")
        .add(offer)
}

const extractOfferData = async (offer, offerType) => {
    const service = await offer.service.get()
    const user = await offer[offerType].get();

    offer.service = service.data();
    offer.service.id = service.id;
    offer[offerType] = user.data();

    return offer;
}

export const fetchSentOffers = userId => dispatch => {
    const userRef = createRef("profiles", userId);
    return db
        .collection("offers")
        .where("fromUser", "==", userRef)
        .get()
        .then(async snapshot => {
            const offers = await Promise.all(snapshot.docs.map(async doc => {
                const processedData = await extractOfferData(doc.data(), "toUser");
                return { id: doc.id, ...processedData }
            }));
            dispatch({ type: FETCH_SENT_OFFERS, payload: offers });
        })
}

export const fetchReceivedOffers = userId => dispatch => {
    const userRef = createRef("profiles", userId);
    return db
        .collection("offers")
        .where("toUser", "==", userRef)
        .get()
        .then(async snapshot => {
            const offers = await Promise.all(snapshot.docs.map(async doc => {
                const processedData = await extractOfferData(doc.data(), "fromUser");
                return { id: doc.id, ...processedData };
            }))
            dispatch({ type: FETCH_RECEIVED_OFFERS, payload: offers });
        })
}

export const processOffer = (offerId, status) => dispatch => {
    db
        .collection("offers")
        .doc(offerId)
        .update({ status: status })
        .then(() => {
            dispatch({ type: UPDATE_RECEIVED_OFFER, payload: { offerId: offerId, status } })
        })
}
