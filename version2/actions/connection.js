import firebase from "firebase/app";
import "firebase/database";

export const isOnlineState = {
    state: "online",
    last_change: firebase.database.ServerValue.TIMESTAMP
}

export const isOfflineState = {
    state: "offline",
    last_change: firebase.database.ServerValue.TIMESTAMP
}

export const createConnectionRef = uid => firebase.database().ref(`status/${uid}`);

const onConnectionState = callback => {
    firebase
        .database()
        .ref(".info/connected")
        .on("value", snapShot => callback(snapShot));
}

export const checkUserConnection = uid => {
    const connectionRef = createConnectionRef(uid);
    onConnectionState(snapShot => {
        if (snapShot.val()) {
            connectionRef
                .onDisconnect()
                .set(isOfflineState)
                .then(() => connectionRef.set(isOnlineState))

        } else {
            connectionRef.set(isOfflineState);
            return null;
        }
    })
}