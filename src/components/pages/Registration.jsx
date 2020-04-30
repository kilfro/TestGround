import React from 'react';
import {connect} from 'react-redux';
import {Button, Container, TextField} from "@material-ui/core";
import '../../styles/component/pages/registration.css';
import {registerWithEmail} from "../../auth/auth";
import {createError} from "../../store/actions/error";
import {Redirect} from "react-router";
import logo from '../../logo.png';
import {loginSuccess} from "../../store/actions/auth";
import {createUser} from "../../api/api";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successRegistration: false
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const {createError, loginSuccess} = this.props;
        const email = document.getElementById('email').value,
            password = document.getElementById('password').value,
            repeatPassword = document.getElementById('repeat-password').value;
        if (password === repeatPassword) {
            registerWithEmail(email, password)
                .then(res => {
                    loginSuccess({uid: res.uid});
                    createUser({
                        uid: res.uid,
                        email
                    });
                })
                .catch(e => createError(e));
            this.setState({successRegistration: true});
        } else {
            createError('Пароли не совпадают')
        }
    };

    render() {
        const {authenticated} = this.props;
        const {successRegistration} = this.state;

        return (
            <Container maxWidth={'xs'} className={'registration-form-container'}>
                {(authenticated || successRegistration) && <Redirect to={'/'}/>}

                <img src={logo} alt={'logo'}/>
                <h3>Заполните форму для регистрации:</h3>
                <form onSubmit={this.submitHandler} className={'registration-form'}>
                    <TextField id={'email'} label={'E-mail'} type={'email'} fullWidth required/>
                    <TextField id={'password'} label={'Пароль'} type={'password'} fullWidth required/>
                    <TextField id={'repeat-password'} label={'Повторите пароль'} type={'password'} fullWidth required/>
                    <Button type={'submit'} color={'primary'} variant={'contained'}
                            fullWidth className={'ground_btn'}>Зарегистрироваться</Button>
                </form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = {
    createError,
    loginSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);