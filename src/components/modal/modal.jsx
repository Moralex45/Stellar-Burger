import { useEffect } from 'react';
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import style from "./modal.module.css";

export const Modal = ({ handleClose, children }) => {

    const closeOnEscape = (e) => {

        if (e.key === "Escape") {
            handleClose();
        }
    };

    const closeOnOverlay = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeOnEscape)
        document.addEventListener('click', closeOnOverlay)
        
        return () => {
            document.removeEventListener('keydown', closeOnEscape)
            document.removeEventListener('click', closeOnOverlay)
        }
    }, []);

    return createPortal(
        <>
            <div className={style.modal_header}>
                <div className={`${style.ingredient_details_header} mt-10 ml-10 mr-10`}>
                    <button className={style.button} onClick={handleClose} >
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
            <ModalOverlay/>
        </>, 
        document.getElementById('modal-windows'))
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}