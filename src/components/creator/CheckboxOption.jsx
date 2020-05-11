import React from 'react';
import {Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import '../../styles/component/creator/questionOptions.css';
import RemoveOptionButton from "./RemoveOptionButton";

const CheckboxOption = (props) => {
    const {option, handleChange, remove} = props;

    return (
        <FormControlLabel
            className='option-label'
            control={
                <Checkbox id={`isRight.${option.id}`} color="primary" value={option.isRight} onChange={handleChange}/>
            }
            label={
                <TextField id={`text.${option.id}`} value={option.text} fullWidth onChange={handleChange}
                           InputProps={{endAdornment: (<RemoveOptionButton id={option.id} remove={remove}/>)}}/>
            }
        />
    );
};

export default CheckboxOption;