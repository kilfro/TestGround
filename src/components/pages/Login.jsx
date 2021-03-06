import React from 'react';
import {loginWithEmail, loginWithGoogle} from '../../store/actions/auth';
import {connect} from 'react-redux';
import {Button, Container, TextField} from '@material-ui/core';
import '../../styles/component/pages/login.css';
import {Redirect} from "react-router-dom";
import logo from '../../logo.png';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeHandler = (event) => {
        const {id, value} = event.target;
        this.setState({[id]: value});
    };

    submitEmailLogin = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.loginWithEmail(email, password);
    };

    render() {
        const {authenticated, loginWithGoogle} = this.props;
        const {email, password} = this.state;

        return (
            <Container className={'login-form-container'} maxWidth={'xs'}>
                {authenticated && <Redirect to={'/'}/>}
                <img src={logo} alt={'logo'}/>
                <h3>Войдите в Ваш TestGround</h3>
                <form onSubmit={this.submitEmailLogin}>
                    <TextField id={'email'}
                               label={'E-mail'}
                               type={'email'}
                               fullWidth
                               value={email}
                               onChange={this.onChangeHandler}
                    />
                    <TextField id={'password'}
                               label={'Пароль'}
                               type={'password'}
                               fullWidth
                               value={password}
                               onChange={this.onChangeHandler}
                    />
                    <Button id={'login-btn'} type={'submit'} color={'primary'} variant={'contained'}
                            fullWidth className={'ground_btn'}>Войти</Button>
                    <Button href={'/registration'} fullWidth>Зарегистрироваться</Button>
                </form>
                <h4>или</h4>
                <Button id={'google-btn'} size={'large'} variant="outlined" onClick={() => loginWithGoogle()}>
                    <img className={'google_logo'}
                         src={'https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg'}
                         alt={'google logo'}/>
                    Войти с Google
                </Button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    };
};

const mapDispatchToProps = {
    loginWithEmail,
    loginWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);