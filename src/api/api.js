import axios from "axios/index";

const HOST = 'http://192.168.1.243:4500';

export const getUserByUid = (uid) => {
    return axios
        .get(`${HOST}/api/user/${uid}`)
        .then(res => {
            if (res.data.length > 0) {
                return res.data[0];
            }

            return null;
        });
};

export const createUser = (user) => {
    return axios
        .post(`${HOST}/api/user`, user);
};

export const createTest = (test, userId, uid) => {
    return axios
        .post(`${HOST}/api/test/create`, {
            test: test,
            userId: userId,
            uid: uid
        });
};

export const getTest = (uid) => {
    return axios
        .get(`${HOST}/api/test/get/${uid}`);
};

export const checkTestPassword = (uid, password) => {
    const body = {
        uid,
        password
    };

    return axios.put(`${HOST}/api/test/checkPassword`, body);
};

export const sendAnswers = (userUid, testUid, answers) => {
    const body = {
        userUid,
        testUid,
        answers
    };

    return axios.put(`${HOST}/api/test/result`, body);
};

export const getUserResultsList = (userUid) => {
    return axios.get(`/api/user/results/${userUid}`)
};

export const updateUser = (user) => {
    const body = {
        id: user.id,
        name: user.name
    };

    return axios.put('/api/user/update', body)
};

export const getUserTests = (userUid) => {
    return axios.get(`/api/user/tests/${userUid}`);
};