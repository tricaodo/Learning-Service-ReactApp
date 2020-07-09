import { FETCH_SERVICES, FETCH_SERVICE } from "../types";
import db from "../db";
export const fetchServices = () => dispatch => {
    let services = []
    db
        .collection("services")
        .get()
        .then(snapshot => {
            services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            dispatch({ type: FETCH_SERVICES, payload: services });
        })
}

export const fetchService = id => dispatch => {
    db
        .collection("services")
        .doc(id)
        .get()
        .then(doc => {
            dispatch({ type: FETCH_SERVICE, payload: { id: doc.id, ...doc.data() } });
        });
}