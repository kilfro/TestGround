import React from 'react';
import {Container, Tab, Tabs} from "@material-ui/core";
import '../../styles/component/creator/testcreator.css';
import TabPanel from "../supporting/TabPanel";
import TestDescription from "./TestDescription";
import QuestionsList from "./QuestionsList";

class TestCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPosition: 0,
            name: '',
            description: '',
            password: '',
            anonymous: false,
            onlyRegistered: false,
            needPassword: false,
            questions: []
        };
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

    changeFieldHandler = (event) => {
        const {id, value, checked} = event.target;

        if (id === 'anonymous' || id === 'onlyRegistered' || id === 'needPassword') {
            this.setState({[id]: checked});
        } else {
            this.setState({[id]: value});
        }
    };

    createNewQuestion = () => {
        this.setState((prev) => {
            return {
                questions: prev.questions.concat({})
            }
        })
    };

    render() {
        const {
            tabPosition, name, description, anonymous,
            onlyRegistered, needPassword, password, questions
        } = this.state;

        const descriptionProps = {
            name,
            description,
            anonymous,
            onlyRegistered,
            needPassword,
            password,
            changeFieldHandler: this.changeFieldHandler
        };

        const questionsProps = {
            questions,
            createNewQuestion: this.createNewQuestion
        };

        return (
            <Container maxWidth={'md'}>
                <Tabs value={tabPosition} onChange={this.handleChangeTab} variant="fullWidth">
                    <Tab label="Информация о тесте" {...this.getTabProps(0)}/>
                    <Tab label="Вопросы" {...this.getTabProps(1)}/>
                    <Tab label="Результаты" {...this.getTabProps(2)}/>
                </Tabs>

                <TabPanel tabPosition={tabPosition} index={0}>
                    <TestDescription {...descriptionProps}/>
                </TabPanel>

                <TabPanel tabPosition={tabPosition} index={1}>
                    <QuestionsList {...questionsProps}/>
                </TabPanel>
                <TabPanel tabPosition={tabPosition} index={2}>There will be results description here.</TabPanel>
            </Container>
        )
    }
}

export default TestCreator;