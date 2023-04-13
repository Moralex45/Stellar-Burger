import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RouteUnauthorizedUser = ({ element, reset = false  }) => {

  const location = useLocation();
  const profile = useSelector((state) => state.profileReducer.profile);
  const resetPasswordAnswer = useSelector((state) => state.profileReducer.resetPasswordAnswer);

  if (!resetPasswordAnswer && reset) {
    return <Navigate to='/forgot-password' />
  }
  
  if (profile) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  }

  return element;
};

RouteUnauthorizedUser.propTypes = {
  element: PropTypes.element.isRequired,
  reset: PropTypes.bool
};