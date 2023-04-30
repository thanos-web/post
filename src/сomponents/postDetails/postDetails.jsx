import { Delete, Edit, Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, styled } from '@mui/system';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { useContext } from 'react';
import { isLiked } from '../../utils/posts';
import { UserContext } from '../../contexts/currentUserContext';
import { PostsContext } from '../../contexts/postContext';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Chip, IconButton, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';


dayjs.locale('ru');
dayjs.extend(relativeTime);


export const PostDetails = ({
    image,
    title,
    text,
    tags,
    created_at,
    author,
    avatar,
    about,
    name,
    _id,
    ID_POST,
    likes = [],
    ...props
}) => {

    const { currentUser } = useContext(UserContext);
    const like = isLiked(likes, currentUser?._id);
    const [post, setPost] = useState({})
    const {handleLike: onPostLike, handleEdit: onPostEdit, handleDelete: onPostDelete } = useContext(PostsContext);
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;
    const [isEditMode, setEditMode] = useState(false);
    const [postOriginal, setPostOriginal] = useState({});
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleLikeClick() {
        onPostLike({ likes, _id })
    }

    function handleClickButtonEdit() {
        navigate('/edit')
    }

    function handleClickButtonDelete() {
        onPostDelete({ postId, _id })
    }

    function handleChangeEditMode() {
        console.log('проверка PostOriginal', postOriginal.title);
        let mode = !isEditMode
        if (mode === true) {
            setPostOriginal({...post})
        }
        setEditMode(mode)
    } 
    return (
        <>
            <Button variant="outlined" href="#outlined-buttons"sx={{ marginTop: '20px', color:"black"}} onClick={() => navigate ("/")}>
                Назад
            </Button>
            <h1 className={s.detailsH1}>Детали поста</h1>
            <h2>{title}</h2>
            <div className={s.aboutPost}>
                <div className={s.authorInfo}>
                    <img className={s.authorAvatar} src={author?.avatar} alt="" />
                    <span className={s.authorData} >{`${author?.name}:`}</span>
                    <span className={s.authorData}>{author?.about}</span>
                    <span className={s.createdAt}>{`Запостили ${dayjs(created_at).fromNow()}`}</span>
                </div>
                <div className={s.iconButtons}>
                    <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                        <FavoriteIcon
                            sx={{
                                color: like ? 'red' : 'grey'
                            }} />
                    </IconButton>
                    <span className={s.likesCounter}>{likes.length > 0 ? likes.length : ""}</span>
                    
                    <IconButton aria-label="edit" onClick={handleClickButtonEdit}>
                        <Edit /> 
                    </IconButton>

                    <IconButton aria-label="delete" onClick={handleClickButtonDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <Grid2 sx={{ display: 'flex', flexDirection: 'column'}} >
                
                <img src={image} className={s.postImage} alt="" />
                <div className={s.descriptionPost}>
                    <h3 className={s.postH3}>Описание</h3>
                    <h4 className={s.text}>{text}</h4> 
                    <p className={s.title}>{title}</p>
                <CardContent>
                    <Stack mt={0}
                        flexGrow='1'
                        direction='row'
                        flexWrap='wrap'
                        spacing={1}>
                        {tags?.map((item) =>
                            <Chip sx={{ marginBottom: '5px', maxWidth: '100px' }} label={item} key={item} size="small" color="success"/>)}    
                    </Stack>
                </CardContent>
                </div>

            </Grid2>
        </>

    )
}