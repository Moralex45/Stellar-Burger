import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import style from "./modal.module.css";

export const Modal = ({onClick, children, modalHeader}) => {
    const closeOnEscape = (e) => {
        if (e.key === "Escape") {
            onClick();
        }
    };

    const closeOnOverlay = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClick();
        }
    };

    React.useEffect(() => {
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
                    <h2 className="text text_type_main-large">{modalHeader}</h2>
                    <CloseIcon type="primary"
                               onClick={onClick}/>
                </div>
                {children}
            </div>
            <ModalOverlay/>
        </>, 
        document.getElementById('modal-windows'))
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    modalHeader: PropTypes.string.isRequired
}
