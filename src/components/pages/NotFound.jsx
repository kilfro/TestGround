import React from 'react';
import '../../styles/component/pages/notfound.css';
import {Button} from "@material-ui/core";

const NotFound = () => {
    return (
        <div className={'not-found-page'}>
            <div className="code-404">404</div>
            <div>Похоже страницы, которую Вы ищете, не существует</div>
            <Button href={'/'} size={'large'} variant={'outlined'}>Вернуться домой</Button>
        </div>
    )
};

export default NotFound;