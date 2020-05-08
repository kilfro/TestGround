import React from 'react';
import {
    addQuestion,
    changeDescription,
    changeQuestion,
    cleanNewTestState,
    createUid,
    removeQuestion
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
});