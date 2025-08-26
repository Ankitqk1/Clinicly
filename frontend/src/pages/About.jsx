import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleBookAppointment = () => {
    navigate("/doctors"); // Navigate to appointment page
    // OR navigate to doctors list first: navigate('/doctors');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ABOUT <span className="text-blue-600">US</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={assets.about_image} // ADD YOUR IMAGE PATH HERE
                alt="Doctors"
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome To Clinicly
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Welcome To Clinicly, Your Trusted Partner In Managing Your
                Healthcare Needs Conveniently And Efficiently. At Clinicly, We
                Understand The Challenges Individuals Face When It Comes To
                Scheduling Doctor Appointments And Managing Their Health
                Records.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Clinicly Is Committed To Excellence In Healthcare Technology. We
                Continuously Strive To Enhance Our Platform, Integrating The
                Latest Advancements To Improve User Experience And Deliver
                Superior Service. Whether You're Booking Your First Appointment
                Or Managing Ongoing Care, Clinicly Is Here To Support You Every
                Step Of The Way.
              </p>
            </div>

            {/* Our Vision Section */}
            <div className="bg-gradient-to-br from-red-300 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  👁️
                </span>
                Our Vision
              </h3>
              <p className="leading-relaxed">
                Our Vision At Clinicly Is To Create A Seamless Healthcare
                Experience For Every User. We Aim To Bridge The Gap Between
                Patients And Healthcare Providers, Making It Easier For You To
                Access The Care You Need, When You Need It
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              WHY <span className="text-blue-600">CHOOSE US</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Efficiency Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                EFFICIENCY:
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined Appointment Scheduling That Fits Into Your Busy
                Lifestyle.
              </p>
              <div className="mt-4 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Convenience Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                CONVENIENCE:
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access To A Network Of Trusted Healthcare Professionals In Your
                Area.
              </p>
              <div className="mt-4 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Personalization Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                PERSONALIZATION:
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored Recommendations And Reminders To Help You Stay On Top
                Of Your Health.
              </p>
              <div className="mt-4 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-white/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Experience The Future Of{" "}
                <span className="text-blue-600">Healthcare</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    24/7 Online Appointment Booking
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Secure Health Record Management
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Real-time Doctor Availability
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Smart Health Reminders</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Ready to Get Started?
                  </h4>
                  <p className="text-blue-100 mb-6">
                    Join thousands of satisfied users who trust Clinicly for
                    their healthcare needs.
                  </p>
                  <button
                    onClick={handleBookAppointment}
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
