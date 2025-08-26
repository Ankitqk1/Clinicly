import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt=40 text-sm">
        {/* -------------1st Section------------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full sm:w-2/3 text-gray-600 leading-6">
            At Clinicly, we care about your well-being. Our platform is designed
            to connect you with trusted doctors and make healthcare simple,
            reliable, and stress-free.
          </p>
        </div>

        {/* -------------2nd Section------------- */}
        <div>
          <p className="text-xl mb-5 font-medium">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* -------------3rd Section------------- */}
        <div>
          <p className="text-xl mb-5 font-medium">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-7033860848</li>
            <li>kumarankit.krish@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-gray-600 py-5">
          © 2025 Clinicly. All rights reserved. Made with ❤️ by {"Ankit Kumar "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
