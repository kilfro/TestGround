import {NEW_TEST} from '../actionTypes';

export function changeDescription(description) {
    return {
        type: NEW_TEST.CHANGE_DESCRIPTION,
        payload: {...description}
    };
}

export function createUid(uid) {
    return {
        type: NEW_TEST.CREATE_UID,
        payload: uid
    };
}

export function addQuestion() {
    return {
        type: NEW_TEST.ADD_QUESTION
    };
}

export const changeQuestion = (question) => {
    return {
        type: NEW_TEST.CHANGE_QUESTION,
        payload: question
    }
};

export const removeQuestion = (id) => {
    return {
        type: NEW_TEST.REMOVE_QUESTION,
        payload: id
    }
};

export function cleanNewTestState() {
    return {
        type: NEW_TEST.CLEAN_STATE
    };
}