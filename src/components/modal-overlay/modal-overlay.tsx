import { FC } from 'react';

import style from './modal-overlay.module.css';
import { TModalProps } from '../../services/types/types';


export const ModalOverlay: FC<TModalProps> = ({ handleClose = () => {}, children }) => {
  return (
    <div className={style.overlay} onClick={handleClose}>
      {children}
    </div>
  );
};
