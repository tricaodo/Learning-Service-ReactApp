import db from "../db";
import { createRef } from "./helper";

export const createOffer = offer => {
    return db
        .collection("offers")
        .add(offer)
}

const extractOfferData = async (offer, offerType) => {
    offer.service = await offer.service.get()
    offer[offerType] = await offer[offerType].get();

    offer.service = offer.service.data();
    offer[offerType] = offer[offerType].data();

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
            dispatch({ type: "FETCH_OFFERS", payload: offers, offerType: "sent" });
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
            dispatch({ type: "FETCH_OFFERS", payload: offers, offerType: "received" });
        })
}