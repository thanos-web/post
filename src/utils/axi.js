// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const Axi = axios.create({
//     baseUrl: 'https://api.react-learning.ru/',
//     headers: {
//         authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.0QftFDpA01h46ffSuPRQO_-1Vx-TngWQK1AK4O80Knc',     
//         "content-type": "application/json",  
//     },
//       groupId: '/v2/group-11'
//   });



//   const [postsNew, setPostsNew] = useState([]);
//   const [query, setQuery] = useState('России');
//   const [page, setPage] = useState(1);
//   const [pageQty, setPageQty] = useState(0);

//   useEffect(() => {
//       Axi.get (baseUrl + `query=${query}&page=${page-1}`).then (
//         ({data})=> console.log(data)
//       )
//     }, [query, page]);
//   return (