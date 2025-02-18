import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../features/session/sessionSlice';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn === undefined) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
