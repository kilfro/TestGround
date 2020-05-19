import React from 'react';
import {Button, TextField} from "@material-ui/core";
import '../../styles/component/test-page/description.css';
import * as API from "../../api/api";
import {createError} from "../../store/actions/error";
import {connect} from 'react-redux';

class TestDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputPassword: ''
        };
    }

    clickHandler = () => {
        API.checkTestPassword(this.props.uid, this.state.inputPassword)
            .then(res => {
                if (res.data) {
                    this.props.nextTab(1);
                } else {
                    this.props.createError('Неверный пароль');
                }

                this.setState({inputPassword: ''})
            })
    };

    inputPasswordChange = (event) => {
        this.setState({inputPassword: event.target.value});
    };

    render() {
        const {name, additional, anonymous, needPassword} = this.props;
        const {inputPassword} = this.state;

        return (
            <>
                <h2>{name}</h2>
                {anonymous && <h5 className='anonymous'>Анонимный тест</h5>}
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