import { createChainedFunction, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header/appHeader';
import Footer from "../footer/footer";
import { PostList } from "../postList/postList"
import { About } from "../about/about";
import api from '../../utils/apiPosts';
import { useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";
import { PostPage } from "../../pages/postPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../contexts/currentUserContext";
import { PostsContext } from "../../contexts/postContext";
import { NotFoundPage } from "../../pages/notFoundPage";

export const AppPost = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)

       return api.changeLikePost(post._id, like)
            .then((updatePost) => {
                const newPost = posts.map(postState => {
                    return postState._id === updatePost._id ? updatePost : postState
                })
                setPosts(newPost)
                return updatePost;
            })
    }

    function handlePostEdit (post) {
        api.editPost(post._id)
            .then((updatePost) => {
                const editedPost = posts.filter(post => {
                    return post._id !== updatePost._id;
                })
                setPosts(editedPost)
            })
    }
    function handlePostDelete(post) {
        api.deletePost(post._id)
            .then((deletePost) => {
                const newPosts = posts.filter(post => {
                    return post._id !== deletePost._id;
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
        <PostsContext.Provider value={{currentUser,handleLike:handlePostLike, handleEdit: handlePostEdit, handleDelete: handlePostDelete, posts}}>
        <UserContext.Provider value={{currentUser}}>
            <CssBaseline />
            <AppHeader user={currentUser}></AppHeader>
            {/* <Routes>
                <Route path="/" element= {<AppHeader user={currentUser}></AppHeader>}/>
                <Route path='*' element={null} />
            </Routes> */}
            
            <Container>
                <Routes>
                    <Route path='/' element={<PostList  onPostLike={handlePostLike} currentUser={currentUser} onEdit={handlePostEdit} onDelete={handlePostDelete} />}/>
                    <Route path='/postPage/:postID' element={<PostPage />}/>
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Container>


            <Footer />
        </UserContext.Provider>
        </PostsContext.Provider>
    );
}