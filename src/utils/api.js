class Api {
    #baseurl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()])
    }

    addPost({ title, text, image, tags }) {
        return fetch(`${this.#baseurl}/posts`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({ title, text, image, tags })
        })
            .then(this.#onResponse)
    }

    getPostsList() {
        return fetch(`${this.#baseurl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    

    deletePost(postID) {
        return fetch(`${this.#baseurl}/posts/${postID}`, {
            method: 'DELETE',
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

    setUserInfo({ name, about }) {
        return fetch(`${this.#baseurl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })
            .then(this.#onResponse)
    }

    changeLikePostStatus(postID, like) {
        return fetch(`${this.#baseurl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }

    getPostById(postID) {
        return fetch(`${this.#baseurl}/posts/${postID}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(postID) {
        return Promise.all([this.getPostById(postID), this.getUserInfo()])
    }

    

}


const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZjgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ4LCJleHAiOjE3MTAzMzg0NDh9.SQ41rVA-tNlJDWNM09uxVSZczBn7rdJRoNJiAqztvDg'
    }
})


export default api;
