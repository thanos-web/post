import { CssBaseline } from "@mui/material"
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import { PostList } from "../postList";

export const AppPost = () => {
    return (
        <>
        <CssBaseline/>
        <Container>
        <AppHeader/>
        <PostList/>
        </Container>
        
        </>
    )
}