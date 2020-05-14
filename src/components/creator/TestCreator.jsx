import React from 'react';
import {Container, Step, StepButton, Stepper} from "@material-ui/core";
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

    nextTab = () => {
        const {tabPosition} = this.state;
        const nextTab = tabPosition + 1;

        this.setState({tabPosition: nextTab});
    };

    render() {
        const {tabPosition} = this.state;

        return (
            <Container maxWidth={'md'}>
                <Stepper activeStep={tabPosition}>
                    <Step>
                        <StepButton onClick={() => {
                            this.setState({tabPosition: 0})
                        }}>Информация о тесте</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => {
                            this.setState({tabPosition: 1})
                        }}>Вопросы</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => {
                            this.setState({tabPosition: 2})
                        }}>Результаты</StepButton>
                    </Step>
                </Stepper>

                <TabPanel tabPosition={tabPosition} index={0}>
                    <TestDescription nextTab={this.nextTab}/>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={1}>
                    <QuestionsList nextTab={this.nextTab}/>
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