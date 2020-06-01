import {resultReducer} from "../../../src/store/reducers/result";
import {RESULT} from "../../../src/store/actionTypes";

describe('Result reducer', () => {
    const state = {
        points: 10,
        maxPoints: 100,
        text: 'Result text'
    };

    it('should return default state', () => {
        expect(resultReducer(undefined, {})).toEqual({});
    });

    it('should clean state', () => {
        const action = {type: RESULT.CLEAN_RESULT};

        expect(resultReducer(state, action)).toEqual({});
    });

    it('should return new state', () => {
        const action = {
            type: RESULT.PUT_RESULT,
            payload: state
        };

        expect(resultReducer({}, action)).toEqual(state);
    });
});