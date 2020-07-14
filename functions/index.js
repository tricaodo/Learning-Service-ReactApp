// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database.ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const userFirestoreRef = firestore.doc(`/profiles/${context.params.uid}`);
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    if(status.last_change > eventStatus.last_change){
      return null;
    }
    eventStatus.last_change = new Date(eventStatus.last_change);

    return userFirestoreRef.update(eventStatus);
  })