import cn from 'classnames';
import s from './styles.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

function Modal ({children, isOpen, onClose, ...rest}) {

    const renderContent = () => {
        return (
            <div className={cn(s.modal, {[s.active]: isOpen})}  onClick={onClose}>
                <div className={cn(s.modal__content, {[s.active]:isOpen})}>
                    {children}
                </div>
    
            </div>
        );
    }
    return createPortal(renderContent(), document.getElementById('modal-root'));
}
export default Modal;