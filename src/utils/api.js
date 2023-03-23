class Api {
    #baseUrl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostList(), this.getUserInfo()])        
    }

    getPostList() {
        return fetch(`${this.#baseUrl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch (`${this.#baseUrl}/posts/search/?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    setUserInfo({ name, about }) {
        return fetch(` ${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })

            .then(this.#onResponse)
    }

    changeLikeProductStatus(postID, like) {
        return fetch(`${this.#baseUrl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)    
    }

    getPostById (idPost) {
        return fetch(`${this.#baseUrl}/posts/${idPost}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(idPost) {
        return Promise.all([this.getPostById(idPost), this.getUserInfo()])
    }

}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru/',
    headers: {
        'content-Type': 'application/json',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.0QftFDpA01h46ffSuPRQO_-1Vx-TngWQK1AK4O80Knc'  
    },
      groupId: '/v2/group-11'
  });

export default api; 











