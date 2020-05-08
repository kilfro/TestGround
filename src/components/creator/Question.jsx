import React from 'react';
import {connect} from 'react-redux';
import {Card, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import '../../styles/component/creator/question.css';
import {changeQuestion} from "../../store/actions/newTest";

const Question = (props) => {
    const {id, multiple, cost, question} = props.question;
    const {changeQuestion} = props;

    const changeHandler = (event) => {
        const target = event.target.id;
        const value = event.target.value;

        if (target === 'multiple') {
            changeQuestion({
                multiple: event.target.checked,
                id
            });
        } else {
            changeQuestion({
                [target]: value,
                id
            });
        }
    };

    return (
        <Card className='create-question-card'>

            <FormControlLabel
                control={<Checkbox checked={multiple} onChange={changeHandler} id={'multiple'}/>}
                label='Выбор нескольких вариантов ответов'
                className='question-option'
            />

            <TextField id={'cost'} className='question-option' label={'Баллы за верный ответ'} type={'number'}
                       inputProps={{min: 0, step: 1}} onChange={changeHandler} value={cost}/>

            <h3>Вопрос:</h3>
            <TextField multiline rows={3} fullWidth id={'question'} value={question} onChange={changeHandler}/>

        </Card>
    )
};

const mapDispatchToProps = {
    changeQuestion
};

export default connect(null, mapDispatchToProps)(Question);