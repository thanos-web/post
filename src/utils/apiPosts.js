import { baseUrl } from "../constants/constants";

// дабавление поста
export const addPost = async (data) => {
    try {
        if (data) {
            await fetch(`${baseUrl}/v2/group-11/posts`, {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }, 
                body: JSON.stringify(data)
            })
        }
    } catch (e) {
        console.error(`Ошибка данных в AddPost ${e.message}`)
    }
}

//добавление навигации по страницам (пагинации)
export const getPostPagination = async (page, limit, query) => {
    try {
        if (page && limit) {
            let response = await fetch(`${baseUrl}/v2/group-11/posts/paginate?page=${page}&limit=${limit}&query=${query}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }, 
            })
            const result = await response.json()
            return result
        } 
        } catch (e) {
            console.error(`Ошибка данных в getPostPagination ${e.message}`)    
        }
    }

// установка и снятие лайка по Id    
export const changeLikePost = async (postId, like) => { 
    try { 
        let response = await fetch(`${baseUrl}/posts/likes/${postId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        const result = await response.json()
        return result 
    } catch (e) { 
        console.error(`Ошибка данных в changeLikePost ${e.message}`)
    }
}

 // получение всех постов
export const getPostList = async () => {
    try { 
        let response = await fetch(`${baseUrl}/v2/group-11/posts`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        const result = await response.json()
        if (result) {
            return result
        } 
    } catch (e) {
        console.error(`Ошибка данных в getPostList ${e.message}`)
    }
}

// получение информации по посту
export const getPostById = async (postId) => {
    try {
        if (postId) {
            let response = await fetch(`${baseUrl}/posts/${postId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },    
        })
        const result = await response.json()
        return result 
        }
    } catch (e) {
        console.error(`Ошибка данных в getPostById ${e.message}`)
    }
}

// добавление комментария
export const addComment = async (data, postId) => {
    try { 
        if (data && postId) {
            let response = await fetch (`${baseUrl}/posts/comments/${postId}`, {
                method: 'POST', 
                headers: { 
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            return result    
        }
    } catch (e) {
        console.error(`Ошибка данных в addComment ${e.message}`)
    }
}

// удаление комментария
export const deleteCommentById = async (postId, commentId) => {
    try {
        if (postId && commentId) {
            let response = await fetch(`${baseUrl}/posts/comments/${postId}/${commentId}`, {
                method: 'DELETE', 
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            const result = await response.json()
            return result
        }
    } catch (e) {
        console.error(`Ошибка данных в deleteCommentById ${e.message}`)
    }
} 
// получение всех комментариев
export const getAllComments = async (postId) => {
    try {
        if (postId) {
            let response = await fetch(`${baseUrl}/posts/comments/${postId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            const result = await response.json()
            return result
        }
    } catch (e) {
        console.error(`Ошибка данных в getAllComments ${e.message}`)
    } 
} 

// удаление поста
export const deletePost = async (postId) => { 
    try { 
        if (postId) {
            await fetch(`${baseUrl}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                   'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}` 
                },    
            })
        }
    } catch (e) {
        console.error(`Ошибка в данных deletePost ${e.message}`)
    }
}
// изменение поста
export const editPost = async (data, postId) => {
    try {
        await fetch(`${baseUrl}/posts/${postId}`, {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(data)    
        })
    } catch (e) {
        console.error(`Ошибка данных в editPost ${e.message}`)
    }
} 
// авторизация на сайте
export async function setAuthData(data) {
    let response = await fetch(`${baseUrl}/signin`, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json',  
        },
        body: JSON.stringify(data)
    });
    let commits = await response.json();
    localStorage.setItem('token', commits.token)
    return commits
}
// получение информации о пользователе по токену в заголовках
export const getUserInfo = async () => { 
    const response = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    const result = await response.json()
    return result
}
// получение информации о пользователе по Id
export const getUserInfoById = async (userId) => { 
    const response = await fetch(`${baseUrl}/users/me/${userId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    const result = await response.json()
    return result
}
// изменение name и about пользователя
export const changeUserInfo = async (data) => {
    const response = await fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result 
}
// изменение иконки(аватара) пользователя 
export const changeUserAvatar = async (data) => {
    const response = await fetch(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(data) 
    })
    const result = await response.json()
    return result
}
// регистрация на сайте
export const getRegistrationUser = async (data) => {
    const response = await fetch (`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data) 
    })
    const result = await response.json()
    return result 
}
// сброс пароля на почту
export const getPasswordUser = async (data) => {
    const response = await fetch (`${baseUrl}/forgot-password`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data) 
    })
    const result = await response.json()
    return result 
}
// смена пароля после подтверждения токеном
export const getPasswordReset = async (token) => {
    const response = await fetch (`${baseUrl}/password-reset/${token}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(token) 
    })
    const result = await response.json()
    return result 
}
