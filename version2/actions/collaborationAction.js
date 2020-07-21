import db, { Timestamp } from "../db";
import firebase from "firebase/app";
import {
    CREATE_COLLABORATION_FROM_OFFER,
    FETCH_COLLABORATION,
    FETCH_JOINED_PEOPLE,
    SUBCRIBE_TO_PROFILE,
    SUBCRIBE_TO_MESSAGES,
    LEAVE_COLLABORATION,
    UNAUTHORIZED_TO_COLLABORATION
} from "../types";
import { createRef } from "./helper";

import history from "../history";

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
        .then(snapShot => snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        

const fetchCollaborationById = (collabId, callback) =>
    db
        .collection("collaborations")
        .doc(collabId)
        .onSnapshot(
            snapShot => callback(snapShot.data()))

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
        dispatch({ type: FETCH_COLLABORATION, payload: {id: collabId, ...collaboration} });
        dispatch({ type: FETCH_JOINED_PEOPLE, payload: joinedPeople });
    })

export const joinCollaboration = (collabId, userId) => {
    const userRef = createRef("profiles", userId);
    console.log("errorr==============");
    db
        .collection("collaborations")
        .doc(collabId)
        .update({ "joinedPeople": firebase.firestore.FieldValue.arrayUnion(userRef) });
}

export const leaveCollaboration = (collabId, userId) => dispatch => {
    const userRef = createRef("profiles", userId);
    db
        .collection("collaborations")
        .doc(collabId)
        .update({ "joinedPeople": firebase.firestore.FieldValue.arrayRemove(userRef) })
        .then(() => {
            dispatch({ type: LEAVE_COLLABORATION })
        })
}

export const subToProfile = uid => dispatch => 
    db
        .collection("profiles")
        .doc(uid)
        .onSnapshot(snapShot => {
            const profile = { id: snapShot.id, ...snapShot.data() };
            dispatch({ type: SUBCRIBE_TO_PROFILE, payload: { profile } })
        })


export const sendChatMessage = (collabId, message, timestamp) =>
    db
        .collection("collaborations")
        .doc(collabId)
        .collection("messages")
        .doc(timestamp)
        .set(message)

export const subToChatMessages = collabId => dispatch => 
    db
        .collection("collaborations")
        .doc(collabId)
        .collection("messages")
        .onSnapshot(
            snapshot => {
            dispatch({ type: SUBCRIBE_TO_MESSAGES, payload: snapshot.docChanges() })
        }, 
            () => {
                history.push("/");
                dispatch({type: UNAUTHORIZED_TO_COLLABORATION})});
        


export const startCollaboration = (collabId, time) => {
    const timestamp = Timestamp.now().seconds.valueOf();
    const expiredAt = new Timestamp(timestamp + time, 0);
    db
        .collection("collaborations")
        .doc(collabId)
        .update({ expiredAt, status: "activated" })
}

export const endCollaboration = collabId => {
    db 
        .collection("collaborations")
        .doc(collabId)
        .update({status: "finished"})
}