import { createChainedFunction, CssBaseline, Modal } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import { Footer } from "../footer";
import { PostList } from "../postList"
import { postData } from '../../postData';
import { About } from "../about/about";
import api from '../../utils/api';
import { useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";
import { PostPage } from "../../pages/post-page";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../contexts/current-user-context";
import { PostsContext } from "../../contexts/post-context";
import { NotFoundPage } from "../../pages/not-found-page";
import RegisterForm from "../form/new-post";





export const AppPost = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [modalFormStatus, setModalFormStatus] = useState(true)

    const onCloseModalForm = () => {
        setModalFormStatus(false)
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

    useEffect(() => {

        api.getAllInfo()
            .then(([postData, userInfoData]) => {
                setCurrentUser(userInfoData);
                setPosts(postData)
            })

    }, [])


    return (
        <PostsContext.Provider value={{currentUser,handleLike:handlePostLike,posts}}>
        <UserContext.Provider value={{currentUser}}>
            <CssBaseline />
            <AppHeader user={currentUser}></AppHeader>
            {/* <Routes>
                <Route path="/" element= {<AppHeader user={currentUser}></AppHeader>}/>
                <Route path='*' element={null} />
            </Routes> */}
            {/* <Modal isOpen={modalFormStatus}onClose={ onCloseModalForm}> */}
                <RegisterForm/>
            {/* </Modal> */}
             
            <Container>
                <Routes>
                    <Route path='/' element={<PostList   onDelete={handlePostDelete} />}/>
                    <Route path='/postPage/:postID' element={<PostPage />}/>
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Container>


            <Footer />
        </UserContext.Provider>
        </PostsContext.Provider>
    );
}
