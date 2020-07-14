import db from "../db";
import { CREATE_COLLABORATION_FROM_OFFER } from "../types";

const createCollaboration = collaboration =>
    db
        .collection("collaborations")
        .add(collaboration)


const sendMessage = message => {
    db
        .collection("profiles")
        .doc(message.toUser)
        .collection("messages")
        .add(message)
}

const updateOfferFromCreatedCollaboration = offerId => {
    db
        .collection("offers")
        .doc(offerId)
        .update({ collaborateCreated: true });
}

export const collaborate = ({ collaboration, message }) => dispatch =>
    createCollaboration(collaboration)
        .then(createCollabRef => {
            message.cta = `/collaborations/${createCollabRef.id}`;
            updateOfferFromCreatedCollaboration(collaboration.fromOffer)
            sendMessage(message);
            dispatch({ type: CREATE_COLLABORATION_FROM_OFFER, payload: { offerId: collaboration.fromOffer } });
        });

export const fetchCollaborations = userId => 
    db
        .collection("collaborations")
        .where("allowedPeople", "array-contains", userId)
        .get()
        .then(snapShot => snapShot.docs.map(doc => ({id: doc.id, ...doc.data()})));
