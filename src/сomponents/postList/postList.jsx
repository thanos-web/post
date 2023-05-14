import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { About } from "../about/about"
import Post from "../post/post"

export const PostList = ({ posts }) => {
    return (
        
        <Grid2 container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <About/>
            {posts?.map((post) => (
                <Grid2 item key={post["_id"]} xs={12} sm={4} md={4}>
                    <Post post={post} />
                </Grid2>
            ))}
        </Grid2>    
    );
}