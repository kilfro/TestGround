import React from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import '../../styles/component/test-page/option.css';

const MultipleChoice = (props) => {
    return (
        <div className='option-group'>
            {props.options.map(op =>
                <FormControlLabel
                    key={op.id} label={op.text} className='option'
                    control={<Checkbox id={String(op.id)} color="primary"/>}
                />
            )}
        </div>
    );
};

export default MultipleChoice;