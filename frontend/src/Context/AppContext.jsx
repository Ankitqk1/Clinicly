import React, { createContext, useState, useEffect } from "react";
import { doctorApi, apiUtils } from "../services/api";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currencySymbol = "₹";

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await doctorApi.getAllDoctors();
      setDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(apiUtils.handleError(err));
      // Fallback to static data if API fails
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors by speciality
  const fetchDoctorsBySpeciality = async (speciality) => {
    try {
      setLoading(true);
      setError(null);
      const response = await doctorApi.getDoctorsBySpeciality(speciality);
      return response.data;
    } catch (err) {
      console.error('Error fetching doctors by speciality:', err);
      setError(apiUtils.handleError(err));
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get specific doctor
  const getDoctor = async (doctorId) => {
    try {
      const response = await doctorApi.getDoctor(doctorId);
      return response.data;
    } catch (err) {
      console.error('Error fetching doctor:', err);
      throw new Error(apiUtils.handleError(err));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    loading,
    error,
    currencySymbol,
    fetchDoctors,
    fetchDoctorsBySpeciality,
    getDoctor,
    refreshDoctors: fetchDoctors
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
