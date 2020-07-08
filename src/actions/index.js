import { FETCH_SERVICES, FETCH_SERVICE } from "../types";
import db from "../db";
// const services = [
//     {
//         id: "2asd8sa7d98",
//         user: "some_id_1",
//         category: "mathematics",
//         title: "I will teach you math fast",
//         description: "I am teaching highschool mathematics, algebra, triogometry. I can teach you anything.",
//         price: 10, // per hour
//         image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
//     },
//     {
//         id: "ssa9d789as7",
//         user: "some_id_2",
//         category: "programming",
//         title: "I will teach you programming",
//         description: "I am teaching Java, JavaScript, and more",
//         price: 10, // per hour
//         image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
//     }
// ]

export const fetchServices = () => async dispatch => {
    let services = []
    await db
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
            dispatch({ type: FETCH_SERVICE, payload: {id: doc.id, ...doc.data()} });
        });

}
