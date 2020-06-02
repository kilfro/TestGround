import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Button, Toolbar} from "@material-ui/core";
import logo from '../../logo-2.png';
import '../../styles/component/header/header.css';
import {Link} from "react-router-dom";
import {logoutRequest} from "../../store/actions/auth";

export class Header extends React.Component {
    render() {
        const {authenticated, logoutRequest} = this.props;

        return (
            <AppBar position={'static'} className='header'>
                <Toolbar>
                    <Link to={'/'}>
                        <img src={logo} alt={'logo'} className='header-logo'/>
                    </Link>
                    <div className={'menu-container'}>
                        {authenticated && <>
                            <Button href={'/create'} color='inherit' id={'create_header_btn'}>новый тест</Button>
                            <Button href={'/user/results'} color='inherit'>мои результаты</Button>
                        </>}
                    </div>
                    {authenticated ?
                        <Button onClick={() => logoutRequest()} color='inherit'
                                id={'logout_header_btn'}>Выйти</Button> :
                        <Button href={'/login'} color='inherit' id={'login_header_btn'}>Войти</Button>}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = {
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);