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

export function addQuestion(question) {
    return {
        type: NEW_TEST.ADD_QUESTION,
        payload: question
    };
}

export function cleanNewTestState() {
    return {
        type: NEW_TEST.CLEAN_STATE
    };
}