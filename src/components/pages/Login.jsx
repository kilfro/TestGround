import React from 'react';
import {loginRequest, logoutRequest} from '../../store/actions/auth';
import {connect} from 'react-redux';

class Login extends React.Component {
    render() {
        const {displayName, uid, error, loginRequest, logoutRequest} = this.props;
        return (
            <div>
                <p>{error}</p>
                <p>{displayName}</p>
                <p>{uid}</p>
                <button onClick={() => loginRequest()}>Login</button>
                <button onClick={() => logoutRequest()}>Logout</button>
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