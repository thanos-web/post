import { useState, useEffect } from "react";
import { PostList } from "../../pages/post-page"
import s from "./styles.module.css"
import api from "../../../utils/api"

import PostDetails from "../../postDetails";

const ID_POST = "6425dd77aa39712183a52144";
export const PostPage = () => {

    const [post,setPost] = useState(null);
    const [currentUser,setCurrentUser] = useState(null);
    const [isLoading,setIsLoading] = useState(false)



useEffect(() => {
    setIsLoading(true)
    api.getInfoPost(ID_POST)
    .then(([postData, userData]) => {
        setCurrentUser(userData);
        setPost(postData)
    })
   .catch(() => {
    console.log("Ошибка на стороне сервера")
   })
   .finally(() => {
    setIsLoading(false);
   })
},[])


    return (
        <>
        
            
     <PostDetails {...PostDetails} currentUser={currentUser}/>
        </>
    )
}