import { combineReducers } from "redux";
import { FETCH_RECEIVED_OFFERS, UPDATE_RECEIVED_OFFER, FETCH_SENT_OFFERS, CREATE_COLLABORATION_FROM_OFFER } from "../types"

const receivedOfferReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_RECEIVED_OFFERS:
            return action.payload;
        case UPDATE_RECEIVED_OFFER: {
            const idx = state.findIndex(offer => offer.id === action.payload.offerId);
            const newState = [...state];
            newState[idx].status = action.payload.status
            return newState;
        }
        default:
            return state;
    }
}


const sentOfferReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_SENT_OFFERS:
            return action.payload;
        case CREATE_COLLABORATION_FROM_OFFER: {
            const idx = state.findIndex(offer => offer.id === action.payload.offerId)
            const newState = [...state];
            newState[idx].collaborateCreated = true;
            return newState;
        }
        default:
            return state;
    }
}

export default combineReducers({
    sent: sentOfferReducer,
    received: receivedOfferReducer
});