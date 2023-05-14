import React from 'react';
import {Typography, Grid} from '@mui/material';
import s from './styles.module.css';
import AuthorizeForm from '../authorization/authorizeModal';

export function UserNotFound() {
  return (
    <div className={s.wrapper}>
    <Grid container
          spacing={2}
          flexDirection='column'
          alignItems='center'
    >
        <Grid item>
            <Typography
                variant="h5"
            >Привет! Добро пожаловать на наш пост-сайт!
            </Typography>
        </Grid>

        <Grid item>
            <Typography variant="body1">
                <>
                    <p> Что-то пошло не по сценарию... Наверное нет авторизации на пост-сайте</p>
                    <p>Давай это исправим! Нажимай на кнопку авторизоваться и присоединяйся!</p>
                    <p>У тебя сразу появятся возможности просмотра и добавления постов, уставки лайков и
                        комментирования</p>
                </>
            </Typography>
        </Grid>

        <Grid item>
            <AuthorizeForm/>
        </Grid>
    </Grid>

</div>
);
}

