import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear tokens and redirect for authenticated routes, not login attempts
      const isLoginAttempt = error.config?.url?.includes('/auth/login') || 
                            error.config?.url?.includes('/auth/doctor/login') ||
                            error.config?.url?.includes('/auth/register') ||
                            error.config?.url?.includes('/auth/doctor/register');
      
      if (!isLoginAttempt) {
        // Clear auth token and redirect to login only for authenticated routes
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Doctor API calls
export const doctorApi = {
  // Get all doctors
  getAllDoctors: () => api.get('/doctors'),
  
  // Get doctors by speciality
  getDoctorsBySpeciality: (speciality) => api.get(`/doctors?speciality=${encodeURIComponent(speciality)}`),
  
  // Get specific doctor
  getDoctor: (id) => api.get(`/doctors/${id}`),
  
  // Create new doctor
  createDoctor: (doctorData) => api.post('/doctors', doctorData),
  
  // Update doctor
  updateDoctor: (id, doctorData) => api.put(`/doctors/${id}`, doctorData),
  
  // Delete doctor
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
};

// Authentication API calls
export const authApi = {
  // Patient registration
  registerPatient: (userData) => api.post('/auth/register', userData),
  
  // Patient login
  loginPatient: (credentials) => api.post('/auth/login', credentials),
  
  // Doctor registration
  registerDoctor: (doctorData) => api.post('/auth/doctor/register', doctorData),
  
  // Doctor login
  loginDoctor: (credentials) => api.post('/auth/doctor/login', credentials),
};

// Appointment API calls
export const appointmentApi = {
  // Get all appointments
  getAllAppointments: () => api.get('/appointments'),
  
  // Get user appointments
  getUserAppointments: (userId) => api.get(`/appointments/user/${userId}`),
  
  // Get doctor appointments
  getDoctorAppointments: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  
  // Get specific appointment
  getAppointment: (id) => api.get(`/appointments/${id}`),
  
  // Book new appointment
  bookAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  
  // Update appointment
  updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  
  // Cancel appointment
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
};

// User API calls
export const userApi = {
  // Get user profile
  getUserProfile: (id) => api.get(`/users/${id}`),
  
  // Update user profile
  updateUserProfile: (id, userData) => api.put(`/users/${id}`, userData),
};

// Utility functions
export const apiUtils = {
  // Check if API is available
  healthCheck: () => api.get('/doctors').then(() => true).catch(() => false),
  
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || error.response.statusText || 'Server error';
    } else if (error.request) {
      // Network error
      return 'Network error. Please check your connection.';
    } else {
      // Other error
      return error.message || 'An unexpected error occurred';
    }
  },
};

export default api;
