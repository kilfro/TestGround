import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeQuestion} from "../../store/actions/newTest";
import {RadioGroup} from "@material-ui/core";
import '../../styles/component/creator/questionOptions.css';
import RadioOption from "./RadioOption";
import CheckboxOption from "./CheckboxOption";

const QuestionOptions = (props) => {
    const {options, multiple, questionId, changeQuestion} = props;

    const handleCheckBoxChange = (event) => {
        let options = [...props.options];
        const {id, value, checked} = event.target;

        const type = id.split('.')[0];
        const opId = id.split('.')[1];

        let newOp;

        if (type === 'text') {
            newOp = {text: value};
        } else {
            newOp = {isRight: checked};
        }

        const newOptions = options.map(op => {
            if (String(op.id) === String(opId)) {
                return {
                    ...op,
                    ...newOp
                };
            } else {
                return op;
            }

        });

        changeQuestion({
            id: questionId,
            options: newOptions
        });
    };

    const handleRadioGroupChange = (event) => {
        const newOptions = options.map(op => {
            if (String(op.id) === String(event.target.value)) {
                op.isRight = true;
                return op;
            } else {
                op.isRight = false;
                return op;
            }
        });

        changeQuestion({
            id: questionId,
            options: newOptions
        });
    };

    const getRadioGroupValue = (options) => {
        let checkedId = -1;

        options.map(op => {
            if (op.isRight) {
                checkedId = op.id;
            }
        });

        return checkedId;
    };

    const removeOption = (event) => {
        const id = event.target.id;
        let newOptions = [...options];
        newOptions = newOptions.filter(op => String(op.id) !== String(id));

        changeQuestion({
            id: questionId,
            options: newOptions
        });
    };

    return (
        <>{
              !multiple ?
                  <RadioGroup value={getRadioGroupValue(options)} onChange={handleRadioGroupChange}>
                      {options.map(op =>
                          <RadioOption option={op} handleChange={handleCheckBoxChange} remove={removeOption}
                                       key={op.id}/>
                      )}
                  </RadioGroup>
                  : <>
                      {options.map(op => <CheckboxOption option={op} handleChange={handleCheckBoxChange}
                                                         remove={removeOption} key={op.id}/>)}
                  </>
          }</>)
};

QuestionOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    multiple: PropTypes.bool.isRequired,
    questionId: PropTypes.number.isRequired
};

const mapDispatchToProps = {
    changeQuestion
};

export default connect(null, mapDispatchToProps)(QuestionOptions);