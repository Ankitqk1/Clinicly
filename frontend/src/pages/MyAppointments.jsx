import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { appointmentApi, apiUtils } from "../services/api";

const MyAppointments = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await appointmentApi.getUserAppointments(user.userId);
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(apiUtils.handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentApi.cancelAppointment(appointmentId);
      // Refresh appointments list
      fetchAppointments();
      alert('Appointment cancelled successfully');
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert('Failed to cancel appointment: ' + apiUtils.handleError(err));
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString() + ' | ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="pb-3 mt-12 text-zinc-700 font-medium border-b">
          My Appointments
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchAppointments}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}
        
        <div>
          {appointments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No appointments found.</p>
              <button 
                onClick={() => navigate('/doctors')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            appointments.map((appointment, index) => (
              <div
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
                key={appointment.appointmentId}
              >
                <div>
                  <div className="w-32 h-32 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-lg">
                      {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex-col text-zinc-600 text-sm">
                  <p className="text-neutral-600 font-semibold">{appointment.doctorName}</p>
                  <p className="text-gray-500">Appointment ID: #{appointment.appointmentId}</p>
                  <p className="text-xs mt-1">
                    <span className="text-xs text-neutral-700 font-medium">
                      Date and Time:
                    </span>{" "}
                    {formatDateTime(appointment.appointmentDateTime)}
                  </p>
                  <p className="text-xs mt-1">
                    <span className="text-xs text-neutral-700 font-medium">
                      Status:
                    </span>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'Scheduled' ? 'bg-green-100 text-green-600' :
                      appointment.status === 'Completed' ? 'bg-blue-100 text-blue-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {appointment.status}
                    </span>
                  </p>
                  {appointment.reason && (
                    <p className="text-xs mt-1">
                      <span className="text-xs text-neutral-700 font-medium">Reason:</span> {appointment.reason}
                    </p>
                  )}
                  {appointment.amount && (
                    <p className="text-xs mt-1">
                      <span className="text-xs text-neutral-700 font-medium">Amount:</span> ₹{appointment.amount}
                    </p>
                  )}
                </div>

                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  {appointment.status === 'Scheduled' && (
                    <>
                      <button className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded border-gray-300 hover:bg-primary hover:text-white transition-all duration-300">
                        Pay Online
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment.appointmentId)}
                        className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded border-gray-300 hover:bg-red-400 hover:text-white transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                  {appointment.status === 'Completed' && (
                    <button className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded border-gray-300 hover:bg-blue-400 hover:text-white transition-all duration-300">
                      View Report
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
