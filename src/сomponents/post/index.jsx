import { Delete, ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/system';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { isLiked } from '../../utils/posts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostContext } from '../../contexts/post-context';


dayjs.locale('ru');
dayjs.extend(relativeTime);

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',

}));


export const Post = ({
    image,
    title,
    text,
    created_at,
    author,
    name,
    _id,
    likes,
    ...props
}) => {

    const {currentUser} = useContext(UserContext)
    const {handleLike: onPostLike, handleDelete: onPostDelete} = useContext(PostContext)
    const like = isLiked(likes, currentUser?._id)
    const [expanded, setExpanded] = useState(false);
    
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleClikButtonLike() {
        onPostLike({ likes, _id })
    }

    function handleClikButtonDelete() {
        onPostDelete({_id})
    }

    
    return (
        <Grid2 sx={{ display: 'flex' }} item xs={12} sm={6} md={4} lg={3}>
            <Card className={s.card} >
                <CardHeader className={s.cardHeader}
                sx={{
                    height: 100
                }}
                    avatar={
                        <Avatar aria-label="recipe" src={author.avatar}>
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="delete" onClick={handleClikButtonDelete}>
                            <Delete />
                        </IconButton>
                    }
                    title={author.name}
                    subheader={dayjs(created_at).fromNow()}
                />
                <Link className={s.link} to={`/postPage/${_id}`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="h5" component='h3' gutterBottom>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" component='p' noWrap>
                        {text}
                    </Typography>
                </CardContent>
                </Link>
                <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                    <IconButton aria-label="add to favorites" onClick={handleClikButtonLike}>
                    <FavoriteIcon
                        sx={{
                            color: like ?'red' : 'grey'
                        }}  />
                </IconButton>
                <span className={s.likesCounter}>{likes.length > 0 ? likes.length : ""}</span>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {text}
                    </Typography>
                </CardContent>
            </Collapse>
            

        </Card>
        </Grid2 >
    )
}