import {ANSWERS} from '../actions/'

export const answersReducer = (state = [], action) => {
    switch (action.type) {
        case ANSWERS.FORM:
            return action.payload;
        case ANSWERS.CHANGE_ANSWER:
            const toChange = action.payload;
            return state.map(a => {
                if (a.questionId === toChange.questionId) {
                    return {
                        ...a,
                        answers: toChange.answers
                    };
                } else {
                    return a;
                }
            });
        case ANSWERS.CLEAN_STATE:
            return [];
        default:
            return state;
    }
};