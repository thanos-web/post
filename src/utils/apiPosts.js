class Api {
    #baseurl;
    #headers;
    // # - приватное поле используется внутри класса( Свойства класса по умолчанию являются общедоступными и могут быть рассмотрены или изменены вне класса.)
    constructor ({baseUrl, headers, postUrl, registerUrl}) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
    }
    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }
    // получение всех постов
    getPostList() {
        return fetch(`${this.#baseurl}/posts`, {
            headers: this.#headers
        })
        
            .then(this.#onResponse)
    }
    // получение информации о пользователе по токену в заголовках
    getUserInfo() {
        return fetch(`${this.#baseurl}/users/me`, {
            headers: this.#headers
        })
        
            .then(this.#onResponse)
    }
    // получение информации о пользователе по ID
    getAuthorInfo(userId) {
        return fetch(`${this.#baseurl}`)
    }
    // получение информации о постах и пользователе
    getAllInfo() {
        return Promise.all([this.getPostList(), this.getUserInfo()])
    }
    // установка и снятие лайка по Id
    changeLikePost(postId, like) {
        return fetch(`${this.#baseurl}/posts/likes/${postId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers
        })
        
            .then(this.#onResponse)
    }
    // дабавление поста
    addPost(post) {
        return fetch(`${this.#baseurl}/posts`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(post)    
        })
            .then(this.#onResponse)
    }

    // изменение поста
    editPost(postData, postId) {
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            method: "PATCH",
            headers: this.#headers,
            body: JSON.stringify(postData, postId)
        })
            .then(this.#onResponse)
    }

    // строка фильтрации по title для поиска постов
    search(searchQuery) {
        return fetch(`${this.#baseurl}/posts/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    // получение информации по посту
    getPostById(postId) {
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            method: 'GET',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
    // удаление поста
    deletePost(postId) {
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
    // изменение name и about пользователя   
    setUserInfo({ name, about }) {
        return fetch (`${this.#baseurl}/users/me`, {
            method: "PATCH",
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })
            .then(this.#onResponse)
    }
    // добавление комментария
    addComment(postId) {
        return fetch(`$${this.#baseurl}/posts/${postId}`, {
            method: "POST",
            headers: this.#headers, 
            body: JSON.stringify({postId})
        })
            .then(this.#onResponse)
    }  

    // получение всех комментариев
    getComments(post) {
        return fetch (`${this.#baseurl}/posts/comments`, {
            method: "GET",
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    // получене комментария по id-поста
    getCommentsById (postId) {
        return fetch (`${this.#baseurl}/posts/comments/${postId}`, {
            method: "GET",
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
    // удаление комментария по id-поста
    deleteCommentById (postId, commentId) {
        return fetch (`${this.#baseurl}/posts/comments/${postId}/${commentId}`, {
            method: "DELETE",
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
    
    // получение информации по id поста 
    getInfoPost(postId) {
        return Promise.all([this.getPostById(postId), this.getUserInfo()])
    }
    
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.0QftFDpA01h46ffSuPRQO_-1Vx-TngWQK1AK4O80Knc'
    }
})

export default api;
