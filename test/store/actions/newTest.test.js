import React from 'react';
import {
    addQuestion,
    addResult,
    changeDescription,
    changeQuestion,
    changeResult,
    cleanNewTestState,
    createUid,
    insertTest,
    removeQuestion,
    removeResult
} from "../../../src/store/actions/newTest";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('NewTest action creator', () => {
    it('should correctly create change description action', () => {
        expect(changeDescription({
            name: 'Name',
            additional: 'Additional',
            password: 'password',
            anonymous: true,
            onlyRegistered: true,
            needPassword: true
        })).toEqual({
            type: NEW_TEST.CHANGE_DESCRIPTION,
            payload: {
                name: 'Name',
                additional: 'Additional',
                password: 'password',
                anonymous: true,
                onlyRegistered: true,
                needPassword: true
            }
        })
    });

    it('should correctly create UID action', () => {
        expect(createUid('UID-123')).toEqual({
            type: NEW_TEST.CREATE_UID,
            payload: 'UID-123'
        })
    });

    it('should correctly create change question action', () => {
        expect(changeQuestion({id: 100, type: 'one'})).toEqual({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {id: 100, type: 'one'}
        })
    });

    it('should correctly create remove question action', () => {
        expect(removeQuestion({id: 100, type: 'one'})).toEqual({
            type: NEW_TEST.REMOVE_QUESTION,
            payload: {id: 100, type: 'one'}
        })
    });

    it('should correctly create add question action', () => {
        expect(addQuestion()).toEqual({
            type: NEW_TEST.ADD_QUESTION
        })
    });

    it('should correctly create clean newTest state action', () => {
        expect(cleanNewTestState()).toEqual({
            type: NEW_TEST.CLEAN_STATE
        })
    });

    it('should correctly create add new result action', () => {
        expect(addResult()).toEqual({
            type: NEW_TEST.ADD_RESULT
        });
    });

    it('should correctly create change result action', () => {
        const res = {
            id: 1,
            min: 0,
            max: 100,
            text: 'Result'
        };

        expect(changeResult(res)).toEqual({
            type: NEW_TEST.CHANGE_RESULT,
            payload: {
                id: 1,
                min: 0,
                max: 100,
                text: 'Result'
            }
        })
    });

    it('should correctly create remove result action', () => {
        expect(removeResult(100)).toEqual({
            type: NEW_TEST.REMOVE_RESULT,
            payload: 100
        })
    });

    it('should correctly create insert test action', () => {
        expect(insertTest({test: 'Test'})).toEqual({
            type: NEW_TEST.INSERT_TEST_TO_DB,
            payload: {
                test: 'Test'
            }
        })
    });
});