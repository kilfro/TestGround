import React from 'react';
import {connect} from 'react-redux';
import {Button} from "@material-ui/core";
import ResultDescription from "./ResultDescription";

const ResultList = (props) => {
    const results = props.resultDescriptions;

    return (
        <>
            {results.map(res => <ResultDescription {...res} key={res.id}/>)}
            <Button fullWidth variant={'outlined'} color={'primary'}>Добавить результат</Button>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        resultDescriptions: state.newTest.resultDescriptions
    }
};

export default connect(mapStateToProps)(ResultList);