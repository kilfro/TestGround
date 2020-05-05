import {errorReducer} from '../../../src/store/reducers/error';
import initialState from '../../../src/store/initialState';
import {ERROR} from '../../../src/store/actionTypes';

const createErrorAction = {
    type: ERROR.CREATE,
    payload: 'Some error'
};

const deleteErrorAction = {
    type: ERROR.DELETE
};

describe('Error reducer', () => {
    it('should return initial state', () => {
        expect(errorReducer(undefined, {})).toEqual(initialState.error);
    });

    it('should return created error', () => {
        const returnedState = errorReducer({}, createErrorAction);
        expect(returnedState).toEqual('Some error');
    });

    it('should delete error', () => {
        const returnedState = errorReducer({error: 'Some error'}, deleteErrorAction);
        expect(returnedState).toEqual(initialState.error);
    });
});