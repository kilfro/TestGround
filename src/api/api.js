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