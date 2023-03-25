import React from 'react';
import { Typography, Grid } from '@mui/material';
import s from './cardNotAuth.module.css'
import FormDialog from '../../../app-header/authComponents/authModal/authModal';


export function CardNotAuth(props) {
    return (
        <div className={s.wrapper}>
            <Grid container
                spacing={2}
                flexDirection='column'
                alignItems='center'
            // justifyContent='space-between'
            >
                <Grid item>
                    <Typography
                        variant="h5"
                    >Приветствуем на сайте и добро пожаловать!
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography
                        variant="body1"
                    >
                        <p>Что-то пошло не так? Возможно необходимо зарегистрироваться.</p>
                        <p>Легко исправить, нажимай кнопку авторизоваться!</p>
                        <p>Сможешь добавлять посты, ставить лайки и комментрировать</p>
                    </Typography>
                </Grid>

                <Grid item>
                    <FormDialog />
                </Grid>
            </Grid>

        </div>
    );
}