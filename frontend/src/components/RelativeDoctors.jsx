import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RelativeDoctors = ({ speciality, docid }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docid
      );
      setRelDoc(doctorsData);
    }
  }, [speciality, doctors, docid]);

  return (
    <div>
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
        <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
        <p className="text-center text-sm sm:w-1/3">
          Simply browse through our extensive list of trusted doctors
        </p>
        <div className="w-full grid grid-cols-auto gap-6 pt-5 gap-y-6 px-3 sm:px-0">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointments/${item._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="border border-blue-200 rounded-x1 overflow-hidden transition-all duration-500 cursor-pointer hover:translate-y-[-10px]"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-600 text-center">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-200 text-gray-800 px-12 py-3 rounded-full mt:10 hover:scale-105 transition-all duration-300"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default RelativeDoctors;
