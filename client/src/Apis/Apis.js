import axios from 'axios';

const BaseUrl = 'http://localhost:8080/api/reservation';

// Create a new reservation
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${BaseUrl}/`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

// Get all reservations
export const getAllReservations = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

// Delete a reservation by ID
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting reservation with ID ${id}:`, error);
    throw error;
  }
};
