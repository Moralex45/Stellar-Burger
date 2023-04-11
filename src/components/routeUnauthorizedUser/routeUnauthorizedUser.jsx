import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RouteUnauthorizedUser = ({ element }) => {
  const location = useLocation();
  const profile = useSelector((state) => state.profileReducer.profile);

  if (profile) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  }

  return element;
};

RouteUnauthorizedUser.propTypes = {
  element: PropTypes.element.isRequired
};