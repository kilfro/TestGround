import React from 'react';
import PropTypes from 'prop-types';
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

RemoveOptionButton.propTypes = {
    id: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired
};

export default RemoveOptionButton;