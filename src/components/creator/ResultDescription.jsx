import React from 'react';
import {Button, Card, TextField} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../../styles/component/creator/resultDescription.css';

const ResultDescription = (props) => {
    const {id, min, max, text} = props;

    return (
        <Card className='result-card'>
            <div className='card-header'>
                <div className='period'>
                    <span>Баллов от</span>
                    <TextField id={'min'} type={'number'} inputProps={{min: 0, step: 1}} value={min}
                               className='period-field'/>
                    <span>до</span>
                    <TextField id={'max'} type={'number'} inputProps={{min: 0, step: 1}} value={max}
                               className='period-field'/>
                </div>
                <Button className='remove-btn'><HighlightOffIcon/></Button>
            </div>
            <h3>Описание:</h3>
            <TextField multiline rows={3} fullWidth id={'text'} value={text}/>
        </Card>
    )
};

export default ResultDescription;