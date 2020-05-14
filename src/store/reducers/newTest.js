import initialState from '../initialState';
import {NEW_TEST} from "../actionTypes";
import {checkQuestion, getNextId} from "../../components/supporting/Functions";

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
            const id = getNextId(state.questions);
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
                    const newQuestion = {
                        ...q,
                        ...changedQuestion
                    };

                    return {
                        ...newQuestion,
                        isRight: checkQuestion(newQuestion)
                    }
                }

                return q;
            });

            return {
                ...state,
                questions: newQuestions
            };
        case (NEW_TEST.REMOVE_QUESTION):
            const idToRemove = action.payload;
            let newQuestionsAfterRemove = [...state.questions];
            newQuestionsAfterRemove = newQuestionsAfterRemove.filter(q => q.id !== idToRemove);

            return {
                ...state,
                questions: newQuestionsAfterRemove
            };
        case (NEW_TEST.ADD_RESULT):
            const newResult = {
                ...initialState.newTest.resultDescriptions,
                id: getNextId(state.resultDescriptions)
            };
            return {
                ...state,
                resultDescriptions: state.resultDescriptions.concat(newResult)
            };
        case (NEW_TEST.CHANGE_RESULT):
            const changedResult = action.payload;
            const changedResults = state.resultDescriptions.map(res => {
                if (res.id === changedResult.id) {
                    return changedResult;
                }

                return res;
            });

            return {
                ...state,
                resultDescriptions: changedResults
            };
        case (NEW_TEST.REMOVE_RESULT):
            const resultId = action.payload;
            return {
                ...state,
                resultDescriptions: state.resultDescriptions.filter(res => res.id !== resultId)
            };
        case (NEW_TEST.CLEAN_STATE):
            return initialState.newTest;
        default:
            return state;
    }
}