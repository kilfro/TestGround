import initialState from '../initialState';
import {ERROR} from "../actionTypes";

export const errorReducer = (state = initialState.error, action) => {
    switch (action.type) {
        case ERROR.CREATE:
            return action.payload;
        case ERROR.DELETE:
            return initialState.error;
        default:
            return state;
    }
};