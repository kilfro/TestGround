import React from 'react';
import * as API from '../../../api/api';
import {
    Container,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
} from "@material-ui/core";
import {Paper} from "@material-ui/core/index";
import {compare} from "../../supporting/Functions";
import Search from "@material-ui/icons/esm/Search";

class TestInformationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testInfo: {},
            userStatistic: [],
            order: 'asc',
            orderBy: 'name',
            searchFor: '',
        };
    }

    componentDidMount() {
        const {uid} = this.props.match.params;

        API.getTestInfo(uid)
            .then(res => this.setState({testInfo: res.data}));

        API.getTestUserStatistic(uid)
            .then(res => this.setState({userStatistic: res.data}));
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
        const {testInfo, order, orderBy} = this.state;
        const userStatistic = [...this.state.userStatistic]
            .filter(stat => stat.name.includes(this.state.searchFor.trim()))
            .sort((a, b) => {
                return order === 'asc' ? compare(a, b, orderBy) : -compare(a, b, orderBy);
            });

        return (
            <Container maxWidth={'md'}>
                <div className='table-title'>
                    <h3>{testInfo.name}</h3>
                    <TextField
                        onChange={this.searchChangeHandler}
                        placeholder={'Поиск по имени'}
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
                                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                                    <TableSortLabel
                                        id={'name'}
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Пользователь
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    className='small'
                                    align="right"
                                    sortDirection={orderBy === 'attempts' ? order : false}>
                                    <TableSortLabel
                                        id={'attempts'}
                                        active={orderBy === 'attempts'}
                                        direction={orderBy === 'attempts' ? order : 'asc'}
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
                            {userStatistic.map((stat, index) =>
                                <TableRow key={index} className={(index % 2 === 0 ? ' gray-row' : '') + ' body-row'}>
                                    <TableCell>{stat.name}</TableCell>
                                    <TableCell>{stat.attempts}</TableCell>
                                    <TableCell align="right">{Math.round(stat.max * 100)}%</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    }
}

export default TestInformationPage;