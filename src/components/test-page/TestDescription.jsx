import React from 'react';
import {Button, TextField} from "@material-ui/core";
import '../../styles/component/test-page/description.css';
import * as API from "../../api/api";
import {createError} from "../../store/actions/error";
import {connect} from 'react-redux';

class TestDescription extends React.Component {
    _isMounted = true;

    constructor(props) {
        super(props);
        this.state = {
            inputPassword: ''
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    clickHandler = () => {
        if (this.props.needPassword) {
            API.checkTestPassword(this.props.uid, this.state.inputPassword)
                .then(res => {
                    if (res.data) {
                        this.props.nextTab(1);
                    } else {
                        this.props.createError('Неверный пароль');
                    }

                    if (this._isMounted) {
                        this.setState({inputPassword: ''});
                    }
                });
        } else {
            this.props.nextTab(1);
        }
    };

    inputPasswordChange = (event) => {
        this.setState({inputPassword: event.target.value});
    };

    render() {
        const {name, additional, needPassword} = this.props;
        const {inputPassword} = this.state;

        return (
            <>
                <h2>{name}</h2>
                <div className='additional-info'>{additional}</div>
                {needPassword && <div className='password-box'>
                    <span>Для продолжения необходимо ввести пароль:</span>
                    <TextField id={'awaiting-password'} value={inputPassword} onChange={this.inputPasswordChange}
                               type={'password'}/>
                </div>}
                <Button onClick={this.clickHandler} color={'primary'} fullWidth variant={'contained'} className='next'>
                    Начать тест</Button>
            </>
        );
    }
}

const mapDispatchToProps = {
    createError
};

export default connect(null, mapDispatchToProps)(TestDescription);