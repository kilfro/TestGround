import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import '../../styles/component/test-page/option.css';

const OnlyChoice = (props) => {
    return (
        <RadioGroup className='option-group'>
            {props.options.map(op =>
                <FormControlLabel
                    key={op.id} label={op.text}
                    control={<Radio color="primary" value={op.id}/>}
                />
            )}
        </RadioGroup>
    );
};

export default OnlyChoice;