import React from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import logo from '../../logo-2.png';
import '../../styles/component/header/header.css';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <AppBar position={'static'} className='header'>
                <Toolbar>
                    <Link to={'/'}>
                        <img src={logo} alt={'logo'} className='header-logo'/>
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;