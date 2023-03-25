import React from 'react';
import s from './mainPost.module.css'
function MainPost(props) {
    return (
        <main className={s.mainPost}>
            {props.children}
        </main>



    );
}

export default MainPost;