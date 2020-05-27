import React from 'react';
import * as API from '../../api/api';
import {Container, Step, StepLabel, Stepper} from "@material-ui/core";
import TabPanel from "../supporting/TabPanel";
import TestDescription from "./TestDescription";
import TestQuestions from "./TestQuestions";
import TestResult from "./TestResult";

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

    nextTab = (index) => {
        this.setState({tabPosition: index})
    };

    render() {
        const {tabPosition, test} = this.state;
        const descriptionProps = {
            uid: test.uid,
            name: test.name,
            anonymous: test.anonymous,
            additional: test.additional,
            needPassword: test.needPassword,
            onlyRegistered: test.onlyRegistered,
            nextTab: this.nextTab
        };

        const questionsProps = {
            anonymous: test.anonymous,
            testUid: test.uid,
            questions: test.questions,
            nextTab: this.nextTab
        };

        return (
            <Container maxWidth={'md'}>
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

export default MainTestPage;