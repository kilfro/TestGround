import React from 'react';
import {Button, TextField} from "@material-ui/core";

const Registration = () => {
    return (
        <div>
            <form>
                <TextField id={'name'} label={'Имя'} fullWidth/>
                <TextField id={'email'} label={'E-mail'} type={'email'} fullWidth/>
                <TextField id={'password'} label={'Пароль'} type={'password'} fullWidth/>
                <TextField id={'repeat-password'} label={'Повторите пароль'} type={'password'} fullWidth/>
                <Button type={'confirm'}>Зарегистрироваться</Button>
            </form>
        </div>
    );
};

export default Registration;