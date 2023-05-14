import { Container } from "@mui/system";
import AppHeader from '../app-header/appHeader';
import Footer from "../footer/footer";
import { PostList } from "../postList/postList";
import { PostDetails } from '../postDetails/postDetails';
import { UserNotFound } from '../userNotFound/index';
import { MyPostList } from '../myPostList/myPostList';
import { Limit } from "../../constants/constants";
import MainList from '../mainList/index';
import ElementPagination from '../pagination/pagination';
import { useState, useEffect, useCallback, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { getPostPagination, changeLikePost } from "../../utils/apiPosts";
import { NotFoundPage } from "../../pages/notFoundPage";
import { PostEdit } from "../postEdit/postEdit";
import { useDebounce } from '../../hooks/useDebounce';

// Подключение приложения
export const LocalStorageContext = createContext({token: '', setToken: () => void 0})

function AppPost() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState('')
    const [isCardsUpdate, setCardsUpdate] = useState(false)
    const [userInfoData, setUserInfoData] = useState('')
    const [page, setPage] = useState(1)
    const [pageQaunt, setPageQuant] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const debounceSearchQuery = useDebounce(searchQuery, 500)
    const [myPosts, setMyPosts] = useState([])
    
    useEffect(() => {
        if (token) {
            const getPaginationData = async () => {
                const answer = await getPostPagination(page, Limit, debounceSearchQuery)
                setPageQuant(parseInt(Math.ceil(answer?.total / Limit)))
                setPosts(answer?.posts)
                if (answer?.postLength === 0) {
                    setPage(1)
                }
            }
            void getPaginationData()
        }
    }, [token, isCardsUpdate, debounceSearchQuery, page])

    const handleFirstRender = () => {
        setCardsUpdate(!isCardsUpdate)
    }

    const handleLikeChange = useCallback(async (post) => {
        const like = post?.likes?.some((id) => id === userInfoData?._id)
        const likePost = await changeLikePost(post._id, like)
        const newPosts = posts.map(post => post._id === likePost._id ? likePost : post)
        setPosts(newPosts)
    }, [posts, userInfoData._id])

    const handleSetPostLike = useCallback(async (post) => {
        const isLike = post.likes.includes(userInfoData._id)
        const likedPost = await changeLikePost(post._id, isLike)
        const newPosts = myPosts.map(post => post._id === likedPost._id ? likedPost : post)
        setMyPosts(newPosts)
    }, [myPosts, userInfoData._id])
    
    return (
        <LocalStorageContext.Provider value={{
            token,
            setToken,
            message,
            setMessage,
            handleFirstRender,
            userInfoData,
            setUserInfoData,
            page,
            setPage,
            pageQaunt,
            searchQuery,
            setSearchQuery,
            handleLikeChange,
            myPosts,
            setMyPosts,
            handleSetPostLike
        }}>

            <AppHeader/>
            <MainList>
            <Container sx={{mt: '1rem', mb: '1rem'}}>
                <Routes>
                    <Route path='/' element={
                        <>
                           {(token &&
                            <>
                                <PostList posts={posts}/>
                                <ElementPagination/>

                            </>) || <UserNotFound/>} 
                        </>
                    }/>
                    <Route path={'post/:id'} element={<PostDetails posts={posts}/>}/>
                    <Route path={'mypostlist'} element={
                        <>
                            <MyPostList/>
                        </>    
                    }/>
                    <Route path={'post/:id/edit'} element={<PostEdit/>}/>
                    <Route path={'*'} element={<NotFoundPage />}/>
                </Routes>
            </Container>
            </MainList>
            <Footer />
        </LocalStorageContext.Provider>
    );
}

export default AppPost;