import { FETCH_COLLABORATION, FETCH_JOINED_PEOPLE } from "../types";

const INITIAL_STATE = {
    collaboration: {},
    joinedPeople: []
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COLLABORATION:
            return { ...state, collaboration: { ...action.payload } };
        case FETCH_JOINED_PEOPLE:
            return { ...state, joinedPeople:  [...action.payload]  };
        default:
            return state;
    }
}