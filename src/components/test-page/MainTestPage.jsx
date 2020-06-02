import React from 'react';
import {connect} from 'react-redux';
import * as API from '../../api/api';
import {Container, Step, StepLabel, Stepper} from "@material-ui/core";
import TabPanel from "../supporting/TabPanel";
import TestDescription from "./TestDescription";
import TestQuestions from "./TestQuestions";
import TestResult from "./TestResult";
import {cleanAnswers} from "../../store/actions/answers";
import {cleanResult} from "../../store/actions/result";
import {Redirect} from "react-router";

class MainTestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: {},
            tabPosition: 0
        };
    }

    componentDidMount() {
        const {uid} = this.props.match.params;
        API.getTest(uid).then(res => {
            this.setState({test: res.data})
        });
    }

    componentWillUnmount() {
        this.props.cleanAnswers();
        this.props.cleanResult();
    }

    nextTab = (index) => {
        this.setState({tabPosition: index})
    };

    render() {
        const {tabPosition, test} = this.state;

        const {authenticated} = this.props;
        const {onlyRegistered} = test;

        const descriptionProps = {
            uid: test.uid,
            name: test.name,
            anonymous: test.anonymous,
            additional: test.additional,
            needPassword: test.needPassword,
            nextTab: this.nextTab
        };

        const questionsProps = {
            anonymous: test.anonymous,
            testUid: test.uid,
            questions: test.questions,
            nextTab: this.nextTab
        };

        console.log(authenticated);
        return (
            <Container maxWidth={'md'}>
                {(onlyRegistered && (authenticated !== undefined && !authenticated)) && <Redirect to={'/login'}/>}
                <Stepper activeStep={tabPosition}>
                    <Step id={'to-description'}>
                        <StepLabel>Информация о тесте</StepLabel>
                    </Step>
                    <Step id={'to-questions'}>
                        <StepLabel>Вопросы</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Результаты</StepLabel>
                    </Step>
                </Stepper>

                <TabPanel tabPosition={tabPosition} index={0}>
                    <TestDescription {...descriptionProps}/>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={1}>
                    <TestQuestions {...questionsProps}/>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={2}>
                    <TestResult/>
                </TabPanel>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = {
    cleanAnswers,
    cleanResult
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTestPage);