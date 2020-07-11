import serviceReducer from "./serviceReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";
import { combineReducers } from "redux";

export default combineReducers({
    services: serviceReducer,
    auth: authReducer,
    offer: offerReducer
});
