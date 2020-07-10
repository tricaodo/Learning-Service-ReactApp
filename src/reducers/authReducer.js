import { REGISTER, REGISTER_ERROR, SIGNIN, SIGNOUT, FETCH_USER_SERVICES } from "../types";
const INITIAL_AUTH = {
    isResolved: false,
    isLoggined: false,
    profile: {}
}
export default (state = INITIAL_AUTH, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, ...action.payload };
        case REGISTER_ERROR:
            return { ...action.payload };
        case SIGNIN:
            return { ...state, ...action.payload, isResolved: true };
        case SIGNOUT:
            return { ...INITIAL_AUTH, isResolved: true };
        case FETCH_USER_SERVICES:
            const profile = { profile: { ...state.profile, services: [...action.payload] } }
            return { ...state, ...profile };
        default:
            return state;
    }
}