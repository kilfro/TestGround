import React from 'react';
import {InputAdornment} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import '../../styles/component/creator/questionOptions.css';

const RemoveOptionButton = (props) => {
    return (
        <InputAdornment position="end">
            <RemoveCircleOutlineIcon onClick={props.remove} id={props.id} className='remove-icon'/>
        </InputAdornment>
    )
};

export default RemoveOptionButton;