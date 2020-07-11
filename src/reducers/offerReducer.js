import { combineReducers } from "redux";
const offerReducer = offersType => {
    return (state = [], action) => {
        if(offersType !== action.offerType){
            return state;
        }
        switch(action.type){
            case "FETCH_OFFERS":
                return action.payload;
            default:
                return state;
        }
    }
}

export default combineReducers({
    sent: offerReducer("sent"),
    received: offerReducer("received")
});