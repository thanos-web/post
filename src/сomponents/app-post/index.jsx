import { createChainedFunction, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import { Footer } from "../footer";
import { PostList } from "../postList"
import { postData } from '../../postData';
import { About } from "../about/about";
import api from '../../utils/api';
import { useState, useEffect } from "react";



export const AppPost = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {

        api.getAllInfo()
            .then(([postData, userInfoData]) => {
                setCurrentUser(userInfoData);
                setPosts(postData)
            })

    }, [])


    return (
        <>
            <CssBaseline />
            <AppHeader user={currentUser}></AppHeader>
            <Container>
                <About />
                <PostList posts={posts} />
            </Container>
            <Footer />
        </>
    );
}