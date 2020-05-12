import {getNextId} from "../../../src/components/supporting/Functions";

describe('getNextId', () => {
    it('should return ID if array is empty', () => {
        expect(getNextId([])).toEqual(1);
    });

    it('should return new Id correctly', () => {
        const array = [{id: 1}, {id: 3}];
        expect(getNextId(array)).toEqual(4);
    });
});
