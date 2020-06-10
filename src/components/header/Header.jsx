import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Avatar, Button, Menu, MenuItem, Toolbar} from "@material-ui/core";
import logo from '../../logo-2.png';
import '../../styles/component/header/header.css';
import {Link} from "react-router-dom";
import {logoutRequest} from "../../store/actions/auth";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileMenuAnchor: null
        };
    }

    closeUserMenu = () => {
        this.setState({profileMenuAnchor: null})
    };

    render() {
        const {authenticated, name, photo, logoutRequest} = this.props;

        return (
            <AppBar position={'static'} className='header'>
                <Toolbar>
                    <Link to={'/'}>
                        <img src={logo} alt={'logo'} className='header-logo'/>
                    </Link>
                    <div className='menu-container'>
                        {authenticated && <>
                            <Button href={'/create'} color='inherit' id={'create_header_btn'}>новый тест</Button>
                            <Button href={`/user/results`} color='inherit'>мои результаты</Button>
                        </>}
                    </div>
                    {authenticated ?
                        <>
                            <Avatar alt={name} src={photo}
                                    onClick={(event) => this.setState({profileMenuAnchor: event.target})}/>
                            <Menu
                                keepMounted
                                anchorEl={this.state.profileMenuAnchor}
                                open={Boolean(this.state.profileMenuAnchor)}
                                onClose={this.closeUserMenu}
                            >
                                <Link to={'/user'} className='menu-item-link'>
                                    <MenuItem onClick={this.closeUserMenu}>
                                        Мой профиль
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={() => {
                                    logoutRequest();
                                    this.closeUserMenu();
                                }}>Выйти</MenuItem>
                            </Menu>
                        </> :
                        <Button href={'/login'} color='inherit' id={'login_header_btn'}>Войти</Button>}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        name: state.auth.displayName,
        photo: state.auth.photoURL
    }
};

const mapDispatchToProps = {
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);