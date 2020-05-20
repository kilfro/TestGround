import {answersReducer} from "../../../src/store/reducers/answers";
import {ANSWERS} from "../../../src/store/actionTypes";
import {cleanAnswers} from "../../../src/store/actions/answers";

describe('AnswerReducer', () => {
    it('should return default state', () => {
        expect(answersReducer(undefined, {})).toEqual([]);
    });

    it('should form answers', () => {
        const action = {
            type: ANSWERS.FORM,
            payload: [
                {questionId: 1, answers: []},
                {questionId: 2, answers: []}
            ]
        };
        const newState = answersReducer([], action);

        expect(newState).toEqual([
            {questionId: 1, answers: []},
            {questionId: 2, answers: []}
        ]);
    });

    it('should change answer', () => {
        const state = [
            {questionId: 1, answers: []},
            {questionId: 2, answers: []}
        ];

        const action = {
            type: ANSWERS.CHANGE_ANSWER,
            payload: {
                questionId: 2,
                answers: [{id: 3}]
            }
        };

        expect(answersReducer(state, action)).toEqual([
            {questionId: 1, answers: []},
            {questionId: 2, answers: [{id: 3}]}
        ]);
    });

    it('should clean state', () => {
        expect(answersReducer([{questionId: 1, answers: []}], cleanAnswers())).toEqual([]);
    });
});