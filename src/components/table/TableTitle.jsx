import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/es/TextField/TextField";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Search from "@material-ui/icons/esm/Search";

const TableTitle = ({name, searchFunction, searchTitle = 'Поиск'}) =>
    <div className='table-title'>
        <h2>{name}</h2>
        {searchFunction &&
        <TextField
            onChange={searchFunction}
            placeholder={searchTitle}
            InputProps={{
                startAdornment: <InputAdornment position="start"><Search/></InputAdornment>
            }}/>
        }
    </div>;

TableTitle.propTypes = {
    name: PropTypes.string.isRequired,
    searchFunction: PropTypes.func,
    searchTitle: PropTypes.string
};

export default TableTitle;