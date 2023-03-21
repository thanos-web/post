import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import {Footer}  from "../footer";
import {PostList} from "../postList"
import { postData } from '../../postData';

export const AppPost = () => {
    return (
        <>
        <CssBaseline/>
        <Container>
        <AppHeader/>
        <PostList posts={postData}/>
        </Container>
        <Footer/>
        </>
    )
}