import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <div>
        <p className="pb-3 mt-12 text-zinc-700 font-medium border-b">
          My Appointments
        </p>
        <div>
          {doctors.slice(0, 3).map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img className="w-32 bg-indigo-50" src={item.image} alt="" />
              </div>
              <div className="flex-1 flex-col text-zinc-600 text-sm">
                <p className="text-neutral-600 font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs mt-1">
                  <span className="text-xs text-neutral-700 font-medium">
                    Date and Time:
                  </span>{" "}
                  21, August, 2025 | 10:30 AM
                </p>
              </div>

              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                <button className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded border-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded border-gray-300 hover:bg-red-400 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
