import React from 'react';
import PropTypes from 'prop-types';
import {FormControlLabel, Radio, TextField} from "@material-ui/core";
import '../../styles/component/creator/questionOptions.css';
import RemoveOptionButton from "./RemoveOptionButton";

const RadioOption = (props) => {
    const {option, handleChange, remove} = props;

    return (
        <FormControlLabel
            value={option.id}
            className='option-label'
            control={
                <Radio color="primary" value={option.id} id={`isRight.${option.id}`}/>
            }
            label={
                <TextField id={`text.${option.id}`} value={option.text} fullWidth onChange={handleChange}
                           InputProps={{endAdornment: (<RemoveOptionButton remove={remove} id={option.id}/>)}}/>
            }
        />
    );
};

RadioOption.propTypes = {
    option: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default RadioOption;