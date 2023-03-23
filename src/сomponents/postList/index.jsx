import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Post } from "../post"


export const PostList = ({ posts }) => {
    return (
        <Grid2 container spacing={3}>
            {posts.map(postData => <Post key={postData._id} {...postData} />)}
        </Grid2>

    )
}