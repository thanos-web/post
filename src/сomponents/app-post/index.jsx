import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { AppHeader } from '../app-header/appHeader';
import Footer from "../footer/footer";
import { PostList } from "../postList/postList"
import { About } from "../about/about";
import api from '../../utils/apiPosts.js';
import SearchInfo from '../search/search';
import { useCallback, useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";
import { UserContext } from "../../contexts/currentUserContext";
import { PostsContext } from "../../contexts/postsContext";
import { useDebounce } from '../../hooks/useDebounce';
import { ThemeContext, themes } from "../../contexts/themeContext";

export function AppPost () {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [theme, setTheme] = useState(themes.light)
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery, 200); 

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        
        return api.changeLikePost(post._id, like)
        .then ((updatePost) => {
            const newPost = posts.map(postState => {
            return postState._id === updatePost._id ? updatePost : postState
            })

            setPosts(newPost)
        })
    }

    function handleUpdateUser(dataUserUpdate) {
        api.setUserInfo(dataUserUpdate)
          .then((updateUserFromServer) => {
            setCurrentUser(updateUserFromServer)
          })
    }

    function handlePostDelete(post) {
        return api.deletePost(post._id)
            .then((updatePost) => {
                const newPosts = posts.filter(post => {
                    return post._id !== updatePost._id;
                })
                setPosts(newPosts)

            })
    }

    // const handleRequest = useCallback(() => {
    //     setIsLoading(true);
    //     api.search(searchQuery)
    //       .then((searchResult) => {
    //         setPosts(searchResult)
    //       })
    //       .catch(err => console.log(err))
    //       .finally(() => {
    //         setIsLoading(false);
    //       })
    // }, [searchQuery])

    // const handleFormSubmit = (inputText) => {
    //     navigate('/');
    //     setSearchQuery(inputText);
    //     handleRequest();
    // }

    useEffect(() => {
        setIsLoading(true)
        api.getAllInfo()
          .then(([postData, userInfoData]) => {
            setCurrentUser(userInfoData);
            setPosts(postData.post);
            })
            .catch(err => console.log(err))
            .finally(() => { setIsLoading(false) })

    }, [])
    
    function toggleTheme() {
        theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
      }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> 
          <PostsContext.Provider value={{ posts, handleLike: handlePostLike }}>
            <UserContext.Provider value={{ currentUser, onUpdateUser: handleUpdateUser }}>   
            <CssBaseline />
            <AppHeader user={currentUser}></AppHeader>
            <Container>
                <About />
                <PostList posts={posts} onPostLike={handlePostLike} currentUser={currentUser} onDelete={handlePostDelete} isLoading={isLoading}/>
            </Container>
              <SearchInfo searchText={searchQuery} />
            <Footer />
            </UserContext.Provider>
          </PostsContext.Provider>
        </ThemeContext.Provider>
    );
}