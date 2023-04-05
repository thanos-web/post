import { ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/system';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { isLiked } from '../../utils/posts';
import { spread } from 'q';

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
    likes,
    _id,
    onPostLike,
    onDelete,
    currentUser
}) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const like = isLiked(likes, currentUser?._id)
    const canDelete = (currentUser?._id === author._id)
    const name = author.name.split(" ", 2)

    function handleClickButtonLike() {
        onPostLike({ likes, _id })
    }

    function handleClickDelete() {
        onDelete({ _id })
    }

    return (
        <Grid2 sx={{ display: 'flex' }} item xs={12} sm={6} md={4} lg={3}>
            <Card className={s.card}
            //   sx={{
            //     borderRadius: 5,              
            //   }}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={author.avatar}>
                            {/* {author.email.slice(0,1).toUpperCase()} */}
                        </Avatar>
                    }
                 
                    action= {canDelete &&
                            (<IconButton aria-label="settings" onClick={handleClickDelete} >
                                <DeleteIcon />
                        </IconButton>)
                    }
                    title={name.join(" ")}
                    subheader={dayjs(created_at).fromNow()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="h5"component='h3'gutterBottom>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" component='p' noWrap>
                    {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                    <IconButton aria-label="add to favorites" onClick={handleClickButtonLike}>
                        <FavoriteIcon sx={{ color: like ? "red" : "grey" }}/>
                    </IconButton>
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
        </Grid2>
    )
}
