import React from 'react';
import {Button} from "@material-ui/core";
import Question from "./Question";
import {connect} from 'react-redux';
import {addQuestion} from "../../store/actions/newTest";
import '../../styles/component/creator/questions-list.css';

const QuestionsList = (props) => {
    const {questions, addQuestion} = props;

    return (
        <>
            {questions.map((q, index) => (<Question question={q} key={q.id} index={index}/>))}
            <Button fullWidth id={'add_btn'} color={'primary'} variant={'contained'}
                    onClick={addQuestion}>
                Добавить вопрос
            </Button>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        questions: state.newTest.questions
    }
};

const mapDispatchToProps = {
    addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);