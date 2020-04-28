import React from 'react';
import {loginWithEmail, loginWithGoogle, logoutRequest} from '../../store/actions/auth';
import {connect} from 'react-redux';
import {Button, TextField} from '@material-ui/core';

class Login extends React.Component {
    submitEmailLogin = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.props.loginWithEmail(email, password);
    };

    render() {
        const {loginWithGoogle, logoutRequest} = this.props;
        return (
            <div>
                {/*<form onSubmit={this.submitEmailLogin}>*/}
                <TextField id={'email'} label={'E-mail'} type={'email'}/>
                <TextField id={'password'} label={'Пароль'} type={'password'}/>
                <Button onClick={this.submitEmailLogin}>Войти</Button>
                {/*</form>*/}

                <Button variant="outlined" onClick={() => loginWithGoogle()}>Войти с Google</Button>
                <Button variant="outlined" onClick={() => logoutRequest()}>Logout</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth,
        error: state.error
    };
};

const mapDispatchToProps = {
    loginWithEmail,
    loginWithGoogle,
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);