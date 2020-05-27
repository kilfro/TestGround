import {RESULT} from "../actionTypes";

export const putResult = (result) => {
    return {
        type: RESULT.PUT_RESULT,
        payload: result
    }
};

export const cleanResult = () => {
    return {
        type: RESULT.CLEAN_RESULT
    }
};