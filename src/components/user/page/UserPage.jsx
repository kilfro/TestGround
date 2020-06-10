import React from 'react';
import {connect} from 'react-redux';
import {createError} from "../../../store/actions/error";
import {getFirebaseUser} from "../../../auth/auth";
import * as API from "../../../api/api";
import {Avatar, Container} from "@material-ui/core";
import '../../../styles/component/user/userpage.css';
import FieldEditor from "./FieldEditor";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromFirebase: null,
            fromBase: {}
        };
    }

    componentDidMount() {
        getFirebaseUser()
            .then(user => {
                this.setState({fromFirebase: user});
                API.getUserByUid(user.uid)
                    .then(user => this.setState({fromBase: user}))
            })
            .catch(err => createError(err));
    }

    changeName = (newName) => {
        API.updateUser({
            ...this.state.fromBase,
            name: newName
        })
    };

    render() {
        const {fromBase} = this.state;
        return (
            <Container maxWidth={'md'} className='info-container'>
                <Avatar alt={fromBase.name} src={fromBase.photo_url} className='avatar'/>
                <div>
                    <FieldEditor value={fromBase.name} changeFunction={this.changeName}/>
                    <h3 className='user-email'>{fromBase.email}</h3>
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    createError
};

export default connect(null, mapDispatchToProps)(UserPage);