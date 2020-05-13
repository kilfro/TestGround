import React from 'react';
import {Container, Tab, Tabs} from "@material-ui/core";
import {connect} from 'react-redux';
import {v4 as getUID} from 'uuid';
import '../../styles/component/creator/testcreator.css';
import {createUid} from "../../store/actions/newTest";
import TabPanel from "../supporting/TabPanel";
import TestDescription from "./TestDescription";
import QuestionsList from "./QuestionsList";
import ResultList from "./ResultList";

class TestCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPosition: 0
        };
    }

    componentDidMount() {
        this.props.createUid(getUID());
    }

    getTabProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    handleChangeTab = (event, newValue) => {
        this.setState({tabPosition: newValue})
    };

    render() {
        const {tabPosition} = this.state;

        return (
            <Container maxWidth={'md'}>
                <Tabs value={tabPosition} onChange={this.handleChangeTab} variant="fullWidth">
                    <Tab label="Информация о тесте" {...this.getTabProps(0)}/>
                    <Tab label="Вопросы" {...this.getTabProps(1)}/>
                    <Tab label="Результаты" {...this.getTabProps(2)}/>
                </Tabs>

                <TabPanel tabPosition={tabPosition} index={0}>
                    <TestDescription/>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={1}>
                    <QuestionsList/>
                </TabPanel>
                <TabPanel tabPosition={tabPosition} index={2}>
                    <ResultList/>
                </TabPanel>
            </Container>
        )
    }
}

const mapDispatchToProps = {
    createUid
};

export default connect(null, mapDispatchToProps)(TestCreator);