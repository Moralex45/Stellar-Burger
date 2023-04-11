import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';

const root = document.querySelector("#modal");

export const Modal = ({ handleClose, children }) => {
  const navigate = useNavigate();

  const closePopup = () => {
    navigate(-1);
    handleClose();
  };
  
  useEffect(() => {
    const escClose = (e) => {
       if (e.key === "Escape") {
         handleClose();
         navigate(-1);
       }
    };
    document.addEventListener('keyup', escClose);
    
    return () => {
      document.removeEventListener('keyup', escClose);
    }
  }, [handleClose, navigate]);
  
  return createPortal (
    <ModalOverlay handleClose={closePopup}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.button} onClick={closePopup} >
          <CloseIcon type="primary" />
        </button>

         {children}
    
      </div>
    </ModalOverlay>, root
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}