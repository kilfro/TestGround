import React from 'react';
import PropTypes from 'prop-types';
import TableContainer from "@material-ui/core/es/TableContainer/TableContainer";
import MaterialTable from "@material-ui/core/es/Table/Table";
import '../../styles/component/table/table.css';
import TableTitle from "./TableTitle";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import HeaderCell from "./HeaderCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import Row from "./Row";

class Table extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        search: PropTypes.shape({
            searchFor: PropTypes.string.isRequired,
            searchTitle: PropTypes.string
        }),
        headerCells: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired
    };

    static defaultProps = {
        headerCells: [],
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            orderBy: '',
            order: 'asc'
        };
    }

    searchHandler = (event) => {
        const {value} = event.target;
        this.setState({searchString: value});
    };

    sortHandler = (event) => {
        const column = event.target.id;
        const {orderBy, order} = this.state;

        if (column === orderBy) {
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            this.setState({
                order: newOrder
            })
        } else {
            this.setState({
                orderBy: column,
                order: 'asc'
            })
        }
    };

    render() {
        const {name, search, columnsDescription, data} = this.props;
        const {orderBy, order} = this.state;

        return (
            <TableContainer>
                <TableTitle name={name}
                            searchFunction={search ? this.searchHandler : undefined}
                            searchTitle={search.searchTitle}/>
                <MaterialTable>
                    <TableHead>
                        <TableRow className='table-head'>
                            {columnsDescription.map((column, index) =>
                                <HeaderCell key={index} {...column}
                                            order={column.name === orderBy ? order : false}
                                            sortHandler={this.sortHandler}/>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) =>
                            <Row
                                key={index}
                                rowItem={item}
                                columnsDescription={columnsDescription}
                            />)}
                    </TableBody>
                </MaterialTable>
            </TableContainer>
        )
    }
}

export default Table;