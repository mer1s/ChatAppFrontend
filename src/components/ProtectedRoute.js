import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ linkToNavigate }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        user ? <Outlet /> : <Navigate to={linkToNavigate} />
    );
};

export default ProtectedRoute;