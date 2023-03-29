class Api {
    #baseurl;
    #headers;
    // # - приватное поле используется внутри класса( Свойства класса по умолчанию являются общедоступными и могут быть рассмотрены или изменены вне класса.)
    constructor ({baseUrl, headers}) {
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

    changeLikePost(like) {
        return fetch(`${this.#baseurl}/posts/likes/:postId `, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers
        })
        
        .then(this.#onResponse)
    }
}


const api = new Api ({
    baseUrl: `https://api.react-learning.ru/v2/group-11`,
    headers: {
        'content-type': 'application/json',
        authorization:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.dLnPzyvO-rKhvNTi8K5W1YaNR-OpUYKZZ0MCewDMx1Q'
    }

    })


    export default api;