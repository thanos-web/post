const onResponce = (res)=> {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}
class PostsApi {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = `Bearer ${token}`;
    }

    // получение всех постов
    getAllPosts() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // получение информации о пользователе по токену в заголовках
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // получение информации о пользователе по ID
    getAuthorInfo(userId){
        return fetch(`${this._baseUrl}/users/${userId}`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // изменение name и about
    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    // изменение avatar 
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    // установка и снятие лайка по id
    changeLikeStatus(postId, isLike){
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // удаление поста по id
    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // получить информацию по посту
    getPost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "GET",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
        }).then(onResponce)
    }
    
    // создание поста
    addPost(post){
        return fetch(`${this._url}/posts`,{
            method: "POST",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }).then(onResponce)
    }

   
    // изменение поста
    editPost(postId, data) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    } 
    
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.0QftFDpA01h46ffSuPRQO_-1Vx-TngWQK1AK4O80Knc'
}

const apiPosts = new PostsApi(config)

export default apiPosts;


 

