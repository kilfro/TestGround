import React from 'react';
import {FormControlLabel, InputAdornment, Switch, TextField} from "@material-ui/core";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import * as generator from "generate-password/src/generate";
import '../../styles/component/creator/testcreator.css';

const TestDescription = (props) => {
    const {name, description, anonymous, onlyRegistered, needPassword, password, changeFieldHandler} = props;

    const generatePassword = () => {
        const generated = generator.generate({
            length: 15,
            numbers: true
        });

        changeFieldHandler({
            target: {
                id: 'password',
                value: generated
            }
        });
    };

    return (
        <>
            <h3>Название теста:</h3>
            <TextField fullWidth id={'name'} required autoFocus autoComplete='off' value={name}
                       onChange={changeFieldHandler}/>
            <h3>Описание теста:</h3>
            <TextField multiline rows={3} fullWidth id={'description'} value={description}
                       onChange={changeFieldHandler}/>
            <FormControlLabel
                control={<Switch id='anonymous' value={anonymous} onChange={changeFieldHandler}/>}
                label={<div>
                    <h3>Анонимный тест</h3>
                    <span>Информация о пользователе не будет сохранена в результатах теста</span>
                </div>}
            />
            <FormControlLabel
                control={<Switch id='onlyRegistered' value={onlyRegistered}
                                 onChange={changeFieldHandler}/>}
                label={<div>
                    <h3>Доступен для незарегистрированных пользователей</h3>
                    <span>Тест будет доступен по ссылке для незарегистрированных пользователей</span>
                </div>}
            />

            <FormControlLabel
                control={<Switch id='needPassword' value={needPassword}
                                 onChange={changeFieldHandler}/>}
                label={<div>
                    <h3>Использовать пароль</h3>
                    <span>Для запуска теста необходимо будет ввести пароль</span>
                </div>}
            />

            {needPassword && <>
                <h3>Пароль:</h3>
                <TextField id={'password'} required autoComplete='off' value={password}
                           onChange={changeFieldHandler} fullWidth
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <BorderColorIcon className='generate-icon' onClick={generatePassword}/>
                                   </InputAdornment>
                               )
                           }}
                />
            </>}
        </>
    );
};

export default TestDescription;