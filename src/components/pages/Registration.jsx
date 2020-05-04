import React from 'react';
import {connect} from 'react-redux';
import {Button, Container, TextField} from "@material-ui/core";
import '../../styles/component/pages/registration.css';
import {createError} from "../../store/actions/error";
import {Redirect} from "react-router";
import logo from '../../logo.png';
import {registerUser} from "../../store/actions/auth";

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: ''
        };
    }

    onChangeHandler = (event) => {
        const {id, value} = event.target;
        this.setState({[id]: value});
    };

    submitHandler = (event) => {
        event.preventDefault();
        const {createError, registerUser} = this.props;
        const {email, password, repeatPassword} = this.state;
        if (password === repeatPassword) {
            registerUser(email, password);
        } else {
            createError('Пароли не совпадают')
        }
    };

    render() {
        const {authenticated} = this.props;
        const {email, password, repeatPassword} = this.state;

        return (
            <Container maxWidth={'xs'} className={'registration-form-container'}>
                {authenticated && <Redirect to={'/'}/>}

                <img src={logo} alt={'logo'}/>
                <h3>Заполните форму для регистрации:</h3>
                <form onSubmit={this.submitHandler} className={'registration-form'}>
                    <TextField id={'email'} label={'E-mail'} type={'email'} fullWidth required value={email}
                               onChange={this.onChangeHandler}/>
                    <TextField id={'password'} label={'Пароль'} type={'password'} fullWidth required value={password}
                               onChange={this.onChangeHandler}/>
                    <TextField id={'repeatPassword'} label={'Повторите пароль'} type={'password'} fullWidth required
                               value={repeatPassword} onChange={this.onChangeHandler}/>
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
    registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);