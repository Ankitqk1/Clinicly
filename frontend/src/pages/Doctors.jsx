import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors, loading, error, fetchDoctorsBySpeciality } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctors(
        doctors.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);
  return (
    <div>
      <p className="text-gray-600">Browse through the specialist doctors.</p>
      <div className="flex flex-col items-start gap-4 mt-5 sm:flex-row  ">
        <div className="flex flex-col gap-4 text-sm text-gray-600 ">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "General physician" ? "bg-red-100 text-black" : ""
            }
              
            `}
          >
            {" "}
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "Gynecologist" ? "bg-red-100 text-black" : ""
            } 
            `}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "Dermatologist" ? "bg-red-100 text-black" : ""
            }
              
            `}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "Pediatricians" ? "bg-red-100 text-black" : ""
            }
              
            `}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "Neurologist" ? "bg-red-100 text-black" : ""
            }
              
            `}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded cursor-pointer  transition-all duration-300 hover:bg-red-100 ${
              speciality === "Gastroenterologist" ? "bg-red-100 text-black" : ""
            }
              
            `}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No doctors found for this speciality.</p>
            </div>
          ) : (
            filteredDoctors.map((item, index) => (
              <div
                onClick={() => navigate(`/appointments/${item._id}`)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
