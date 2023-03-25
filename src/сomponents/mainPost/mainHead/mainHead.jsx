import React from 'react';
import { Typography } from '@mui/material';
import s from './mainHead.module.css';
import MyButton from './myButton/myButton';


function MainHead({ handleRepeatReq }) {

    return (
        <div className={s.mainHeadWrapper} >
            {/* сюда добавить Breadcrumb */}
            <Typography variant="h5" component="h1" mb={2}>Добро пожаловать на страницу постов</Typography>
            <MyButton />
        </div>
    );
}

export default MainHead;