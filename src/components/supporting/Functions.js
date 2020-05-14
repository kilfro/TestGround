/**
 * Создает новый уникальный для данного массива 'id'
 *
 * @param array         массив, элементы коготоро имеют поле 'id'
 * @returns {number}    новый ID
 */
export const getNextId = (array) => {
    if (array.length === 0)
        return 1;

    const maxId = Math.max.apply(Math, array.map(item => item.id));
    return maxId + 1;
};

export const getRadioGroupValue = (options) => {
    let checkedId = -1;

    options.map(op => {
        if (op.isRight) {
            checkedId = op.id;
        }
    });

    return checkedId;
};

export const checkQuestion = (toCheck) => {
    const {question, options} = toCheck;

    if (!question || question === '') {
        return false;
    }

    const emptyOptions = options.filter(op => op.text === '');
    if (emptyOptions.length !== 0) {
        return false;
    }

    const correctAnswers = options.filter(op => op.isRight === true);
    if (correctAnswers.length === 0) {
        return false;
    }

    return true;
};