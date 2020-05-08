import initialTest from '../initialState';
import {NEW_TEST} from "../actionTypes";

export function newTestReducer(state = initialTest.newTest, action) {
    switch (action.type) {
        case (NEW_TEST.CHANGE_DESCRIPTION):
            return {
                ...state,
                description: {
                    ...state.description,
                    ...action.payload
                }
            };
        case (NEW_TEST.CREATE_UID):
            return {
                ...state,
                uid: action.payload
            };
        case (NEW_TEST.ADD_QUESTION):
            let currentQuestions = state.questions;
            const newQuestions = currentQuestions.concat(action.payload);

            return {
                ...state,
                questions: newQuestions
            };
        case (NEW_TEST.CLEAN_STATE):
            return initialTest.newTest;
        default:
            return state;
    }
}