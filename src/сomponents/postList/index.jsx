import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { About } from "../about/about"
import { Post } from "../post"


export const PostList = ({ posts, onPostLike, onDelete, currentUser }) => {
    return (
        
        <Grid2 container spacing={3}>
            <About/>
            {posts.map(postData => <Post key={postData._id} {...postData} onPostLike={onPostLike}  onDelete={onDelete} currentUser={currentUser}/>)}
            
        </Grid2>

    )
}