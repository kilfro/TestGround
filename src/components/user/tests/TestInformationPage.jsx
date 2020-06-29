import React from 'react';
import * as API from '../../../api/api';
import {Container} from "@material-ui/core";
import Table from "../../table/Table";

class TestInformationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testInfo: {},
            userStatistic: []
        };
    }

    componentDidMount() {
        const {uid} = this.props.match.params;

        API.getTestInfo(uid)
            .then(res => this.setState({testInfo: res.data}));

        API.getTestUserStatistic(uid)
            .then(res => this.setState({userStatistic: res.data}));
    }

    render() {
        const {testInfo} = this.state;

        return (
            <Container maxWidth={'md'}>
                <Table
                    name={testInfo.name}
                    search={{searchFor: 'name', searchTitle: 'Поиск по имени'}}
                    columnsDescription={[
                        {
                            name: 'name',
                            label: 'Пользователь',
                            type: 'string'
                        },
                        {
                            name: 'attempts',
                            label: 'Попытки',
                            type: 'number'
                        },
                        {
                            name: 'max',
                            label: 'Лучший резальтат',
                            type: 'percent'
                        }
                    ]}
                    data={this.state.userStatistic}
                />
            </Container>
        )
    }
}

export default TestInformationPage;