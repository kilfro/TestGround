import React from 'react';
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import {Link} from "react-router-dom";

const chooseView = ({id, value, type, handler, to}) => {
    switch (type) {
        case 'boolean':
            return <Checkbox
                id={id}
                onChange={handler}
                checked={value}
                color="primary"
                inputProps={{'aria-label': 'primary checkbox'}}
            />;
        case 'link':
            return <Link to={to.replace(':uid', id)}>{value}</Link>;
        case 'percent':
            return `${Math.round(value * 100)}%`;
        case 'string':
        case 'number':
        default:
            return String(value);
    }
};

const Cell = (props) =>
    <TableCell>{chooseView({...props})}</TableCell>
;

export default Cell;