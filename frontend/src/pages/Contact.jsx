import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { assets } from "../assets/assets";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleScheduleNow = () => {
    // Navigate to doctors page
    window.location.href = "/doctors";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            CONTACT <span className="text-blue-600">US</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={assets.contact_image}
                alt="Medical Staff"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>

          {/* Contact Info & Form Section */}
          <div className="space-y-8">
            {/* Office Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  OUR OFFICE
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">📍</span>
                  <div>
                    <p className="font-medium text-gray-800">
                      72019 Bhubaneswar
                    </p>
                    <p className="text-gray-600">
                      Near AIIMS,Bhubaneswar,Odisha,India{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📞</span>
                  <div>
                    <p className="text-gray-800">Tel: +91-7033860848</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">✉️</span>
                  <div>
                    <p className="text-gray-800">
                      Email: kumarankit.krish@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Careers Section */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-semibold">CAREERS AT Clinicly</h3>
              </div>
              <p className="text-purple-100 mb-6">
                Learn more about our teams and job openings.
              </p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Contact Details & Quick Info Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Get In <span className="text-blue-600">Touch</span>
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Message 📧
                </button>
              </div>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🕒</span>
                <h4 className="text-lg font-semibold text-gray-800">
                  Office Hours
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🚨</span>
                <h4 className="text-lg font-semibold text-red-800">
                  Emergency
                </h4>
              </div>
              <p className="text-red-700 text-sm mb-3">
                For medical emergencies, please call:
              </p>
              <p className="text-red-800 font-bold text-lg">911</p>
              <p className="text-red-600 text-xs mt-2">
                Or visit your nearest emergency room
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🌐</span>
                <h4 className="text-lg font-semibold">Follow Us</h4>
              </div>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaFacebook size={16} />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaTwitter size={16} />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaInstagram size={16} />
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaLinkedin size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Live Chat */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Live Chat Support</h4>
              <p className="text-green-100 mb-6">
                Get instant help from our support team
              </p>
              <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Chat
              </button>
            </div>
          </div>

          {/* Book Consultation */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Book Consultation</h4>
              <p className="text-orange-100 mb-6">
                Schedule a meeting with our team
              </p>
              <button
                onClick={handleScheduleNow}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Schedule Now
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Find Us On The <span className="text-blue-600">Map</span>
          </h3>
          <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🗺️</span>
              <p className="text-gray-600 font-medium">
                Interactive Map Coming Soon
              </p>
              <p className="text-sm text-gray-500">
                Near AIIMS, Bhubaneswar,Odisha,India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
