import React from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import Question from "./Question";
import {connect} from 'react-redux';
import {addQuestion} from "../../store/actions/newTest";

const QuestionsList = (props) => {
    const {questions, addQuestion, nextTab} = props;

    const selfCheck = () => {
        let isRight = true;

        questions.map(q => {
            if (!q.isRight) {
                isRight = false;
            }
        });

        return isRight;
    };

    return (
        <>
            {questions.map((q, index) => (<Question question={q} key={q.id} index={index}/>))}

            <ButtonGroup className='navigate-btn' variant="contained" color="primary" fullWidth>
                <Button id={'add_btn'} variant={'outlined'} onClick={addQuestion}>Добавить вопрос</Button>
                <Button onClick={nextTab} disabled={!selfCheck()}>Далее</Button>
            </ButtonGroup>
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