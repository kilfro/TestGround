import React from 'react';
import {connect} from 'react-redux';
import {Button} from "@material-ui/core";
import ResultDescription from "./ResultDescription";
import {addResult} from "../../store/actions/newTest";

const ResultList = (props) => {
    const results = props.resultDescriptions;
    const {addResult} = props;

    return (
        <>
            {results.map(res => <ResultDescription result={res} key={res.id}/>)}
            <Button fullWidth variant={'outlined'} color={'primary'} onClick={addResult}>Добавить результат</Button>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        resultDescriptions: state.newTest.resultDescriptions
    }
};

const mapDispatchToProps = {
    addResult
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);