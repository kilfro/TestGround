import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from "@material-ui/core";
import Question from "./Question";
import '../../styles/component/test-page/test-questions.css';
import {Progress} from "../supporting/Progress";
import {changeAnswer, formAnswers, sendAnswers} from "../../store/actions/answers";

class TestQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionIndex: 0
        };
    }

    componentDidMount() {
        this.props.formAnswers(this.props.questions);
    }

    nextQuestion = () => {
        const {user, testUid, answers, nextTab, sendAnswers, questions} = this.props;

        if (this.state.currentQuestionIndex + 1 !== questions.length) {
            this.setState((prev) => ({currentQuestionIndex: prev.currentQuestionIndex + 1}));
        } else {
            sendAnswers(user, testUid, answers);
            nextTab(2);
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
        let filterElement = this.props.answers.filter(a => a.questionId === currentQuestion.id)[0];
        const userAnswer = filterElement ? filterElement.answers : [];
        const lastQuestion = currentQuestionIndex + 1 === questions.length;

        return (
            <div>
                <Progress variant="determinate" value={this.getProgress()} className='progress'/>
                <h5 className='counter'>Вопрос {currentQuestionIndex + 1} из {questions.length}</h5>
                <Question {...currentQuestion} answer={userAnswer}/>
                <Button onClick={this.nextQuestion} color={'primary'} variant={'contained'}>
                    {lastQuestion ? 'Завершить тест' : 'Дальше'}
                </Button>
            </div>
        )
    }
}

TestQuestions.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    nextTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        answers: state.answers,
        user: state.auth.uid
    }
};

const mapDispatchToProps = {
    formAnswers,
    changeAnswer,
    sendAnswers
};

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestions);