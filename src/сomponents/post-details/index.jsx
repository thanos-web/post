import { Delete, ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/system';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { spread } from 'q';
import { isLiked } from '../../utils/posts';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';


dayjs.locale('ru');
dayjs.extend(relativeTime);

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',

// }));


export const PostDetails = ({
    image,
    title,
    text,
    created_at,
    author,
    avatar,
    about,
    name,
    _id,
    ID_POST,
    onPostLike,
    likes = [],
    currentUser,
    onPostDelete,
    ...props
}) => {

    const like = isLiked(likes, currentUser?._id)
    
    function handleLikeClick() {
        onPostLike({ likes, _id })
    }

    function handleClikButtonDelete() {
        onPostDelete({ _id })
    }


    return (
        <>
            <h1 className={s.detailsH1}>Детали поста</h1>
            <h2>{title}</h2>
                <div className={s.aboutPost}>
                    <div className={s.authorInfo}>
                        <img className={s.authorAvatar} src={author?.avatar} alt="" />
                        <span className={s.marginRight} >{author?.name}</span>
                        <span className={s.marginRight}>{author?.about}</span>
                        <span className={s.marginRight}>{dayjs(created_at).fromNow()}</span>
                    </div>
                    <div className={s.iconButtons}>
                        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                            <FavoriteIcon
                                sx={{
                                    color: like ? 'red' : 'grey'
                                }} />
                        </IconButton>
                        <span className={s.likesCounter}>{likes.length > 0 ? likes.length : ""}</span>
                                <IconButton aria-label="delete" onClick={handleClikButtonDelete}>
                                    <Delete />
                                </IconButton>
                                <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>

                    </div>
                </div>
            <Grid2 sx={{ display: 'flex', flexDirection: 'column' }} >
                
                <img src={image} className={s.postImage} alt="" />
                <div className={s.descriptionPost}>
                    <h3 className={s.postH3}>Описание</h3>
                    <p>{text}</p>
                </div>

            </Grid2>
        </>

    )
}
