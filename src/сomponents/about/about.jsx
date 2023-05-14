import s from './styles.module.css';
import React from 'react';
import { Typography } from '@mui/material';
import BasicBreadcrumbs from '../breadCrumb/breadCrumb';

export const About = () => {
    return (
        <>
            <Typography variant="h2" component="h1" mb={2}>Блог</Typography>
            <div className={s.about}>
                <BasicBreadcrumbs/>
                <div className={s.imageAbout}></div>
                <div className={s.textAbout}>
                    <h2>Мега интересный блог с самым разнообразным контентом</h2>
                    <p> Тут ты можешь выкладывать пост на любую тему, удалять свой пост и читать посты одногруппников</p>
                </div>

            </div>
        </>

    )
}