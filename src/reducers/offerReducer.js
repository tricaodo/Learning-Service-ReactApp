import { combineReducers } from "redux";
import { FETCH_RECEIVED_OFFERS, UPDATE_RECEIVED_OFFER, FETCH_SENT_OFFERS, CREATE_COLLABORATION_FROM_OFFER, RESET_RECEIVED_OFFERS, RESET_SENT_OFFERS } from "../types"

const receivedOfferReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_RECEIVED_OFFERS:
            return action.payload;
        case RESET_RECEIVED_OFFERS:
            return []
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
        case RESET_SENT_OFFERS:
            return [];            
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