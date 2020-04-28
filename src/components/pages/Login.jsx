import React from 'react';
import {loginRequest, logoutRequest} from '../../store/actions/auth';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

class Login extends React.Component {
    render() {
        const {displayName, uid, error, authenticated, loginRequest, logoutRequest} = this.props;
        return (
            <div>
                <p>{error}</p>
                <p>{displayName}</p>
                <p>{uid}</p>

                {authenticated ?
                    <Button variant="outlined" onClick={() => logoutRequest()}>Logout</Button>
                    : <Button variant="outlined" onClick={() => loginRequest()}>Login</Button>
                }
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
    loginRequest,
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);