import React from 'react';
import * as API from '../../../api/api';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField
} from "@material-ui/core";
import '../../../styles/component/results/results.css';
import {getFirebaseUser} from "../../../auth/auth";
import {InputAdornment} from "@material-ui/core/es/index";
import Search from "@material-ui/icons/esm/Search";
import {compare} from "../../supporting/Functions";

class ResultsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            orderBy: 'name',
            order: 'asc',
            searchFor: ''
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

    searchChangeHandler = (event) => {
        const {value} = event.target;

        this.setState({searchFor: value});
    };

    render() {
        const {orderBy, order} = this.state;

        const results = this.state.results
            .filter(res => res.name.includes(this.state.searchFor.trim()))
            .sort((a, b) => {
                return order === 'asc' ? compare(a, b, orderBy) : -compare(a, b, orderBy);
            });

        return (
            <Container maxWidth={'md'}>
                <div className='table-title'>
                    <h2>Мои результаты</h2>
                    <TextField
                        onChange={this.searchChangeHandler}
                        placeholder={'Поиск по названию'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}/>
                </div>
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