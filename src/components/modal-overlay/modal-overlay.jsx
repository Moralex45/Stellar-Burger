import React from 'react';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css';


export const ModalOverlay = ({ handleClose, children }) => {
  return (
    <div className={style.overlay} onClick={handleClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}