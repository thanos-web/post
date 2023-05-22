import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import { Footer } from "../footer";
import { PostList } from "../postList"
import api from '../../utils/api';
import { useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";
import { PostPage } from "../../pages/post-page";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../contexts/current-user-context";
import { PostsContext } from "../../contexts/posts-context";
import { NotFoundPage } from "../../pages/not-found-page";
import NewPostForm from "../new-post-form";
import Modal from "../modal";
import { ModalFormContext } from "../../contexts/header-context";
import { EditPostPage } from "../../pages/edit-post-page";



export const AppPost = () => {

    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [modalFormStatus, setModalFormStatus] = useState(false)


    function handleModalFormStatus(isOpen) {
        setModalFormStatus(isOpen)
    }

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
    function handlePostDelete(post) {
        api.deletePost(post._id)
            .then((updatePost) => {
                const newPosts = posts.filter(post => {
                    return post._id !== updatePost._id;
                })
                setPosts(newPosts)

            })
    }

    function handleAddNewPost(dataForm) {
        api.addNewPost(dataForm)
            .then((newPost) => {
                posts.unshift(newPost)
                setPosts(posts)
                handleModalFormStatus(false)
            })
    }

    function handleUpdatedPost(data) {
        const newPosts = posts.map(post => {
            return post._id === data._id ? data : post
        })
        setPosts(newPosts)
    }

    useEffect(() => {

        api.getAllInfo()
            .then(([postData, userInfoData]) => {
                setCurrentUser(userInfoData);
                setPosts(postData)
            })

    }, [])

    return (
        <PostsContext.Provider value={{ handleLike: handlePostLike, handleDelete: handlePostDelete, handleAddPost: handleAddNewPost, handleUpdatedPost: handleUpdatedPost, posts }}>
            <UserContext.Provider value={{ currentUser }}>
                <ModalFormContext.Provider value={{ modalFormStatus, ChangeModalFormStatus: handleModalFormStatus }}>
                    <Modal isOpen={modalFormStatus}>
                        <NewPostForm />
                    </Modal>
                    <CssBaseline />
                    <AppHeader />
                    <Container>
                        <Routes>
                            <Route path='/' element={<PostList />} />
                            <Route path='/postPage/:postID' element={<PostPage />} />
                            <Route path='/editPage/:postID' element={<EditPostPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Routes>
                    </Container>
                    <Footer />
                </ModalFormContext.Provider>
            </UserContext.Provider>
        </PostsContext.Provider>
    );
}
