// import cn from 'classnames';
// import s from './styles.module.css';
// import { createPortal } from 'react-dom';
// import { useEffect, useRef } from 'react';

// function Modal({ children, isOpen, onClose }) {
//     const refModal = useRef(null)

    // function handleClickModal() {
    //     refModal.current.classList.remove(s.modal_active)
    //     setTimeout(onClose, 400)
    // }
    // useEffect(() => {
    //     if (isOpen) {
    //         setTimeout(() => { refModal.current.classList.add(s.modal_active) }, 100)
    //     }
    // }, [isOpen])


//     const renderContent = () => {
//         if (!isOpen) return null
//         return (<div ref={refModal} className={cn(s.modal, { [s.modal_active]: isOpen })} onMouseDown={onClose}>
//             <div className={cn(s.modal__content, { [s.modal__content_active]: isOpen })} onMouseDown={(e) => e.stopPropagation()}>
//                 {children}
//             </div>
//         </div>);
//     }

//     return createPortal(renderContent(), document.getElementById("modal-root"));
// }

// export default Modal;



// import cn from "classnames";
// import { useNavigate } from "react-router";

// import s from "./index.module.css";

// export default function Modal({ active, setActive, children, ...props }) {

//     const navigate = useNavigate();

//     return (
//         <div className={s.modal} onClick={() => {
//             setActive ? setActive(false) : navigate(-1)
//         }}>

//             <div className={cn(s.modal__content, { [s.modal__content_active]: active })} {...props} onClick={(e) => { e.stopPropagation() }}>
//                 {children}
//             </div>

//         </div>
//     )
// }
