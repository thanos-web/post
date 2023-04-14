import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useContext } from "react"
import { PostContext } from "../../contexts/post-context"
import { About } from "../about/about"
import { Post } from "../post"


export const PostList = () => {
    const {posts} = useContext(PostContext)
    return (
        
        <Grid2 container spacing={3}>
            <About/>
            {posts.map(postData => <Post key={postData._id} {...postData} />)}
            
        </Grid2>

    )
}