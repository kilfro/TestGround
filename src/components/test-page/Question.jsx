import React from 'react';
import '../../styles/component/test-page/test-questions.css';
import MultipleChoice from "./MiltipleChoice";
import OnlyChoice from "./OnlyChoice";

const Question = (props) => {
    const {id, question, multiple, options, answer} = props;

    return (
        <div>
            <h3>{question}</h3>
            {multiple ?
                <MultipleChoice options={options} questionId={id} answer={answer}/> :
                <OnlyChoice options={options} questionId={id} answer={answer}/>
            }
        </div>
    );
};

export default Question;