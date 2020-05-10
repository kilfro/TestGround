import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeQuestion} from "../../store/actions/newTest";
import {Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import '../../styles/component/creator/questionOptions.css';

const QuestionOptions = (props) => {
    const {options, multiple, questionId, changeQuestion} = props;

    //TODO: исправить - доблирование id после удаления варианта и добавления нового
    const addOption = () => {
        const newId = options.length + 1;

        changeQuestion({
            id: questionId,
            options: options.concat({
                id: newId,
                text: '',
                isRight: false
            })
        });
    };

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

        console.log(checkedId);
        return checkedId;
    };

    //TODO: удаление вариантов
    return (<>
        {
            !multiple ?
                <RadioGroup value={getRadioGroupValue(options)} onChange={handleRadioGroupChange}>
                    {options.map(op => <FormControlLabel
                        value={op.id} key={op.id} className='option-label'
                        control={<Radio color="primary" value={op.id} id={`isRight.${op.id}`}/>}
                        label={<TextField id={`text.${op.id}`} value={op.text} fullWidth
                                          onChange={handleCheckBoxChange}/>}/>
                    )}
                </RadioGroup>
                : <>
                    {options.map(op => <FormControlLabel
                        key={op.id} className='option-label'
                        control={<Checkbox id={`isRight.${op.id}`} color="primary"
                                           inputProps={{'aria-label': 'secondary checkbox'}}
                                           value={op.isRight} onChange={handleCheckBoxChange}/>}
                        label={<TextField id={`text.${op.id}`} value={op.text} fullWidth
                                          onChange={handleCheckBoxChange}/>}/>
                    )}
                </>}

        <Button onClick={addOption}>Добавить вариант</Button>
    </>)
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