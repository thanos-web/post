import { ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon} from '@mui/icons-material'
import { Avatar, Card, CardActions, Chip, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, styled } from '@mui/system';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import s from './styles.module.css';
import { isLiked } from '../../utils/posts';
import { Delete as DeleteIcon } from '@mui/icons-material';

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
    tags,
    created_at,
    author,
    _id,
    onPostLike,
    likes,
    currentUser,
    onDelete,
    ...props
}) => {
    const canDelete = (currentUser?._id === author._id)
    const like = isLiked(likes, currentUser._id)
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleClikButtonLike() {
        onPostLike({ likes, _id })
    }
    function handleClickDelete() {
        onDelete({ _id })
    }
    
    return (
        <Grid2 sx={{ display: 'flex' }} item xs={12} sm={6} md={4} lg={3}>
            <Card className={s.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={author.avatar}>
                        </Avatar>
                    }

                    action= {canDelete &&
                        (<IconButton aria-label="settings" onClick={handleClickDelete} >
                            <DeleteIcon />
                    </IconButton>)
                }
                    
                    title={author.email}
                    subheader={dayjs(created_at).fromNow()}
                />
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
                <CardContent>
                    <Stack mt={0}
                        flexGrow='1'
                        direction='row'
                        flexWrap='wrap'
                        spacing={1}>
                        {tags.map((item) =>
                            <Chip sx={{ marginBottom: '5px', maxWidth: '100px' }} label={item} key={item} size="small" color="success"/>)}    
                    </Stack>
                </CardContent>
                <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                    <IconButton aria-label="add to favorites"onClick={handleClikButtonLike}>
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