import React from 'react';
import {Card, Checkbox, MenuItem, Radio, RadioGroup, TextField} from "@material-ui/core";
import '../../styles/component/creator/question.css';

const Question = (props) => {
    const {type, cost, question, options} = props;

    const checkNumber = (event) => {
        const value = event.target.value;

        if (value < 0) {
            return 0;
        }
    };

    return (
        <Card className='create-question-card'>
            <TextField id={'type'} className='question-option' label='Типо вопроса' select>
                <MenuItem value={'one'}>выбор одного</MenuItem>
                <MenuItem value={'several'}>выбор нескольких</MenuItem>
            </TextField>
            <TextField id={'cost'} className='question-option' label={'Баллы за верный ответ'} type={'number'}
                       inputProps={{min: 0, step: 1}} onChange={checkNumber}/>
            <h3>Вопрос:</h3>
            <TextField multiline rows={3} fullWidth id={'question'}/>
            <h3>Ответы:</h3>
            <span>Отметьте верные варианты</span>
            {
                type !== 'one' ?
                    <RadioGroup aria-label="gender" name="gender1">
                        <Radio color="primary"/>
                    </RadioGroup>
                    :
                    <Checkbox
                        color="primary"
                        inputProps={{'aria-label': 'secondary checkbox'}}
                    />
            }
        </Card>
    )
};

export default Question;