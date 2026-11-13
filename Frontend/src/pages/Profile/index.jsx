import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
  return <Navigate to="/settings" replace />;
};
