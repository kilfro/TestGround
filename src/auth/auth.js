import {FirebaseApp} from './core';
import * as firebase from 'firebase/app';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export function loginWithGoogle() {
    return FirebaseApp.auth().signInWithPopup(googleProvider);
}

export function logUserOut() {
    return FirebaseApp.auth().signOut();
}

export function loginWithEmail(email, password) {
    return FirebaseApp.auth().signInWithEmailAndPassword(email, password);
}

export function getFirebaseToken() {
    const currentUser = FirebaseApp.auth().currentUser;
    if (!currentUser) {
        return Promise.resolve(null);
    }
    return currentUser.getIdToken(true);
}

export function getFirebaseUser() {
    return new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user)));
}