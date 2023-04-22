import cn from 'classnames';
import s from './styles.module.css';
import { createPortal } from 'react-dom';
import { useContext, useEffect, useRef } from 'react';
import { ModalFormContext } from '../../contexts/header-context';

function Modal ({children, isOpen, onClose, ...rest}) {

    const {ChangeModalFormStatus} = useContext(ModalFormContext)

    const handleCloseModal = () => {
        ChangeModalFormStatus(false)
    }; 


    const renderContent = () => {
        return (
            <div className={cn(s.modal, {[s.active]: isOpen})} onMouseDown={handleCloseModal}>
                <div className={cn(s.modal__content, {[s.active]:isOpen})} onMouseDown={(e) => e.stopPropagation()}>
                    {children}
                </div>
    
            </div>
        );
    }
    return createPortal(renderContent(), document.getElementById('modal-root'));
}
export default Modal;