import axios from 'axios';

const BaseUrl = 'http://localhost:8080/api';

// -----------
// AdminBlock
// -----------

// Add a new Employee
export const addEmployee = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/employee`, data);
    return response.data;
  } catch (error) {
    console.error('Add Employee Error', error);
    throw error;
  }
};

// Login an Employee
export const loginEmployee = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/employee/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error in Employee Login", error);
    throw error;
  }
};

// Temporarily Block an Employee
export const tamproryBlockEmployee = async (id, data) => {
  try {
    const response = await axios.patch(`${BaseUrl}/employee/blocked/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in Temporary Block of Employee", error);
    throw error;
  }
};

// ----------
// Food Category
// ----------

// Add a new food category item
export const addFoodCategory = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/food-category/`, data);
    return response.data;
  } catch (error) {
    console.error('Add Food Category Error', error);
    throw error;
  }
};

// Get all food category items
export const getAllFoodCategory = async (data) => {
  try {
    const response = await axios.get(`${BaseUrl}/food-category/`, data);
    return response.data;
  } catch (error) {
    console.error("Error Getting the Food Category: ", error);
    throw error;
  }
};

// Get a single food category item by ID
export const getOneFoodCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/food-category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting food by Id ${id} :`, error);
    throw error;
  }
};

// Update a food category item by ID
export const updateFoodCategoryById = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/food-category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating food category with Id : ${id}`, error);
    throw error;
  }
};

// Delete a food category item by ID
export const deleteFoodCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/food-category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting food category with ID : ${id}`, error);
    throw error;
  }
}

// -----------
// Food | Menu
// -----------

// Add a new Food
export const addFood = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/food`, data);
    return response.data;
  } catch (error) {
    console.error('Add Food Error', error);
    throw error;
  }
};

// Get all food items
export const getAllFood = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/food`);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

// Update a food item by ID
export const updateFoodById = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/food/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating food with ID ${id}:`, error);
    throw error;
  }
};

// Get a single food item by ID
export const getOneFoodById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/food/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting food by ID ${id}:`, error);
    throw error;
  }
};

// Get all discounted food items
export const getAllDescountFood = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/food/discounted/list`);
    return response.data;
  } catch (error) {
    console.error("Error getting the discounted food list", error);
    throw error;
  }
};

// Get relative food items (same type)
export const getRelativeFoods = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/food/relative/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting relative foods', error);
    throw error;
  }
};

// Add a rating to a food item
export const addRatingToFood = async (id, ratingData) => {
  try {
    const response = await axios.post(`${BaseUrl}/food/${id}/ratings`, ratingData);
    return response.data;
  } catch (error) {
    console.error('Error adding rating to food', error);
    throw error;
  }
};

// Get total and average rating of a food item
export const getFoodRatings = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/food/${id}/ratings`);
    return response.data;
  } catch (error) {
    console.error('Error getting ratings of food', error);
    throw error;
  }
};

// -----------
// Table
// -----------

// Add a new table
export const addTable = async (formData) => {
  try {
    const response = await axios.post(`${BaseUrl}/table`, formData);
    return response.data;
  } catch (error) {
    console.error('Add Table error:', error);
    throw error;
  }
};

// -----------
// Reservation
// -----------

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
