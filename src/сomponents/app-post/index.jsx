import { createChainedFunction, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import { Footer } from "../footer";
import { PostList } from "../postList"
import { postData } from '../../postData';
import { About } from "../about/about";
import api from '../../utils/api';
import { useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";



export const AppPost = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        
        api.changeLikePost(post._id, like)
        .then ((updatePost) => {
            const newPost = posts.map(postState => {
            return postState._id === updatePost._id ? updatePost : postState
            })

            setPosts(newPost)
        })
    }

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
                <PostList posts={posts} onPostLike={handlePostLike} currentUser={currentUser}/>
            </Container>
            <Footer />
        </>
    );
}