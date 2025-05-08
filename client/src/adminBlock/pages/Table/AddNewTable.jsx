import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTable } from '../../../Apis/Apis';
import { MdDeleteForever } from "react-icons/md";

export default function AddNewTable() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tableNumber: '',
    seats: '',
    isAvailable: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async () => {
    try {
      if (!formData.tableNumber || !formData.seats || !formData.isAvailable) {
        alert("Plase fill in all required fields.");
        return;
      };

      await addTable(formData);

      alert("Successfully add a new Table !");
      setFormData({
        tableNumber: '',
        seats: '',
        isAvailable: ''
      });

      navigate('/coffee-shop/admin-block/?section=dashboard');

    } catch (error) {
      console.error("Add Table submission failed", error);
      alert("Faild to submit add a table. Try again.");
    }
  };

  return (
    <div className='AddNewTable'>
      <div className='admin-header'>
        <h2>Add A new Table</h2>
        <div
          className="btn btn-discard"
          onClick={() => navigate('/coffee-shop/admin-block/?section=reservation')}
        >
          <MdDeleteForever /> Discard
        </div>
      </div>

      <div>
        <div className='form'>
          <div className='input-group'>
            <div className="input-box">
              <input
                type="text"
                name="tableNumber"
                placeholder='Table Number'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <select
                name="isAvailable"
                placeholder='Table Available'
                value={formData.isAvailable}
                onChange={handleChange}
              >
                <option value="">Select is Available or not </option>
                <option value={true}>is Available</option>
                <option value={false}>not Available</option>
              </select>
            </div>

            <div className="input-box">
              <select
                name="seats"
                value={formData.seats}
                onChange={handleChange}
              >
                <option value="">Seats</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
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
    </div>
  )
}
