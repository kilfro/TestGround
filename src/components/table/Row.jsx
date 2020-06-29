import React from 'react';
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import Cell from "./Cell";

const Row = ({rowItem, columnsDescription}) => {
    return (
        <TableRow>
            {columnsDescription.map((column, index) =>
                <Cell key={index}
                      id={rowItem.uid}
                      value={rowItem[column.name]}
                      type={column.type}
                      handler={column.handler}
                      to={column.to}
                />)}
        </TableRow>
    )
};

export default Row;