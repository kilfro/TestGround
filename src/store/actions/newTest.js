import {NEW_TEST} from '../actionTypes';

export const changeDescription = (description) => {
    return {
        type: NEW_TEST.CHANGE_DESCRIPTION,
        payload: {...description}
    };
};

export const createUid = (uid) => {
    return {
        type: NEW_TEST.CREATE_UID,
        payload: uid
    };
};

export const addQuestion = () => {
    return {
        type: NEW_TEST.ADD_QUESTION
    };
};

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

export const cleanNewTestState = () => {
    return {
        type: NEW_TEST.CLEAN_STATE
    };
};

export const addResult = () => {
    return {
        type: NEW_TEST.ADD_RESULT
    }
};

export const changeResult = (result) => {
    return {
        type: NEW_TEST.CHANGE_RESULT,
        payload: result
    }
};

export const removeResult = (id) => {
    return {
        type: NEW_TEST.REMOVE_RESULT,
        payload: id
    }
};