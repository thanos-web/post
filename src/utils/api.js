class Api {
    #baseurl;
    #headers;
    // # - приватное поле используется внутри класса( Свойства класса по умолчанию являются общедоступными и могут быть рассмотрены или изменены вне класса.)
    constructor({ baseUrl, headers }) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
    }
    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getPostList() {
        return fetch(`${this.#baseurl}/posts`, {
            headers: this.#headers
        })

            .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseurl}/users/me`, {
            headers: this.#headers
        })

            .then(this.#onResponse)
    }

    getAllInfo() {
        return Promise.all([this.getPostList(), this.getUserInfo()])
    }

    changeLikePost(postId, like) {
        return fetch(`${this.#baseurl}/posts/likes/${postId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers
        })

            .then(this.#onResponse)
    }

    deletePost(postId) {
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getPostById(postId){
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(postId) {
        return Promise.all([this.getPostById(postId), this.getUserInfo()])
    }

    addNewPost(data){
        return fetch(`${this.#baseurl}/posts`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data),
        }).then(this.#onResponse);
    }  
    
    editPostbyId(postId, data){
        return fetch(`${this.#baseurl}/posts/${postId}`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data),
        }).then(this.#onResponse);
    } 
    createPostComment(postId, data) {
        return fetch(`${this.#baseurl}/posts/comments/${postId}`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    deletePostComment(postId, commentId) {
        return fetch(`${this.#baseurl}/posts/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru/v2/group-11',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.0QftFDpA01h46ffSuPRQO_-1Vx-TngWQK1AK4O80Knc'
    }
})


export default api;
