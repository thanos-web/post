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
import { PostPage } from "../pages/post-page";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages/not-found-page";



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
    function handlePostDelete(post) {
        api.deletePost(post._id)
            .then((updatePost) => {
                const newPosts = posts.filter(post => {
                    return post._id !== updatePost._id;
                })
                setPosts(newPosts)

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
                <Routes>
                    <Route path="/post" element={<PostPage/>} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
                
                <About />
                <PostList posts={posts} onPostLike={handlePostLike} currentUser={currentUser} onDelete={handlePostDelete}/>
            </Container>
            <Footer />
        </>
    );
}