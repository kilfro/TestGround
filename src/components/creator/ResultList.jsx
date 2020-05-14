import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from "@material-ui/core";
import ResultDescription from "./ResultDescription";
import {addResult} from "../../store/actions/newTest";

const ResultList = (props) => {
    const results = props.resultDescriptions;
    const {addResult} = props;

    return (
        <>
            {results.map(res => <ResultDescription result={res} key={res.id}/>)}
            <ButtonGroup variant="contained" color="primary" fullWidth>
                <Button variant={'outlined'} color={'primary'} onClick={addResult} id={'add-btn'}>Добавить
                    результат</Button>
                <Button>Сохранить тест</Button>
            </ButtonGroup>
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