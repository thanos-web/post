import React from 'react';
import s from './style.module.css'

function MainList(props) {
    return (
        <main className={s.mainList}>
            {props.children}
        </main>
    );
}

export default MainList;