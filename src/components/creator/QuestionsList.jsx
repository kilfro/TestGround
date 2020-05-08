import React from 'react';
import {Button} from "@material-ui/core";
import Question from "./Question";
import {connect} from 'react-redux';
import {addQuestion} from "../../store/actions/newTest";
import initialState from "../../store/initialState";
import '../../styles/component/creator/questions-list.css';

class QuestionsList extends React.Component {
    createNewQuestion = () => {
        const {questions, addQuestion} = this.props;

        const id = questions.length + 1;
        const newQuestion = {
            ...initialState.newTest.questions[0],
            id
        };

        addQuestion(newQuestion);
    };

    render() {
        const {questions} = this.props;

        return (
            <>
                {questions.map(q => <Question question={q} key={q.id}/>)}
                <Button fullWidth id={'add_btn'} color={'primary'} variant={'contained'}
                        onClick={this.createNewQuestion}>
                    Добавить вопрос
                </Button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.newTest.questions
    }
};

const mapDispatchToProps = {
    addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);