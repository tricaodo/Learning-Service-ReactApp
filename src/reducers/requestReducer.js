import { FETCH_SERVICE, IS_FETCHING, FETCH_RECEIVED_OFFERS, FETCH_SENT_OFFERS } from "../types";
export default (state = false, action) => {
    switch (action.type) {
        case IS_FETCHING:
            return true;
        case FETCH_SERVICE:
            return false;
        case FETCH_RECEIVED_OFFERS:
            return false;
        case FETCH_SENT_OFFERS:
            return false;
        default:
            return state;
    }
}