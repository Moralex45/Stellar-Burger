import { useEffect, FC  } from 'react';
import { createPortal } from 'react-dom';

import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { TModalProps } from '../../services/types/types';

const root = document.querySelector("#modal") as HTMLElement;

export const Modal: FC<TModalProps> = ({ handleClose = () => {}, children }) => {
  useEffect(() => {
    const escClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener('keyup', escClose);
    
    return () => {
      document.removeEventListener('keyup', escClose);
    }
  }, [handleClose]);
  
  return createPortal (
    <ModalOverlay handleClose={handleClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()} data-testid="modalContainer">
        <button className={style.button} onClick={handleClose} data-testid="modalCloseButton">
          <CloseIcon type="primary" />
        </button>

         {children}
    
      </div>
    </ModalOverlay>, root
  );
}
