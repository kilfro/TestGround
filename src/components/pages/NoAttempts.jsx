import React from 'react';
import Button from "@material-ui/core/es/Button/Button";
import '../../styles/component/pages/noAttempts.css';

const NoAttempts = () =>
    <div className='no-attempts'>
        <div>
            Похоже Вы исчерпали все предоставыленные попытки.
            <br/>
            Результат теста Вы можете увидеть во вкладке "Мои результаты"
        </div>
        <Button href={'/user/results'} size={'large'} variant={'outlined'}>Мои результаты</Button>
    </div>;

export default NoAttempts;