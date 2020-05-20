import React from 'react';
import {Button} from "@material-ui/core";
import Question from "./Question";
import '../../styles/component/test-page/test-questions.css';
import {Progress} from "../supporting/Propgress";

class TestQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionIndex: 0
        };
    }

    nextQuestion = () => {
        if (this.state.currentQuestionIndex + 1 !== this.props.questions.length) {
            this.setState((prev) => ({currentQuestionIndex: prev.currentQuestionIndex + 1}));
        } else {
            this.props.nextTab(2);
        }
    };

    getProgress = () => {
        const {questions} = this.props;
        const {currentQuestionIndex} = this.state;

        return (currentQuestionIndex + 1) / questions.length * 100;
    };

    render() {
        const {questions} = this.props;
        const {currentQuestionIndex} = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        const lastQuestion = currentQuestionIndex + 1 === questions.length;

        return (
            <div>
                <Progress variant="determinate" value={this.getProgress()} className='progress'/>
                <h5 className='counter'>Вопрос {currentQuestionIndex + 1} из {questions.length}</h5>
                <Question {...currentQuestion}/>
                <Button onClick={this.nextQuestion} color={'primary'} variant={'contained'}>
                    {lastQuestion ? 'Завершить тест' : 'Дальше'}
                </Button>
            </div>
        )
    }
}

export default TestQuestions;