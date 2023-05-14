import {useContext} from 'react';
import s from './styles.module.css';
import {CardMedia, Typography, CardContent, Chip, CardHeader, Avatar, Card, Box} from '@mui/material';
import {Stack} from '@mui/system';
import {LocalStorageContext} from "../app/index";
import {useNavigate} from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {FavoriteBorderOutlined, Favorite} from '@mui/icons-material';
import {isLiked} from '../../utils/posts';

export default function Post({post}) {
    const {handleSetLike, userInfoData, handleSetLikePost} = useContext(LocalStorageContext)
    const like = isLiked(post, userInfoData)
    const handleIntoCardClick = () => {
        navigate(`/post/${post["_id"]}`)
    }

    const navigate = useNavigate()

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }

    const handleLike = () => {
        handleSetLike(post);
        handleSetLikePost(post)
    }

    const createdPost = new Date(post?.created_at).toLocaleString('ru', options).slice(0, -3)

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
                        src={post.author.avatar}
                        sx={{width: 56, height: 56}}
                    />
                }
                title={post.author.name}
                subheader={post.author.about}
            />
            <div onClick={handleIntoCardClick}>

                {/* Фото карточки */}
                <CardMedia className={s.pointer}
                           sx={{
                               height: '300px',
                               width: '100%',
                               display: 'flex',

                           }}
                           image={post.image}
                           title={post.title}
                           alt={`фото ${post.title}`}
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
                    > {post.title}
                    </Typography>

                    {/* Описание(текст) карточки */}
                    <Typography mt={2}
                                variant="body1"
                                noWrap={true}>
                        {post.text}
                    </Typography>

                </CardContent>
            </div>

            {/*/!* Хештеги карточки *!/*/}
            <CardContent>
                <Stack mt={0}
                       flexGrow='1'
                       direction="row"
                       flexWrap='wrap'
                       spacing={1}
                >

                    {post.tags.length > 0 && post.tags[0] !== '' ? post.tags.map((item, index) =>
                        <Chip sx={{marginBottom: '5px', maxWidth: '100px'}} label={item} key={index} title={item}
                              size="small" color="success"/>
                    ) : <span></span>}

                </Stack>
            </CardContent>

            {/* Подвал карточки (лайки, комменты, дата добавления поста) */}
            <CardContent sx={{display: 'flex', flex: '1'}}>
                <Box className={s.cardFooter__wrapper}>
                    <Box className={s.cardFooter__favorite}>
                        {/* <Like /> */}
                        <Box className={s.boxSvg}>
                            <Box className={s.boxLike} onClick={handleLike}>
                                {like ? <Favorite className={s.iconLike}/> :
                                    <FavoriteBorderOutlined className={s.iconNotLike} fontSize={'medium'}/>}
                                {post.likes?.length > 0 && <Typography>{post.likes?.length}</Typography>}
                            </Box>
                        </Box>
                        {/* <Comment /> */}
                        <Box className={s.boxComm}>
                            <Box className={s.boxComment}>
                                <ChatBubbleOutlineIcon fontSize={'medium'}/>
                                {post.comments?.length > 0 &&
                                    <Typography>{post.comments?.length}</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <div className={s.cardFooter__date}>{createdPost}</div>
                </Box>
            </CardContent>
        </Card>
    );
}