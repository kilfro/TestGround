import React from 'react';
import PropTypes from 'prop-types';
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

Question.propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    answer: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Question;