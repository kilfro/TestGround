import {changeAnswer, cleanAnswers, formAnswers, sendAnswers} from "../../../src/store/actions/answers";
import {ANSWERS} from "../../../src/store/actionTypes";

describe('Answers action creator', () => {
    it('should correctly create answer form action', () => {
        const questions = [
            {id: 1}, {id: 10}, {id: 100}, {id: 1000}
        ];

        expect(formAnswers(questions)).toEqual({
            type: ANSWERS.FORM,
            payload: [
                {questionId: 1, answers: []},
                {questionId: 10, answers: []},
                {questionId: 100, answers: []},
                {questionId: 1000, answers: []}
            ]
        })
    });

    it('should correctly create change answer action', () => {
        const answers = [{id: 1}, {id: 10}, {id: 100}];

        expect(changeAnswer(1, answers)).toEqual({
            type: ANSWERS.CHANGE_ANSWER,
            payload: {
                questionId: 1,
                answers: [{id: 1}, {id: 10}, {id: 100}]
            }
        });
    });

    it('should correctly create clean answers action', () => {
        expect(cleanAnswers()).toEqual({
            type: ANSWERS.CLEAN_STATE
        })
    });

    it('should correctly create send answers action', () => {
        const userUid = 'USER';
        const testUid = 'UID';
        const answers = [{id: 1}, {id: 10}, {id: 100}];

        expect(sendAnswers(userUid, testUid, answers)).toEqual({
            type: ANSWERS.SEND_ANSWERS,
            payload: {
                testUid: 'UID',
                answers: [{id: 1}, {id: 10}, {id: 100}],
                userUid: 'USER'
            }
        })
    });
});