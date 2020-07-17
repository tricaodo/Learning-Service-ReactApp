import {
    FETCH_COLLABORATION,
    FETCH_JOINED_PEOPLE,
    SUBCRIBE_TO_PROFILE,
    SUBCRIBE_TO_MESSAGES,
    LEAVE_COLLABORATION,
} from "../types";


const INITIAL_STATE = {
    collaboration: {},
    joinedPeople: [],
    messages: []
}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COLLABORATION:
            return { ...state, collaboration: { ...action.payload } };
        case FETCH_JOINED_PEOPLE:
            return { ...state, joinedPeople: [...action.payload] };
        case SUBCRIBE_TO_PROFILE:
            const newJoinedPeople = [...state.joinedPeople];
            const { profile } = action.payload;
            const idx = newJoinedPeople.findIndex(person => person.id === profile.id);
            if (idx < 0) return state;
            if (newJoinedPeople[idx].state === profile.state) return state;
            newJoinedPeople[idx].state = profile.state
            return { ...state, joinedPeople: newJoinedPeople };
        case SUBCRIBE_TO_MESSAGES:
            const newMessages = [...state.messages];
            action.payload.forEach(change => {
                if (change.type === "added") {
                    // console.log(change)
                    newMessages.push({ id: change.doc.id, ...change.doc.data() });
                }
            })
            return { ...state, messages: newMessages };

        case LEAVE_COLLABORATION:
            return INITIAL_STATE;
        default:
            return state;
    }
}