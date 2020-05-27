import React from 'react';
import {connect} from 'react-redux';

class TestResult extends React.Component {

    render() {
        const {points, maxPoints, text} = this.props;

        return (
            <div>
                <h3>Вы набрали {points} из {maxPoints} баллов</h3>
                <p>{text}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.result
    }
};

export default connect(mapStateToProps)(TestResult);