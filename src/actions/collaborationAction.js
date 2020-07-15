import db from "../db";
import firebase from "firebase/app";
import { CREATE_COLLABORATION_FROM_OFFER, FETCH_COLLABORATION, FETCH_JOINED_PEOPLE } from "../types";
import { createRef } from "./helper";

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
        .then(snapShot => snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

const fetchCollaborationById = (collabId, callback) =>
    db
        .collection("collaborations")
        .doc(collabId)
        .onSnapshot(snapShot => callback(snapShot.data()))

export const subToCollaboration = collabId => dispatch =>
    fetchCollaborationById(collabId, async collaboration => {
        let joinedPeople = [];
        if (collaboration.joinedPeople) {
            joinedPeople = await Promise.all(
                collaboration.joinedPeople.map(async userRef => {
                    const userSnapshot = await userRef.get();
                    return { id: userSnapshot.id, ...userSnapshot.data() }
                })
            )
        }
        dispatch({ type: FETCH_COLLABORATION, payload: collaboration });
        dispatch({ type: FETCH_JOINED_PEOPLE, payload: joinedPeople });
    })

export const joinCollaboration = (collabId, userId) => {
    const userRef = createRef("profiles", userId);
    db
        .collection("collaborations")
        .doc(collabId)
        .update({ "joinedPeople": firebase.firestore.FieldValue.arrayUnion(userRef) });
}