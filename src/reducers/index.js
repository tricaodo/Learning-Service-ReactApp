import serviceReducer from "./serviceReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

export default combineReducers({
    services: serviceReducer,
    auth: authReducer
});
