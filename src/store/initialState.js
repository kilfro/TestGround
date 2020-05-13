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
                multiple: false,
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
        ],
        resultDescriptions: [
            {
                id: 1,
                min: 0,
                max: 0,
                text: ''
            }
        ]
    }
};