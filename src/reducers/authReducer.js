import { REGISTER, REGISTER_ERROR, SIGNIN } from "../types";
export default (state = {}, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...action.payload };
        case SIGNIN:
            return { ...action.payload };
        case REGISTER_ERROR:
            return { ...action.payload };

        default:
            return state;
    }
}