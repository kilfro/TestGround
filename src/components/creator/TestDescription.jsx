import React from 'react';
import {Button, FormControlLabel, InputAdornment, Switch, TextField} from "@material-ui/core";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import * as generator from "generate-password/src/generate";
import '../../styles/component/creator/testcreator.css';
import {changeDescription} from "../../store/actions/newTest";
import {connect} from 'react-redux';

const TestDescription = (props) => {
    const {name, additional, anonymous, onlyRegistered, needPassword, password, attempts} = props.description;
    const {changeDescription, nextTab} = props;

    const generatePassword = () => {
        const generated = generator.generate({
            length: 15,
            numbers: true
        });

        onChangeHandler({
            target: {
                id: 'password',
                value: generated
            }
        });
    };

    const onChangeHandler = (event) => {
        const target = event.target.id;
        const value = ['anonymous', 'onlyRegistered', 'needPassword'].includes(event.target.id) ?
            event.target.checked :
            event.target.value;

        const newDescription = {
            [target]: value
        };

        changeDescription(newDescription);
    };

    const selfCheck = () => {
        if (!name || name.trim() === '') {
            return false;
        }

        if (needPassword && (!password || password.trim() === '')) {
            return false;
        }

        return true;
    };

    return (
        <>
            <h3>Название теста:</h3>
            <TextField fullWidth id={'name'} required autoFocus autoComplete='off' value={name}
                       onChange={onChangeHandler}/>
            <h3>Описание теста:</h3>
            <TextField multiline rows={3} fullWidth id={'additional'} value={additional}
                       onChange={onChangeHandler}/>

            <div className='prop-container'>
                <div>
                    <h3>Доступное количество попыток: </h3>
                    <span>(0 - без ограничений)</span>
                </div>
                <TextField id={'attempts'} className='question-option' type={'number'}
                           inputProps={{min: 0, step: 1}} onChange={onChangeHandler} value={attempts}/>
            </div>

            <FormControlLabel
                control={<Switch id='onlyRegistered' value={onlyRegistered}
                                 onChange={onChangeHandler}/>}
                label={<div>
                    <h3>Доступен для незарегистрированных пользователей</h3>
                    <span>Тест будет доступен по ссылке для незарегистрированных пользователей</span>
                </div>}
            />

            <FormControlLabel
                control={<Switch id='needPassword' value={needPassword}
                                 onChange={onChangeHandler}/>}
                label={<div>
                    <h3>Использовать пароль</h3>
                    <span>Для запуска теста необходимо будет ввести пароль</span>
                </div>}
            />

            {needPassword && <>
                <h3>Пароль:</h3>
                <TextField id={'password'} required autoComplete='off' value={password}
                           onChange={onChangeHandler} fullWidth
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <BorderColorIcon className='generate-icon' onClick={generatePassword}/>
                                   </InputAdornment>
                               )
                           }}
                />
            </>}

            <div className='navigate-btn'>
                <Button onClick={nextTab} color={'primary'} variant={'contained'} disabled={!selfCheck()}
                        id={'next-tab'}>Далее</Button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        description: {...state.newTest.description}
    }
};

const mapDispatchToProps = {
    changeDescription
};

export default connect(mapStateToProps, mapDispatchToProps)(TestDescription);