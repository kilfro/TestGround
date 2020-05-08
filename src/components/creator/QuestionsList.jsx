import React from 'react';
import {Button} from "@material-ui/core";
import Question from "./Question";

class QuestionsList extends React.Component {
    render() {
        const {questions = [], createNewQuestion} = this.props;

        return (
            <>
                {questions.map(q => <Question question={q}/>)}
                <Button fullWidth id={'add_btn'} color={'primary'} variant={'contained'} onClick={createNewQuestion}>
                    Добавить вопрос
                </Button>
            </>
        );
    }
}

export default QuestionsList;