import axios from 'axios';

const BaseUrl = 'http://localhost:8080/api';

// -----------
// Table
// ----------

// Add a new table
export const addTable = async (formData) => {
  try {
    const response = await axios.post('/api/table', formData);
    return response.data; // Handle response
  } catch (error) {
    console.error('Add Table error:', error);
    throw error; // Re-throw the error for handling in the calling component
  }
};


// ---------
//  Reservation a Table 
// ----------

// Create a new reservation
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${BaseUrl}/reservation`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

// Get all reservations
export const getAllReservations = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/reservation`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

// Delete a reservation by ID
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/reservation/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting reservation with ID ${id}:`, error);
    throw error;
  }
};
