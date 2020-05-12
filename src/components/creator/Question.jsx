import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import '../../styles/component/creator/question.css';
import {changeQuestion, removeQuestion} from "../../store/actions/newTest";
import QuestionOptions from "./QuestionOptions";
import {getNextId} from "../supporting/Functions";

const Question = (props) => {
    const {id, multiple, cost, question, options} = props.question;
    const {changeQuestion, removeQuestion, index} = props;

    const changeHandler = (event) => {
        const target = event.target.id;
        const value = event.target.value;

        if (target === 'multiple') {
            changeQuestion({
                multiple: event.target.checked,
                id,
                options: resetIsRight()
            });
        } else {
            changeQuestion({
                [target]: value,
                id
            });
        }
    };

    const resetIsRight = () => {
        return options.map(op => {
            op.isRight = false;
            return op;
        });
    };

    const addOption = () => {
        const newId = getNextId(options);

        changeQuestion({
            id: id,
            options: options.concat({id: newId, text: '', isRight: false})
        });
    };

    const deleteQuestion = () => {
        removeQuestion(id);
    };

    const selfCheck = () => {
        if (question === '') {
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

    return (
        <Card className={`create-question-card ${index % 2 !== 0 ? 'gray-card' : ''}
                          self-check-${selfCheck() ? 'green' : 'red'}`}>

            <div className='type-cost-container'>
                <FormControlLabel
                    control={<Checkbox checked={multiple} onChange={changeHandler} id={'multiple'} color='primary'/>}
                    label='Выбор нескольких вариантов ответов'
                    className='question-option'
                />

                <TextField id={'cost'} className='question-option' label={'Баллы за верный ответ'} type={'number'}
                           inputProps={{min: 0, step: 1}} onChange={changeHandler} value={cost}/>
            </div>

            <h3>Вопрос:</h3>
            <TextField multiline rows={3} fullWidth id={'question'} value={question} onChange={changeHandler}/>

            <h3>Ответы:</h3>
            <span className='small-comment'>Отметьте верные варианты</span>

            <QuestionOptions options={options} multiple={multiple} questionId={id}/>

            <div className='button-group'>
                <Button onClick={addOption} variant='outlined' color='primary'>Добавить вариант</Button>
                <Button variant="contained" color="secondary" startIcon={<DeleteForeverIcon/>}
                        onClick={deleteQuestion} className='delete-question-btn'>
                    Удалить вопрос
                </Button>
            </div>
        </Card>
    )
};

const mapDispatchToProps = {
    changeQuestion,
    removeQuestion
};

export default connect(null, mapDispatchToProps)(Question);