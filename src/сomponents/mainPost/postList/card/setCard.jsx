import React from 'react';
import s from './setCard.module.css';
import { Card } from '@mui/material';
import { CardHeader, Avatar } from '@mui/material';
import { CardMedia, Typography, CardContent } from '@mui/material';
import { Stack } from '@mui/system';
import Chip from '@mui/material/Chip';


function SetCard({ card }) {
    // console.log('props приходит в setCard >>', card)

    const handleClick = () => {
        alert('You clicked title')
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