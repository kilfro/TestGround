import React from 'react';
import {connect} from 'react-redux';
import {Button} from "@material-ui/core/es/index";
import {logoutRequest} from "../../store/actions/auth";

const HomePage = (props) => {
    const {authenticated, logoutRequest} = props;
    return (
        <div>
            {authenticated ?
                <Button variant="outlined" onClick={() => logoutRequest()}>Выйти</Button> :
                <Button href={'/login'}>Войти</Button>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = {
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);