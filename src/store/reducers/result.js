import {RESULT} from "../actionTypes";

export const resultReducer = (state = {}, action) => {
    switch (action.type) {
        case RESULT.PUT_RESULT:
            return action.payload;
        case RESULT.CLEAN_RESULT:
            return {};
        default:
            return state;
    }
};