import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from "@material-ui/core";
import ResultDescription from "./ResultDescription";
import {addResult, insertTest} from "../../store/actions/newTest";
import SavedMessage from "./SavedMessage";

class ResultList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wasSaved: false
        };
    }

    saveTest = () => {
        const {test, insertTest} = this.props;
        insertTest(test);
        this.setState({wasSaved: true});
    };

    selfCheck = () => {
        const results = this.props.resultDescriptions;
        let wrongResults;

        wrongResults = results.filter(r => r.min === '');
        if (wrongResults.length !== 0)
            return false;

        wrongResults = results.filter(r => r.max === '');
        if (wrongResults.length !== 0)
            return false;

        wrongResults = results.filter(r => !r.text || r.text === '');
        return wrongResults.length === 0;
    };

    render() {
        const {wasSaved} = this.state;
        const results = this.props.resultDescriptions;
        const {addResult, test} = this.props;

        return (
            <>
                {wasSaved
                    ? <SavedMessage testName={test.description.name} testUid={test.uid}/>
                    : <>
                        {results.map(res => <ResultDescription result={res} key={res.id}/>)}
                        <ButtonGroup variant="contained" color="primary" fullWidth>
                            <Button variant={'outlined'} color={'primary'} onClick={addResult} id={'add-btn'}>Добавить
                                результат</Button>
                            <Button id={'save-test-btn'} disabled={!this.selfCheck()} onClick={this.saveTest}>Сохранить
                                тест</Button>
                        </ButtonGroup>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.newTest,
        resultDescriptions: state.newTest.resultDescriptions
    }
};

const mapDispatchToProps = {
    addResult,
    insertTest
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);