import { baseURL } from "../constants/constants";

const token = localStorage.getItem("token")

export const addPost = async (data) => {
    let response = await fetch(`${baseURL}/v2/group-11/posts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return response
}

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
    baseUrl: 'https://api.react-learning.ru/v2/group-10/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    }
}

class PostsApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._header = headers;
    }

    getAllPosts() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: this._header
        }).then(onResponse)
    }
}

const apiPosts = new PostsApi(config)

export default apiPosts;






