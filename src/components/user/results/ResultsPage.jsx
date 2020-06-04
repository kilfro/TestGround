import React from 'react';
import * as API from '../../../api/api';
import {getFirebaseUser} from "../../../auth/auth";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import '../../../styles/component/results/results.css';

class ResultsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            orderBy: 'name',
            order: 'asc'
        };
    }

    componentDidMount() {
        getFirebaseUser()
            .then(user => API.getUserResultsList(user.uid)
                .then(res => this.setState({results: res.data.rows}))
            )
    }

    createSortHandler = (event) => {
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
        const {results, orderBy, order} = this.state;

        const compare = (a, b, orderBy) => {
            if (b[orderBy] < a[orderBy]) {
                return 1;
            }
            if (b[orderBy] > a[orderBy]) {
                return -1;
            }
            return 0;
        };

        results.sort((a, b) => {
            return order === 'asc' ? compare(a, b, orderBy) : -compare(a, b, orderBy);
        });

        return (
            <Container maxWidth={'md'}>
                <TableContainer component={Paper} className='result-table'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className='table-head'>
                                <TableCell
                                    sortDirection={orderBy === 'name' ? order : false}
                                >
                                    <TableSortLabel
                                        id={'name'}
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Название теста
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    className='small'
                                    align="right"
                                    sortDirection={orderBy === 'count' ? order : false}>
                                    <TableSortLabel
                                        id={'count'}
                                        active={orderBy === 'count'}
                                        direction={orderBy === 'count' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Количество попыток
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    className='small'
                                    align="right"
                                    sortDirection={orderBy === 'max' ? order : false}>
                                    <TableSortLabel
                                        id={'max'}
                                        active={orderBy === 'max'}
                                        direction={orderBy === 'max' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Лучший результат
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((res, index) =>
                                <TableRow key={index} className={(index % 2 === 0 ? ' gray-row' : '') + ' body-row'}>
                                    <TableCell>{res.name}</TableCell>
                                    <TableCell align="right">{res.count}</TableCell>
                                    <TableCell align="right">{Math.round(res.max * 100)}%</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default ResultsPage;