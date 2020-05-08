import React from 'react';
import {newTestReducer} from '../../../src/store/reducers/newTest';
import initialState from '../../../src/store/initialState';
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('NewTest reducer', () => {
    it('should return initial state', () => {
        expect(newTestReducer(undefined, {})).toEqual(initialState.newTest);
    });

    it('should change test description in state', () => {
        const action = {
            type: NEW_TEST.CHANGE_DESCRIPTION,
            payload: {
                name: 'Name',
                additional: 'Additional',
                password: 'password',
                anonymous: true,
                onlyRegistered: true,
                needPassword: true
            }
        };

        expect(newTestReducer(undefined, action)).toEqual({
            ...initialState.newTest,
            description: {
                name: 'Name',
                additional: 'Additional',
                password: 'password',
                anonymous: true,
                onlyRegistered: true,
                needPassword: true
            }
        });
    });

    it('should change UID after created', () => {
        const action = {
            type: NEW_TEST.CREATE_UID,
            payload: 'UID-123'
        };

        expect(newTestReducer(undefined, action)).toEqual({...initialState.newTest, uid: 'UID-123'})
    });

    it('should add question into the state', () => {
        const action = {
            type: NEW_TEST.ADD_QUESTION,
            payload: {
                id: 2,
                type: 'one',
                cost: 1,
                question: 'New question',
                options: [{id: 1, text: 'First option', isRight: true}]
            }
        };

        const questions = newTestReducer(undefined, action).questions;

        expect(questions.length).toEqual(2);
        expect(questions).toEqual([
            {
                id: 1,
                type: 'one',
                cost: 1,
                question: '',
                options: [{id: 1, text: '', isRight: false}]
            },
            {
                id: 2,
                type: 'one',
                cost: 1,
                question: 'New question',
                options: [{id: 1, text: 'First option', isRight: true}]
            }
        ])
    });

    it('should clean newTest state correctly', () => {
        const state = {
            uid: 'UID',
            description: {
                name: 'Should be removed',
                additional: 'This test should be removed from state',
                password: '',
                anonymous: false,
                onlyRegistered: false,
                needPassword: false
            },
            questions: [{id: 1, type: 'one', cost: 1, question: '', options: [{id: 1, text: '', isRight: false}]}]
        };

        expect(newTestReducer(state, {type: NEW_TEST.CLEAN_STATE})).toEqual(initialState.newTest);
    });
});