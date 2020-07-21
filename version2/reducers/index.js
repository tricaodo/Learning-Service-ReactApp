import serviceReducer from "./serviceReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";
import { combineReducers } from "redux";
import collaborationReducer from "./collaborationReducer";

export default combineReducers({
    services: serviceReducer,
    auth: authReducer,
    offer: offerReducer,
    collab: collaborationReducer
});
