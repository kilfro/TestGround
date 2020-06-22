import React from 'react';
import {
    Checkbox,
    Container,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField
} from "@material-ui/core";
import Search from "@material-ui/icons/esm/Search";
import * as API from "../../../api/api";
import {getFirebaseUser} from "../../../auth/auth";
import {Paper} from "@material-ui/core/index";
import {compare} from "../../supporting/Functions";

class UserTestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testsList: [],
            orderBy: 'name',
            order: 'asc',
            searchFor: ''
        };
    }

    componentDidMount() {
        getFirebaseUser()
            .then(user => API.getUserTests(user.uid)
                .then(res => this.setState({testsList: res.data.rows}))
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

    changeActivity = (event) => {
        const {id, checked} = event.target;
        API.changeTestActivity(id, checked)
            .then(this.updateActivity(id, checked));
    };

    updateActivity = (uid, isActive) => {
        const correctList = [...this.state.testsList].map(test =>
            test.uid === uid ? {...test, is_active: isActive} : test
        );

        this.setState({testsList: correctList});
    };

    render() {
        const {order, orderBy} = this.state;

        const testsList = [...this.state.testsList]
            .filter(res => res.name.includes(this.state.searchFor.trim()))
            .sort((a, b) => {
                return order === 'asc' ? compare(a, b, orderBy) : -compare(a, b, orderBy);
            });
        return (
            <Container maxWidth={'md'}>
                <div className='table-title'>
                    <h2>Мои тесты</h2>
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
                                    align="center"
                                    sortDirection={orderBy === 'is_active' ? order : false}>
                                    <TableSortLabel
                                        id={'is_active'}
                                        active={orderBy === 'is_active'}
                                        direction={orderBy === 'is_active' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Активность теста
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    className='small'
                                    align="right"
                                    sortDirection={orderBy === 'users' ? order : false}>
                                    <TableSortLabel
                                        id={'users'}
                                        active={orderBy === 'users'}
                                        direction={orderBy === 'users' ? order : 'asc'}
                                        onClick={this.createSortHandler}
                                    >
                                        Количество пользователей
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testsList.map((test, index) =>
                                <TableRow key={index} className={(index % 2 === 0 ? ' gray-row' : '') + ' body-row'}>
                                    <TableCell>{test.name}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            id={test.uid}
                                            onChange={this.changeActivity}
                                            checked={test.is_active}
                                            color="primary"
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{test.users}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default UserTestsPage;