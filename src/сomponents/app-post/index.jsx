import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import {Footer}  from "../footer";


export const AppPost = () => {
    return (
        <>
        <CssBaseline/>
        <Container>
        <AppHeader/>
        </Container>
        <Footer/>
        </>
    )
}