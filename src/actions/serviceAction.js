import { FETCH_SERVICES, FETCH_SERVICE, CREATE_SERVICE, FETCH_SERVICES_FOR_USER } from "../types";
import history from "../history";
import db from "../db";
import { createRef } from "./helper";
export const fetchServices = () => dispatch => {
    let services = []
    db
        .collection("services")
        .get()
        .then(async snapshot => {

            services = await Promise.all(snapshot.docs.map(async doc => {
                const userDoc = await doc.data().user.get();
                return { id: doc.id, ...doc.data(), user: userDoc.data() }
            }))
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
                const info = { uid: user.id, fullName: user.fullName, email: user.email, avatar: user.avatar }
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

export const fetchServicesForUser = userId => dispatch => {
    let services = []
    db
        .collection("services")
        .get()
        .then(async snapshot => {
            services = await Promise.all(snapshot.docs.map(async doc => {
                const userDoc = await doc.data().user.get();
                return { id: doc.id, ...doc.data(), user: userDoc.data() }
            }))
            const filterServices = services.filter(service => service.user.id === userId);
            dispatch({ type: FETCH_SERVICES_FOR_USER, payload: filterServices });
        })
}
