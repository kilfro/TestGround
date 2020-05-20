import React from 'react';
import '../../styles/component/test-page/test-questions.css';
import MultipleChoice from "./MiltipleChoice";
import OnlyChoice from "./OnlyChoice";

const Question = (props) => {
    const {question, multiple, options} = props;

    return (
        <div>
            <h3>{question}</h3>
            {multiple ?
                <MultipleChoice options={options}/> :
                <OnlyChoice options={options}/>
            }
        </div>
    );
};

export default Question;