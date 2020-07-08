import { serviceReducer } from "./serviceReducer";
import { combineReducers } from "redux";

export default combineReducers({
    services: serviceReducer
});
