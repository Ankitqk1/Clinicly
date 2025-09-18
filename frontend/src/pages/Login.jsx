import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const [userType, setUserType] = useState("patient"); // patient or doctor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, error, clearError } = useAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    clearError();

    try {
      if (state === "Sign Up") {
        // Register new user
        const result = await register({
          name,
          email,
          password
        });
        
        if (result.success) {
          navigate('/');
        }
      } else {
        // Login existing user (patient or doctor)
        const result = await login(email, password, userType);
        
        if (result.success) {
          // Navigate based on user type
          if (userType === 'doctor') {
            navigate('/doctor-dashboard');
          } else {
            navigate('/');
          }
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Login Form */}
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {state === "Sign Up" ? "Create Account" : "Login"}
              {state === "Login" && (
                <span className={`ml-2 text-lg font-medium ${
                  userType === 'doctor' ? 'text-green-600' : 'text-indigo-600'
                }`}>
                  - {userType === 'doctor' ? 'Doctor' : 'Patient'}
                </span>
              )}
            </h2>
            <p className="text-gray-600">
              Please {state === "Sign Up" ? "sign up" : "login"} to {state === "Login" && userType === 'doctor' ? 'manage appointments' : 'book appointment'}
            </p>
          </div>

          <div className="space-y-6">
            {/* User Type Selector - Only show for Login */}
            {state === "Login" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('patient')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      userType === 'patient' 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Patient</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('doctor')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      userType === 'doctor' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Doctor</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={onSubmitHandler}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium focus:ring-2 transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed focus:ring-gray-400' 
                  : userType === 'doctor' 
                    ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
              } focus:ring-offset-2`}
            >
              {loading ? 'Processing...' : (state === "Sign Up" ? "Create Account" : `Login as ${userType === 'doctor' ? 'Doctor' : 'Patient'}`)}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {state === "Sign Up"
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() =>
                    setState(state === "Sign Up" ? "Login" : "Sign Up")
                  }
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {state === "Sign Up" ? "Login here" : "Sign up here"}
                </button>
              </p>
            </div>
            <div>
              <p>
                Want to register as a Doctor?{" "}
                <button
                  onClick={() => navigate("/doctor-register")}
                  className="text-blue-500 underline"
                >
                  Apply as Doctor
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
