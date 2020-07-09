import _ from "lodash";

import { FETCH_SERVICES, FETCH_SERVICE } from "../types";

export default (services = {}, action) => {
    switch (action.type) {
        case FETCH_SERVICES:
            return { ...services, ..._.mapKeys(action.payload, "id") };
        case FETCH_SERVICE:
            return { ...services, [action.payload.id]: action.payload };
        default:
            return services;
    }
}