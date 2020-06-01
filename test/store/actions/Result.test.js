import {cleanResult, putResult} from "../../../src/store/actions/result";
import {RESULT} from "../../../src/store/actionTypes";

describe('Result actions creator', () => {
    it('should correctly create create put result action', () => {
        const result = {
            points: 10,
            maxPoints: 42,
            text: 'Good result'
        };

        expect(putResult(result)).toEqual({
            type: RESULT.PUT_RESULT,
            payload: {
                points: 10,
                maxPoints: 42,
                text: 'Good result'
            }
        });
    });

    it('should correctly create clean action', () => {
        expect(cleanResult()).toEqual({
            type: RESULT.CLEAN_RESULT
        })
    });
});