import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import '../../styles/component/test-page/option.css';
import {changeAnswer} from "../../store/actions/answers";

const MultipleChoice = (props) => {

    const getCheckBoxValue = (id) => {
        const filtered = props.answer.filter(a => a.id === String(id));

        return filtered.length !== 0;
    };

    const changeHandler = (event) => {
        const {id, checked} = event.target;
        console.log(id);

        let newAnswer;
        if (checked) {
            newAnswer = props.answer.concat({id: id});
        } else {
            newAnswer = props.answer.filter(a => a.id !== id);
        }

        props.changeAnswer(props.questionId, newAnswer);
    };

    return (
        <div className='option-group'>
            {props.options.map(op =>
                <FormControlLabel
                    key={op.id} label={op.text} className='option'
                    control={<Checkbox
                        id={String(op.id)} color="primary" checked={getCheckBoxValue(op.id)} onChange={changeHandler}/>}
                />
            )}
        </div>
    );
};

MultipleChoice.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    answer: PropTypes.arrayOf(PropTypes.object).isRequired,
    questionId: PropTypes.number.isRequired
};

const mapDispatchToProps = {
    changeAnswer
};

export default connect(null, mapDispatchToProps)(MultipleChoice);