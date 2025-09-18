import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, apiUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Error parsing user data:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'patient') => {
    try {
      setLoading(true);
      setError(null);
      
      const loginMethod = userType === 'doctor' ? authApi.loginDoctor : authApi.loginPatient;
      const response = await loginMethod({ email, password });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData, userType = 'patient') => {
    try {
      setLoading(true);
      setError(null);
      
      const registerMethod = userType === 'doctor' ? authApi.registerDoctor : authApi.registerPatient;
      const response = await registerMethod(userData);
      
      const newUserData = response.data;
      setUser(newUserData);
      localStorage.setItem('authToken', newUserData.token);
      localStorage.setItem('userData', JSON.stringify(newUserData));
      
      return { success: true, data: newUserData };
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
    isDoctor: user?.userType === 'Doctor',
    isPatient: user?.userType === 'Patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
