import {getNextId, getRadioGroupValue} from "../../../src/components/supporting/Functions";

describe('getNextId', () => {
    it('should return ID if array is empty', () => {
        expect(getNextId([])).toEqual(1);
    });

    it('should return new Id correctly', () => {
        const array = [{id: 1}, {id: 3}];
        expect(getNextId(array)).toEqual(4);
    });
});

describe('getRadioGroupValue', () => {
    it('should return default value if options is empty', () => {
        expect(getRadioGroupValue([])).toEqual(-1);
    });

    it('should return default value if options has not got right option', () => {
        expect(getRadioGroupValue([
            {id: 1, isRight: false},
            {id: 2, isRight: false}
        ])).toEqual(-1);
    });

    it('should return correct value', () => {
        expect(getRadioGroupValue([
            {id: 1, isRight: false},
            {id: 2, isRight: true},
            {id: 3, isRight: false}
        ])).toEqual(2);
    });
});