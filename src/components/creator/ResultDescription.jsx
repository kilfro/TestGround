import React from 'react';

const ResultDescription = (props) => {
    const {id, min, max, text} = props;

    return (
        <div>
            Min: {min}
            Max: {max}
            Text: {text}
        </div>
    )
};

export default ResultDescription;