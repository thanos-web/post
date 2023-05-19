import { Delete, Favorite as FavoriteIcon } from '@mui/icons-material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { isLiked } from '../../utils/posts';
import { Button, IconButton, } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { PostsContext } from '../../contexts/posts-context';
import { FormComment } from '../comment-form';
import { Comment } from '../comment';


dayjs.locale('ru');
dayjs.extend(relativeTime);


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
    comments = [],
    handleCreateComment,
    handleDeleteComment,
    ...props
}) => {


    const like = isLiked(likes, currentUser?._id)
    const navigate = useNavigate();
    const { handleDelete: onPostDelete } = useContext(PostsContext)
    


    function handleLikeClick() {
        onPostLike({ likes, _id })
    }

    function handleClikButtonDelete() {
        onPostDelete({ _id });
        navigate(-1)
    }




    return (
        <>
            <Button variant="outlined" href="#outlined-buttons" sx={{ marginTop: '20px', borderRadius: 0, borderColor: 'black', color: 'black' }} onClick={() => navigate(-1)}>
                Назад
            </Button>
            <h1 className={s.detailsH1}>{title}</h1>
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
                    {currentUser?._id === author?._id &&
                        <IconButton aria-label="delete" onClick={handleClikButtonDelete}>
                            <Delete />
                        </IconButton>
                    }
                    {currentUser?._id === author?._id &&
                        <Link className={s.link} to={`/editPage/${_id}`}>
                            <IconButton aria-label="settings" >
                                <EditIcon />
                            </IconButton>
                        </Link>
                    }
                </div>
            </div>
            <Grid2 sx={{ display: 'flex', flexDirection: 'column' }} >
                <div className={s.wrapper}>
                    <img src={image} className={s.postImage} alt="" />
                    <div className={s.descriptionPost}>
                        <h3 className={s.postH3}>Описание</h3>
                        <p>{text}</p>
                    </div>
                </div>

                {comments.length !== 0 && <div className={s.comments}>
                <h3 id="comments" className={s.postH3}>Комментарии</h3>
                      {comments.map(commentData => <Comment key={commentData._id} {...commentData} handleDeleteComment={handleDeleteComment} postId={_id} currentUser={currentUser} />)}
                      </div>}
                <FormComment postId={_id} handleCreateComment={handleCreateComment} />

            </Grid2>
        </>

    )
}