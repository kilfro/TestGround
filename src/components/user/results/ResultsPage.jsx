import React from 'react';
import * as API from '../../../api/api';
import {Container} from "@material-ui/core";
import '../../../styles/component/user/results.css';
import {getFirebaseUser} from "../../../auth/auth";
import Table from "../../table/Table";

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

    render() {
        return (
            <Container maxWidth={'md'}>
                <Table
                    name='Мои результаты'
                    search={{searchFor: 'name', searchTitle: 'Поиск по названию'}}
                    columnsDescription={[
                        {
                            name: 'name',
                            label: 'Название теста',
                            type: 'string'
                        },
                        {
                            name: 'count',
                            label: 'Количество попыток',
                            type: 'number'
                        },
                        {
                            name: 'max',
                            label: 'Лучший результат',
                            type: 'percent'
                        }
                    ]}
                    data={this.state.results}
                />
            </Container>
        );
    }
}

export default ResultsPage;