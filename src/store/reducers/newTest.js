import newTest from '../initialState';
import {NEW_TEST} from "../actionTypes";

export function newTestReducer(state = newTest, action) {
    switch (action.type) {
        case (NEW_TEST.CHANGE_DESCRIPTION):
            return {
                ...state,
                description: {...action.payload}
            };
        case (NEW_TEST.CREATE_UID):
            return {
                ...state,
                uid: action.payload
            };
        case (NEW_TEST.ADD_QUESTION):
            let currentQuestions = state.questions;
            currentQuestions.concat(action.payload);

            return {
                ...state,
                questions: currentQuestions
            };
        case (NEW_TEST.CLEAN_STATE):
            return newTest;
        default:
            return state;
    }
}