import fb from "firebase/app";
import "firebase/auth";
import db from "../db";
import { REGISTER, REGISTER_ERROR, SIGNIN, SIGNOUT } from "../types";
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
            description: ""
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

const fetchUserInfo = id => {
    return db
        .collection("profiles")
        .doc(id)
        .get();
}

export const signIn = info => async dispatch => {
    try {
        const res = await fb.auth().signInWithEmailAndPassword(info.email, info.password);
        fetchUserInfo(res.user.uid)
            .then(doc => {
                dispatch({ type: SIGNIN, payload: { isLoggined: true, profile: { id: doc.id, ...doc.data() } } })
                history.push("/");
            })

    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const signOut = () => async dispatch => {
    await fb.auth().signOut()
    history.push("/");
    dispatch({ type: SIGNOUT })
}

export const onAuthStateChanged = () => dispatch => {
    fb
        .auth()
        .onAuthStateChanged(doc => {
            if (doc) {
                fetchUserInfo(doc.uid)
                    .then(doc => {
                        dispatch({ type: SIGNIN, payload: { isLoggined: true, profile: { id: doc.id, ...doc.data() } } })
                    })
            } else {
                dispatch({ type: SIGNOUT });
            }
        })
}