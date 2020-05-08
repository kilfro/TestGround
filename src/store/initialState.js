export default {
    error: null,
    user: {
        authenticated: false,
        photoURL: null,
        uid: null,
        displayName: null,
        token: null
    },
    newTest: {
        uid: '',
        description: {
            name: '',
            additional: '',
            password: '',
            anonymous: false,
            onlyRegistered: false,
            needPassword: false
        },
        questions: [
            {
                id: 1,
                type: 'one',
                cost: 1,
                question: '',
                options: [
                    {
                        id: 1,
                        text: '',
                        isRight: false
                    }
                ]
            }
        ]
    }
};