import { FETCH_SERVICES, FETCH_SERVICE, CREATE_SERVICE } from "../types";
import history from "../history";
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
        .then(async doc => {
            // const info = await doc.ref.get();
            console.log(doc.data());
            // console.log(info.data());
            dispatch({ type: FETCH_SERVICE, payload: { id: doc.id, ...doc.data() } });
        });
}


export const createService = (userId, serviceData) => dispatch => {
    const data = { userId, ...serviceData };
    db
        .collection("services")
        .add(data)
        .then(doc => {
            const service = { id: doc.id, ...data };
            dispatch({ type: CREATE_SERVICE, payload: service });
            history.push("/");
        });
}