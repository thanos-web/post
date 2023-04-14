import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Post } from '../post/post';

export function PostList({ posts, onPostLike, onDelete, currentUser }) {

    return (
        <Grid2 container spacing={3}>

            {posts.map(postData => <Post key={postData._id} {...postData} onPostLike={onPostLike} onDelete={onDelete} currentUser={currentUser}/>)}
        
        </Grid2>
    )
}