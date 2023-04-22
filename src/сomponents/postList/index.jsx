import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { About } from "../about/about"
import { Post } from "../post"
import { useContext } from "react"
import { PostsContext } from "../../contexts/post-context"


export const PostList = () => {
    const { posts} = useContext(PostsContext)
    return (
        
        <Grid2 container spacing={3}>
            <About/>
            {/* {console.log(posts)} */}
            {posts.map(postData => <Post key={postData._id} {...postData} />)}
            
        </Grid2>

    )
}