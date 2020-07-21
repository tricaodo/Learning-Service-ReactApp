import _ from "lodash";

import { FETCH_SERVICES, FETCH_SERVICE, CREATE_SERVICE, FETCH_SERVICES_FOR_USER } from "../types";

export default (services = {}, action) => {
    switch (action.type) {
        case FETCH_SERVICES:
            return { ...services, ..._.mapKeys(action.payload, "id") };
        case FETCH_SERVICE:
            return { ...services, [action.payload.id]: action.payload };
        case CREATE_SERVICE:
            return { ...services, [action.payload.id]: action.payload };
        case FETCH_SERVICES_FOR_USER:
            return { ..._.mapKeys(action.payload, "id") };
        default:
            return services;
    }
}