import {checkQuestion, getNextId, getRadioGroupValue} from "../../../src/components/supporting/Functions";

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

describe('checkQuestion', () => {
    it('should return \'false\' if question is empty', () => {
        const question = {
            question: '',
            needPassword: false,
            options: [
                {isRight: true, text: 'Option'}
            ]
        };

        expect(checkQuestion(question)).toEqual(false);
    });

    it('should return \'false\' if question doesn\'t have right option', () => {
        const question = {
            question: 'Question',
            needPassword: false,
            options: [
                {isRight: false, text: 'Option1'},
                {isRight: false, text: 'Option2'}
            ]
        };

        expect(checkQuestion(question)).toEqual(false);
    });

    it('should return \'false\' if at least one question doesn\'t text', () => {
        const question = {
            question: 'Question',
            needPassword: false,
            options: [
                {isRight: true, text: ''},
                {isRight: false, text: 'Option2'}
            ]
        };

        expect(checkQuestion(question)).toEqual(false);
    });

    it('should return \'false\' if question needs password, but there is not it', () => {
        const question = {
            question: 'Question',
            needPassword: true,
            options: [
                {isRight: true, text: ''},
                {isRight: false, text: 'Option2'}
            ]
        };

        expect(checkQuestion(question)).toEqual(false);
    });

    it('should return \'true\' if all is well', () => {
        const question = {
            question: 'Question',
            needPassword: true,
            password: 'password',
            options: [
                {isRight: true, text: 'Option1'},
                {isRight: false, text: 'Option2'}
            ]
        };

        expect(checkQuestion(question)).toEqual(true);
    });
});