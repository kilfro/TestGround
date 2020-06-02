import React from 'react';
import {connect} from 'react-redux';

const TestResult = (props) => {
    const {points, maxPoints, text} = props;

    return (
        <div>
            <h3>Вы набрали {points} из {maxPoints} баллов</h3>
            <p>{text}</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.result
    }
};

export default connect(mapStateToProps)(TestResult);