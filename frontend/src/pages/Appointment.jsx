import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { assets } from "../assets/assets";
import RelativeDoctors from "../components/RelativeDoctors";
import { appointmentApi, apiUtils } from "../services/api";

const Appointment = () => {
  const { docid } = useParams();
  const { getDoctor, currencySymbol } = useContext(AppContext);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const doctor = await getDoctor(docid);
      setDocInfo(doctor);
      console.log("Doctor Info:", doctor);
    } catch (err) {
      console.error("Error fetching doctor:", err);
      setError("Failed to load doctor information");
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      //setting hours
      if (today.getDate === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10); // 10 AM
        currentDate;
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docid]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!isAuthenticated) {
      alert("Please login to book an appointment");
      navigate("/login");
      return;
    }

    if (!slotTime || !docSlots[slotIndex]) {
      alert("Please select a time slot");
      return;
    }

    try {
      setBookingLoading(true);

      // Find the selected slot datetime
      const selectedSlot = docSlots[slotIndex].find(
        (slot) => slot.time === slotTime
      );

      const appointmentData = {
        userId: user.userId,
        doctorId: docid,
        appointmentDateTime: selectedSlot.datetime.toISOString(),
        reason: "General consultation",
      };

      const response = await appointmentApi.bookAppointment(appointmentData);

      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      alert("Failed to book appointment: " + errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };


  useEffect(() => {
    console.log("Available Slots:", docSlots);
  }, [docSlots]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/doctors")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  return (
    docInfo && (
      <div>
        {/* -----------------Doc Details------------------------ */}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div>
            <img
              className="bg-red-300 w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg  flex flex-col gap-3 p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/*------------------ Doc-Info--------------------- */}
            <p className=" flex text-2xl font-medium text-gray-900 items-center gap-2">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div>
              <p className=" flex text-gray-600 text-sm items-center gap-2 mt-1">
                {docInfo.degree} - {docInfo.speciality}
                <button className="py-0.5 px-2 border text-xs rounded-full border-gray-300 text-gray-600">
                  {docInfo.experience}
                </button>
              </p>
            </div>
            <div>
              <p className="flex text-gray-600 text-sm items-center gap-1 mt-3 font-medium">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 text-medium mt-3">
              Appointment fee:{" "}
              <span className="text-gray-600 font-medium">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* -----------------Book Slots------------------------ */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Book Slots</p>
          <div className="flex gap-3 mt-3 items-center overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer flex-shrink-0 ${
                    slotIndex === index
                      ? "bg-red-400 text-white"
                      : "border border-gray-400"
                  } `}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
        </div>

        {/* -----------------Time Slots - ATTRACTIVE SCROLLABLE SECTION------------------------ */}
        {/* -----------------Time Slots - CLEAN & ATTRACTIVE------------------------ */}
        <div className="sm:ml-72 sm:pl-4 mt-6">
          <div className="relative">
            {/* Subtle Scroll Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div
              style={{
                width: "100%",
                maxWidth: "650px",
                overflowX: "scroll",
                overflowY: "hidden",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div
                className="flex gap-4 items-center py-2"
                style={{
                  width: "max-content",
                  cursor: "grab",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.cursor = "grabbing";
                  const container = e.currentTarget.parentElement;
                  let isDown = true;
                  let startX = e.pageX - container.offsetLeft;
                  let scrollLeft = container.scrollLeft;

                  const handleMouseMove = (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2;
                    container.scrollLeft = scrollLeft - walk;
                  };

                  const handleMouseUp = () => {
                    isDown = false;
                    e.currentTarget.style.cursor = "grab";
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              >
                {docSlots.length > 0 &&
                  docSlots[slotIndex] &&
                  docSlots[slotIndex].map((item, index) => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlotTime(item.time);
                      }}
                      className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-200 border-2 ${
                        item.time === slotTime
                          ? "bg-red-500 text-white border-red-500 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50 shadow-sm"
                      }`}
                      key={index}
                      style={{
                        minWidth: "100px",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.time.toLowerCase()}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-1">
            <button 
              onClick={bookAppointment}
              disabled={bookingLoading || !slotTime}
              className={`text-sm font-medium px-14 py-3 rounded-full mt-6 transition-all duration-300 ${
                bookingLoading || !slotTime 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-red-400 text-white hover:scale-105 hover:bg-red-500'
              }`}
            >
              {bookingLoading ? 'Booking...' : 'Book an Appointment'}
            </button>
          </div>
        </div>
        <RelativeDoctors docId={docid} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
