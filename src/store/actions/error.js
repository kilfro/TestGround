import {ERROR} from '../actionTypes';

export const createError = (error) => {
    return {
        type: ERROR.CREATE,
        payload: error
    }
};

export const deleteError = () => {
    return {
        type: ERROR.DELETE
    }
};