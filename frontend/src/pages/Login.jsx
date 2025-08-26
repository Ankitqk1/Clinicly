import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Login Form */}
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>
            <p className="text-gray-600">
              Please {state === "Sign Up" ? "sign up" : "login"} to book
              appointment
            </p>
          </div>

          <div className="space-y-6">
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

            <button
              type="button"
              onClick={onSubmitHandler}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
