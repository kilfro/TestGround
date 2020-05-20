import React from 'react';
import {connect} from 'react-redux';
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import '../../styles/component/test-page/option.css';
import {changeAnswer} from "../../store/actions/answers";

const OnlyChoice = (props) => {

    const getCurrentValue = () => {
        let value = -1;
        const {answer} = props;

        if (answer.length === 1) {
            value = answer[0].id;
        }

        return value;
    };

    const handleChange = (event) => {
        const {value} = event.target;

        props.changeAnswer(props.questionId, [{id: value}]);
    };

    return (
        <RadioGroup className='option-group' value={getCurrentValue()} onChange={handleChange}>
            {props.options.map(op =>
                <FormControlLabel
                    key={op.id} label={op.text} value={String(op.id)}
                    control={<Radio color="primary"/>}
                />
            )}
        </RadioGroup>
    );
};

const mapDispatchToProps = {
    changeAnswer
};

export default connect(null, mapDispatchToProps)(OnlyChoice);