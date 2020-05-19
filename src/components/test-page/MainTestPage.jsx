import React from 'react';
import * as API from '../../api/api';
import {Container, Step, StepLabel, Stepper} from "@material-ui/core";
import TabPanel from "../supporting/TabPanel";

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
        const {tabPosition} = this.state;
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
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={1}>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={2}>
                </TabPanel>
            </Container>
        )
    }
}

export default MainTestPage;