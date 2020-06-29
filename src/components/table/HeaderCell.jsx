import React from 'react';
import PropTypes from 'prop-types';
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableSortLabel from "@material-ui/core/es/TableSortLabel/TableSortLabel";

const HeaderCell = ({type, order, name, label, sortHandler}) =>
    <TableCell sortDirection={order}
               className={(type !== 'string' && type !== 'link') ? 'small' : ''}>
        <TableSortLabel id={name} active={Boolean(order)} direction={order ? order : 'asc'} onClick={sortHandler}>
            {label}
        </TableSortLabel>
    </TableCell>;

HeaderCell.propTypes = {
    order: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sortHandler: PropTypes.func.isRequired
};

export default HeaderCell;