import {useContext, useEffect, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Paper, Avatar, Button, CardContent, CardHeader, CardMedia, Chip, Grid} from '@mui/material';
import s from './styles.module.css';
import {Stack} from '@mui/system';
import {useForm} from 'react-hook-form';
import {useParams, useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import {FavoriteBorderOutlined, Favorite} from '@mui/icons-material';
import {LocalStorageContext} from "../app/index";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { addComment, deleteCommentById, deletePost, getAllComments, getPostById, changeLikePost} from "../../utils/apiPosts";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'justify',
}));


export function PostDetails() {
    const {handleSetLike, userInfData, handleFirstRender, handleSetLikePost} = useContext(LocalStorageContext)
    const [showFormComment, setShowFormComment] = useState(false)
    const {register, handleSubmit, resetField, formState: {errors}} = useForm()
    const [post, setPost] = useState({})
    const [comments, setComment] = useState([])
    const params = useParams()
    const postId = params.id
    const navigate = useNavigate()
    const term = useMemo(() => post?.likes?.includes(userInfData._id), [post?.likes, userInfData._id])
    const [like, setLike] = useState(term)

    useEffect(() => {
        async function fetchData() {
            const res = await getPostById(postId)
            setPost(res)
            const comData = await getAllComments(postId)
            setComment(comData)
        }

        void fetchData()
    }, [like, postId])


    // Добавить комментарий
    const sendCommentPost = async (data) => {
        const res = await addComment(data, postId)
        setPost(res)
        const comData = await getAllComments(postId)
        setComment(comData)
        resetField('text')
        setShowFormComment(false)
    }

    // Открываем и закрываем форму комментариев
    const openFormComment = () => {
        setShowFormComment(() => !showFormComment)
    }

    // Кнопка назад
    const handleBtnBack = () => {
        navigate(-1)
    }

    const handleLike = async () => {
        await changeLikePost(postId, term)
        await handleSetLikePost(post)
        await handleSetLike(post)
        setLike((prev) => !prev)
    }

    // Удалить комментарий
    const handleDeleteComment = async (commentId) => {
        const res = await deleteCommentById(postId, commentId)
        setPost(res)
        const comData = await getAllComments(postId)
        setComment(comData)
    }


    // Удалить пост
    const handleDeletePost = async () => {
        await deletePost(postId)
        navigate(-1)
        handleFirstRender()
    }
    const handleNavigate = () => {
        navigate('edit')
    }

    // Форматирование даты
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }
    const dateFormat = (data) => {
        return new Date(data).toLocaleString('ru', options).slice(0, -3)
    }


    return (
        <Box sx={{flexGrow: 1, borderRadius: '10px', boxShadow: '0px 5px 10px 2px rgba(17, 18, 19, 0.5)'}}
             backgroundColor='white'
             padding={2}>

            {/* Кнопка назад */}
            <Box className={s.btnBackWrapper}>
                <Button onClick={handleBtnBack} variant='outlined' size='small'
                        sx={{boxShadow: '0px 2px 3px 1px rgba(17, 18, 19, 0.5)'}}>Назад</Button>
            </Box>
            <Grid container spacing={2}>

                {/* фото поста */}
                <Grid item xs={12} md={6} lg={6}>
                    <Item>
                        <CardMedia
                            component="img"
                            sx={{
                                maxHeight: '400px',
                                width: '100%',
                                boxShadow: '0px 5px 10px 2px rgba(17, 18, 19, 0.5)',
                                borderRadius: '10px'
                            }}
                            image={post?.image}
                            title="фото"
                            alt="фото"

                        />
                    </Item>
                </Grid>

                {/* Инфо пользователя / Лайки / Теги */}
                <Grid item xs={12} md={6} lg={6}>
                    <Item>
                        <div className={s.userInfoWrapper}>
                            <CardHeader
                                avatar={
                                    <Avatar src={post?.author?.avatar}
                                            sx={{
                                                backgroundColor: 'teal',
                                                width: 56, height: 56
                                            }}/>}
                                title={post?.author?.name}
                                subheader={dateFormat(post?.created_at)}
                            />
                            {userInfData?._id === post?.author?._id &&
                                <Item>
                                    <Button variant={'text'} onClick={handleNavigate}>Редактировать</Button>
                                    <Button variant={'text'} color={'error'} onClick={handleDeletePost}>Удалить</Button>
                                </Item>
                            }
                        </div>

                        {/* Раздел лайков хештегов */}
                        <CardContent
                            sx={{paddingTop: '0',}}>
                            <div className={s.cardFooter__wrapper}>
                                <div className={s.cardFooter__favorite}>

                                    {/* Лайки карточки */}
                                    <Box className={s.boxSvg} onClick={handleLike}>
                                        {term ? <Favorite fontSize={'large'} className={s.iconLike}/> :
                                            <FavoriteBorderOutlined fontSize={'large'} className={s.iconNotLike}/>}
                                        {post?.likes?.length}
                                    </Box>

                                    {/* Хештеги карточки */}
                                    <Stack mt={2}
                                           flexGrow='1'
                                           direction="row"
                                           flexWrap='wrap'
                                           spacing={1}
                                    >

                                        {post?.tags?.length > 0 && post?.tags[0] !== '' ? post?.tags?.map((item, index) =>
                                            <Chip sx={{marginBottom: '5px', maxWidth: '100px'}} label={item} key={index}
                                                  title={item}
                                                  size="small" color="success"/>
                                        ) : <span></span>}

                                    </Stack>
                                </div>

                            </div>

                        </CardContent>
                    </Item>

                </Grid>

                {/* название  поста */}
                <Grid item xs={12}>
                    <Item sx={{fontSize: '1rem'}}>
                        <span><b>Название поста:</b></span>
                        <span className={s.postDescription}>{post?.title}</span>
                    </Item>
                </Grid>

                {/* Описание поста */}
                <Grid item xs={12}>
                    <Item sx={{fontSize: '1rem'}}>
                        <span><b>Описание поста:</b> </span>
                        <span className={s.postDescription}>{post?.text}</span>
                    </Item>
                </Grid>

                {/* Кнопка открытия / закрытия формы добавления комментария */}
                <Grid item>
                    <Button variant="contained"
                            onClick={openFormComment}
                    >{showFormComment ? 'Скрыть комментарий' : 'Добавить комментарий'}
                    </Button>

                </Grid>

                {/* Форма добавления комментариев */}
                <Grid item xs={12}>
                    {showFormComment &&
                        <Item>
                            <form className={s.formComment} onSubmit={handleSubmit(sendCommentPost)}>
                                <h2>Оставьте ваш комментарий</h2>
                                <textarea
                                    {...register('text', {
                                        required: {
                                            value: true,
                                            message: 'Комментарий не может быть пустым',
                                        }
                                    })}
                                    placeholder='...напишите ваш комментарий'
                                />
                                {errors?.comment && <span className={s.errorComment}>{errors.comment?.message}</span>}

                                <Button sx={{maxWidth: '200px', marginBottom: '2rem'}} size="large" type='submit'
                                        variant="contained" color="success" endIcon={<SendIcon/>}>
                                    Добавить
                                </Button>
                            </form>
                        </Item>
                    }
                </Grid>

                {/*/!* Комментарии *!/*/}
                <Grid item xs={12}>
                    <Item sx={{
                        maxHeight: '450px',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: '10px'
                    }}>

                        {comments?.length !== 0 ?
                            (comments?.map((comment, i) =>
                                <div className={s.commentWrapper} key={i}>
                                    <div className={s.userInfoComment}>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: 'teal',
                                                        width: 32,
                                                        height: 32,
                                                    }}
                                                    src={comment.author.avatar}

                                                />
                                            }
                                            sx={{
                                                minWidth: 'fit-content',
                                                border: '1px solid #ccc',
                                                borderRadius: '30px',
                                                backgroundColor: 'lightgray'
                                            }}
                                            title={comment.author.name}
                                            subheader={dateFormat(comment.created_at)}
                                        />
                                        <div className={s.commentText}>
                                            {comment.text}
                                        </div>
                                    </div>


                                    {userInfData?._id === comment?.author?._id &&
                                        <HighlightOffIcon cursor={'pointer'} color={'error'} onClick={() => {
                                            void handleDeleteComment(comment._id)
                                        }}/>
                                    }
                                </div>
                            )) : <div>Комментариев еще нет, добавь их первым !</div>}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}