import React from 'react';
import {Button} from "@material-ui/core";
import Question from "./Question";
import {connect} from 'react-redux';
import {addQuestion} from "../../store/actions/newTest";
import '../../styles/component/creator/questions-list.css';

class QuestionsList extends React.Component {
    render() {
        const {questions, addQuestion} = this.props;

        return (
            <>
                {questions.map(q => <Question question={q} key={q.id}/>)}
                <Button fullWidth id={'add_btn'} color={'primary'} variant={'contained'}
                        onClick={addQuestion}>
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