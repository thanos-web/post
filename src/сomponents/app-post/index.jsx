import { useState, useEffect } from 'react';
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header';
import {Footer}  from "../footer";
import {PostList} from "../postList"
import { postData } from '../../postData';
import api from '../../utils/api';
import { isLiked } from '../../utils/posts';
import { useDebounce } from '../../hooks/useDebounce';

export function AppPost() {

    const [postsNew, setPostsNew] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const debounceSearchQuery = useDebounce(searchQuery, 300);

    function handleRequest() {
        api.search(debounceSearchQuery)
          .then((dataSearch) => {
            setPostsNew(dataSearch);
          })
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }

    function handleInputChange(dataInput) {
        setSearchQuery(dataInput);
    }

    function handleUpdateUser(dataUserUpdate) {
        api.setUserInfo(dataUserUpdate)
          .then((updateUserFromServer) => {
            setCurrentUser(updateUserFromServer)
          })
    }

    // function handlePostLike(post) {
    //     const like = isLiked(post.likes, currentUser._id)
    //     api.changeLikePostStatus(post._id, like)
    //       .then(updateCard) => {
    //         const newPosts = cards.map(cardState => {
    //             return cardState._id === updateCard._id ? updateCard : cardState
    //         })    
    //       }
    // }




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