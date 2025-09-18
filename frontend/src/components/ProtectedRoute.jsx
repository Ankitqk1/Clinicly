import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, requireAuth = true }) => {
  const { isAuthenticated, isDoctor, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific role is required
  if (requiredRole === 'doctor' && !isDoctor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. This page is only accessible to doctors.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (requiredRole === 'patient' && isDoctor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          This page is only accessible to patients.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
