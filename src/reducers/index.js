import serviceReducer from "./serviceReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";
import collaborationReducer from "./collaborationReducer";
import requestReducer from "./requestReducer";
import { combineReducers } from "redux";

export default combineReducers({
    services: serviceReducer,
    auth: authReducer,
    offer: offerReducer,
    collab: collaborationReducer,
    isFetching: requestReducer
});
