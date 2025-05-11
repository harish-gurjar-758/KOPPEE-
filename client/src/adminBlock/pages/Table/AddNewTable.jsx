import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTable } from '../../../Apis/Apis';
import { MdDeleteForever } from "react-icons/md";

export default function AddNewTable() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tableNumber: '',
    seats: '',
    isAvailable: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert isAvailable from string to boolean
    const processedValue = name === 'isAvailable'
      ? value === 'true'
      : value;

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async () => {
    try {
      const { tableNumber, seats, isAvailable } = formData;

      if (!tableNumber || !seats || !isAvailable === '') {
        alert("Please fill in all required fields.");
        return;
      }

      const payload = {
        tableNumber,
        seats: parseInt(seats),
        isAvailable
      };

      await addTable(payload);

      alert("Successfully added a new Table!");
      setFormData({ tableNumber: '', seats: '', isAvailable: '' });

      navigate('/coffee-shop/admin-block/?section=dashboard');

    } catch (error) {
      console.error("Add Table submission failed", error);
      alert("Failed to add a table. Try again.");
    }
  };

  return (
    <div className='AddNewTable'>
      <div className='admin-header'>
        <h2>Add A New Table</h2>
        <div
          className="btn btn-discard"
          onClick={() => navigate('/coffee-shop/admin-block/?section=reservation')}
        >
          <MdDeleteForever /> Discard
        </div>
      </div>

      <div className='form'>
        <div className='input-group'>
          <div className="input-box">
            <input
              type="text"
              name="tableNumber"
              placeholder="Table Number"
              value={formData.tableNumber}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <select
              name="isAvailable"
              value={formData.isAvailable}
              onChange={handleChange}
            >
              <option value="">Select availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div className="input-box">
            <select
              name="seats"
              value={formData.seats}
              onChange={handleChange}
            >
              <option value="">Seats</option>
              {[1, 2, 3, 4, 6, 8, 10].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="btn btn-add"
          onClick={handleSubmit}
        >
          Reserve A Table
        </div>
      </div>
    </div>
  );
}
