import {createError, deleteError} from '../../../src/store/actions/error';
import {ERROR} from '../../../src/store/actionTypes';

describe('Error action creator', () => {
    test('create error action works correctly', () => {
        expect(createError('error message'))
            .toEqual({
                type: ERROR.CREATE,
                payload: 'error message'
            });
    });

    test('delete error action works correctly', () => {
        expect(deleteError())
            .toEqual({
                type: ERROR.DELETE
            })
    });
});