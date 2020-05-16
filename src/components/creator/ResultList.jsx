import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from "@material-ui/core";
import ResultDescription from "./ResultDescription";
import {addResult, insertTest} from "../../store/actions/newTest";

const ResultList = (props) => {
    const results = props.resultDescriptions;
    const {addResult, insertTest, test} = props;

    const saveTest = () => {
        insertTest(test);
    };

    const selfCheck = () => {
        let wrongResults;

        wrongResults = results.filter(r => r.min === '');
        if (wrongResults.length !== 0)
            return false;

        wrongResults = results.filter(r => r.max === '');
        if (wrongResults.length !== 0)
            return false;

        wrongResults = results.filter(r => !r.text || r.text === '');
        if (wrongResults.length !== 0)
            return false;

        return true;
    };

    return (
        <>
            {results.map(res => <ResultDescription result={res} key={res.id}/>)}
            <ButtonGroup variant="contained" color="primary" fullWidth>
                <Button variant={'outlined'} color={'primary'} onClick={addResult} id={'add-btn'}>Добавить
                    результат</Button>
                <Button disabled={!selfCheck()} onClick={saveTest}>Сохранить тест</Button>
            </ButtonGroup>
        </>
    );
};

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