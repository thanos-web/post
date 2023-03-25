import { Container } from "@mui/system";
import { createContext, useCallback, useEffect, useState } from "react";
import MainList from "./сomponents/mainPost/mainPost";
import MainHead from "./сomponents/mainPost/mainHead/mainHead";
import AppHeader from "./сomponents/app-header/appHeader";
import Footer from "./сomponents/footer/footer";
import PaginationElement from "./сomponents/mainPost/pagination/pagination";
import { CardNotAuth } from "./сomponents/mainPost/postList/cardNotAuth/cardNotAuth";
import { PostList } from "./сomponents/mainPost/postList/postList";
import apiPosts from "./utils/apiPost";
import {AppBar} from "@mui/material";
// Инизиализация приложения 

export const LocalStorageContext = createContext({ token: '', setToken: () => void 0 })

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [cards, setCards] = useState([]);
    const [message, setMessage] = useState('')
    const [isUpdateCards, setUpdateCards] = useState(false)
    const [userInfData, setUserInfData] = useState('')

    useEffect(() => {
        apiPosts.getAllPosts()
            .then((dataPosts) => {
                setCards(dataPosts)
            })
    }, [isUpdateCards, token])

    const handleFirstRender = useCallback(() => setUpdateCards(!isUpdateCards), [isUpdateCards])

    return (
        <LocalStorageContext.Provider value={{ token, setToken, message, setMessage, handleFirstRender, userInfData, setUserInfData }}>
            <AppHeader/>
            <AppBar/>
            <MainList>
                <Container
                    sx={{ mt: '1rem', mb: '1rem' }}>
                    <MainHead />
                    {(token && <PostList cards={cards} />) || <CardNotAuth />}
                    <PaginationElement />
                </Container>
            </MainList>
            <Footer />
        </LocalStorageContext.Provider >
    );
}

export default App;