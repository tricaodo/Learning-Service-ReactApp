import fb from "firebase/app";
import "firebase/auth";
import db from "../db";
import { REGISTER, REGISTER_ERROR, SIGNIN, SIGNOUT, FETCH_USER_SERVICES, FETCH_MESSAGES } from "../types";
import { createConnectionRef, isOfflineState, isOnlineState } from "../actions/connection";
import history from "../history";

const createProfile = profile => {
    return db
        .collection("profiles")
        .doc(profile.id)
        .set(profile)
}

export const register = info => async dispatch => {
    try {
        const res = await fb.auth().createUserWithEmailAndPassword(info.email, info.password);
        const profile = {
            id: res.user.uid,
            fullName: info.fullName,
            email: info.email,
            avatar: info.avatar,
            services: [],
            description: "",
            messages: []
        };
        createProfile(profile)
            .then(() => {
                dispatch({ type: REGISTER, payload: { isResolved: true, isLoggined: true, profile } });
                history.push("/");
            })
            .catch(error => {
                dispatch({ type: REGISTER_ERROR, payload: error });
            });
    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchUserInfo = id => {
    return db
        .collection("profiles")
        .doc(id)
        .get();
}

export const signIn = info => async dispatch => {
    try {
        const res = await fb.auth().signInWithEmailAndPassword(info.email, info.password);
        fetchUserInfo(res.user.uid)
            .then(async doc => {
                const userStatusRef = createConnectionRef(doc.id);
                userStatusRef
                    .set(isOnlineState)
                    .then(() => {
                        dispatch({ type: SIGNIN, payload: { isLoggined: true, profile: { id: doc.id, ...doc.data() } } })
                        history.push("/");
                    })
            })

    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const signOut = uid => async dispatch => {
    await fb
        .auth()
        .signOut()
        .then(() => {
            const userStatusRef = createConnectionRef(uid);
            userStatusRef.set(isOfflineState);
        })
    history.push("/");
    dispatch({ type: SIGNOUT })
}

export const fetchUserServices = userId => dispatch => {
    db
        .collection("services")
        .where("uid", "==", userId)
        .get()
        .then(res => {
            const services = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch({ type: FETCH_USER_SERVICES, payload: services });
        })
}

export const onAuthStateChanged = () => dispatch => 
    fb
        .auth()
        .onAuthStateChanged(info => {
            if (info) {
                fetchUserInfo(info.uid)
                    .then(doc => {
                        dispatch({ type: SIGNIN, payload: { isLoggined: true, profile: { id: doc.id, ...doc.data() } } })
                    })
            } else {
                dispatch({ type: SIGNOUT });
            }
        })


export const fetchMessages = userId => dispatch =>
    db
        .collection("profiles")
        .doc(userId)
        .collection("messages")
        .onSnapshot(snapShot => {
            const messages = snapShot.docs.map(doc => ({ messageId: doc.id, ...doc.data() }))
            dispatch({ type: FETCH_MESSAGES, payload: messages })
        });


export const updateMessageAsRead = (userId, messageId) => {
    db
        .collection("profiles")
        .doc(userId)
        .collection("messages")
        .doc(messageId)
        .update({ isRead: true });
}