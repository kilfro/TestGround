import initialState from '../initialState';
import {NEW_TEST} from "../actionTypes";

export function newTestReducer(state = initialState.newTest, action) {
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
            const id = state.questions.length + 1;
            const newQuestion = {
                ...initialState.newTest.questions[0],
                id
            };

            return {
                ...state,
                questions: state.questions.concat(newQuestion)
            };
        case (NEW_TEST.CHANGE_QUESTION):
            const changedQuestion = action.payload;

            const newQuestions = state.questions.map(q => {
                if (q.id === changedQuestion.id) {
                    return {
                        ...q,
                        ...changedQuestion
                    }
                }

                return q;
            });

            return {
                ...state,
                questions: newQuestions
            };
        case (NEW_TEST.REMOVE_QUESTION):
            const indexToRemove = state.questions.indexOf(action.payload);

            if (indexToRemove >= 0) {
                state.questions.splice(indexToRemove, 1);
            }

            return state;
        case (NEW_TEST.CLEAN_STATE):
            return initialState.newTest;
        default:
            return state;
    }
}