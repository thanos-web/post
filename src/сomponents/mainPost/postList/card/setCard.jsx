import React from 'react';
import s from './setCard.module.css';
import { Card } from '@mui/material';
import { CardHeader, Avatar } from '@mui/material';
import { CardMedia, Typography, CardContent } from '@mui/material';
import { Stack } from '@mui/system';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';

function SetCard({ card }) {
    // console.log('props приходит в setCard >>', card)

    const handleClick = () => {
        alert('Поиск по тегу')
    }

    return (

      
        <Card className={s.cardShadow}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >

            {/* Автор карточки */}
            <CardHeader
                sx={{
                    display: 'flex'
                }}
                avatar={
                    <Avatar
                        src={card.author.avatar}
                        sx={{ width: 56, height: 56 }}
                    />
                }
                title={card.author.name}
                subheader={card.author.about}

            />

            {/* Фото карточки */}
            <CardMedia className={s.pointer}
               
                sx={{
                    height: 350,
                    width: '100%',
                    display: 'flex',

                }}
                image={card.image}
                title={card.title}
                alt={`фото ${card.title}`}
            />

            {/* Заголовок карточки */}
            <CardContent className={s.pointer}
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Typography mt={2}
                    variant="h5"
                    component="h5"
                > {card.title}
                </Typography>

                {/* Описание(текст) карточки */}
                <Typography mt={2}
                    variant="body1">
                    {card.text}
                </Typography>
               
                {/* Хештеги карточки */}
                <Stack mt={2} direction="row" spacing={1}>
                    {card.tags.map((item) =>
                        <Chip label={item} key={item} size="small" onClick={handleClick} color="success" />
                    )}
                </Stack>
            </CardContent>

            {/* Футер карточки (лайки, комменты, дата добавления поста) */}
            <CardContent
                sx={{
                    display: 'flex',
                    flex: '1'
                }}
            >
                <div className={s.cardFooter__wrapper}>
                    <div className={s.cardFooter__favorite}>
                        <div className={s.boxSvg}>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21c.211 0 .514-.137.735-.265C18.405 17.205 22 13.098 22 8.922 22 5.45 19.553 3 16.29 3c-1.863 0-3.374.863-4.29 2.186C11.104 3.873 9.573 3 7.71 3 4.447 3 2 5.451 2 8.922c0 4.176 3.595 8.284 9.275 11.813.211.128.514.265.725.265Zm0-1.657c-.04 0-.11-.049-.201-.117C7.579 16.5 3.62 12.569 3.62 8.921c0-2.608 1.732-4.344 4.069-4.344 1.893 0 2.98 1.147 3.625 2.128.272.392.443.5.685.5.242 0 .393-.118.685-.5.695-.96 1.742-2.128 3.625-2.128 2.337 0 4.069 1.736 4.069 4.344 0 3.647-3.958 7.578-8.168 10.303-.1.07-.17.118-.211.118Z" fill="#7B8E98"></path>
                                <path clip-rule="evenodd" d="M12 19.343c-.04 0-.11-.049-.201-.117C7.579 16.5 3.62 12.569 3.62 8.921c0-2.608 1.732-4.344 4.069-4.344 1.893 0 2.98 1.148 3.625 2.128.272.392.443.5.685.5.242 0 .393-.118.685-.5.695-.96 1.742-2.128 3.625-2.128 2.337 0 4.069 1.736 4.069 4.344 0 3.647-3.958 7.578-8.168 10.303-.1.07-.17.118-.211.118Z"></path>
                            </svg>
                        </div>
                        <Button>Удалить</Button>
                        <Button>Изменить</Button>
                        <div className={s.boxComm}>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="comment" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zm-280 0c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z"></path>
                                <path d="M894 345a343.92 343.92 0 00-189-130v.1c-17.1-19-36.4-36.5-58-52.1-163.7-119-393.5-82.7-513 81-96.3 133-92.2 311.9 6 439l.8 132.6c0 3.2.5 6.4 1.5 9.4a31.95 31.95 0 0040.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-.5.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6 17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5-99 31-1-104-8-9c-84.6-103.2-90.2-251.9-11-361 96.4-132.2 281.2-161.4 413-66 132.2 96.1 161.5 280.6 66 412-80.1 109.9-223.5 150.5-348 102zm505-17l-8 10 1 104-98-33-12 5c-56 20.8-115.7 22.5-171 7l-.2-.1A367.31 367.31 0 00729 676c76.4-105.3 88.8-237.6 44.4-350.4l.6.4c23 16.5 44.1 37.1 62 62 72.6 99.6 68.5 235.2-8 330z"></path>
                                <path d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z"></path>
                            </svg>100
                        </div>
                    </div>
                    <div className={s.cardFooter__date}>25 марта 2023</div>
                </div>

            </CardContent>
        </Card>
        // {/* </Grid> */ }

    );

}

export default SetCard;