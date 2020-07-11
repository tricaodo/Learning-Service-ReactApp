import { FETCH_SERVICES, FETCH_SERVICE, CREATE_SERVICE } from "../types";
import history from "../history";
import db from "../db";
import { createRef } from "./helper";
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
            if (!doc.data()) {
                history.push("/")
            } else {
                const userDoc = await doc.data().user.get();
                const user = userDoc.data();
                const info = { uid: user.id, fullName: user.fullName, email: user.email }
                dispatch({ type: FETCH_SERVICE, payload: { id: doc.id, ...doc.data(), user: info } });
            }
        });
}


export const createService = (user, serviceData) => dispatch => {
    const data = { user, ...serviceData };
    data.user = createRef("profiles", user);
    db
        .collection("services")
        .add(data)
        .then(doc => {
            const service = { id: doc.id, ...data };
            dispatch({ type: CREATE_SERVICE, payload: service });
            history.push("/");
        });
}
