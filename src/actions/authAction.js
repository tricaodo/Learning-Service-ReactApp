import fb from "firebase/app";
import "firebase/auth";
import db from "../db";
import { REGISTER, REGISTER_ERROR, SIGNIN } from "../types";
import history from "../history";

const createProfile = ({ email, avatar, fullName, id }) => {
    return db
        .collection("profiles")
        .doc(id)
        .set({ id, fullName, email, avatar, services: [], description: "" })
}

export const register = info => async (dispatch, getState) => {
    try {
        const res = await fb.auth().createUserWithEmailAndPassword(info.email, info.password);
        const profile = { id: res.user.uid, ...info };
        createProfile(profile)
            .then(() => {
                dispatch({ type: REGISTER, payload: profile });
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
                dispatch({ type: SIGNIN, payload: { id: doc.id, ...doc.data() } })
                history.push("/");
            })

    } catch (error) {
        return Promise.reject(error.message);
    }
}