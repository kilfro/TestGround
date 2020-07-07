import React from 'react';
import '../../styles/component/creator/savedMessage.css';
import Button from "@material-ui/core/es/Button/Button";
import {CopyToClipboard} from "react-copy-to-clipboard";

const SavedMessage = ({testName, testUid}) => {
    const createStringToCopy = () => `http://192.168.1.243:3000/test/${testUid}`;

    return (
        <div className='message'>
            <div>
                Тест <span className='test-name'>"{testName}"</span> успешно сохранен
            </div>
            <CopyToClipboard text={createStringToCopy()}>
                <Button variant={'outlined'}>Скопировать ссылку на тест</Button>
            </CopyToClipboard>
        </div>
    )
};

export default SavedMessage;