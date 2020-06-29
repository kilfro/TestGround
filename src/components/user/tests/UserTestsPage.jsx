import React from 'react';
import {Container} from "@material-ui/core";
import * as API from "../../../api/api";
import {getFirebaseUser} from "../../../auth/auth";
import Table from "../../table/Table";

class UserTestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testsList: [],
        };
    }

    componentDidMount() {
        getFirebaseUser()
            .then(user => API.getUserTests(user.uid)
                .then(res => this.setState({testsList: res.data.rows}))
            )
    }

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
        return (
            <Container maxWidth={'md'}>
                <Table
                    name='Мои тесты'
                    search={{searchFor: 'name', searchTitle: 'Поиск по названию'}}
                    columnsDescription={[
                        {
                            name: 'name',
                            label: 'Название теста',
                            type: 'link',
                            to: '/user/tests/:uid'
                        },
                        {
                            name: 'is_active',
                            label: 'Активность теста',
                            type: 'boolean',
                            handler: this.changeActivity
                        },
                        {
                            name: 'users',
                            label: 'Количество пользователей',
                            type: 'number'
                        }
                    ]}
                    data={this.state.testsList}
                />
            </Container>
        );
    }
}

export default UserTestsPage;