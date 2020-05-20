import {ANSWERS} from "../actionTypes";

export const formAnswers = (questions) => {
    const answersFrom = questions.map(q => {
        return {
            questionId: q.id,
            answers: []
        }
    });

    return {
        type: ANSWERS.FORM,
        payload: answersFrom
    }
};

export const changeAnswer = (questionId, answers) => {
    return {
        type: ANSWERS.CHANGE_ANSWER,
        payload: {
            questionId,
            answers
        }
    }
};

export const cleanAnswers = () => {
    return {
        type: ANSWERS.CLEAN_STATE
    }
};