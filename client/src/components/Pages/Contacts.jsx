import React, { useRef, useState } from 'react';
import { createReservation } from '../../Apis/Apis';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const shops = [
  { id: 1, name: "Kuchaman" },
  { id: 2, name: "Makarana" },
  { id: 3, name: "Borawar" },
  { id: 4, name: "Sabalpur" },
  { id: 5, name: "Didwana" }
];

const menualContacts = [
  {
    shopId: 1,
    address: "Kuchaman Address, Raj 10160, Indian",
    phone: "+1910-000-1111",
    email: "kuchaman@koppee.com",
  },
  {
    shopId: 2,
    address: "Makarana Address, Raj 10161, India",
    phone: "+1910-000-2222",
    email: "makarana@koppee.com",
  },
  {
    shopId: 3,
    address: "Borawar Address, Raj 10162, India",
    phone: "+1910-000-3333",
    email: "borawar@koppee.com",
  },
  {
    shopId: 4,
    address: "Sabalpur Address, Raj 10163, India",
    phone: "+1910-000-4444",
    email: "sabalpur@koppee.com",
  },
  {
    shopId: 5,
    address: "Didwana Address, Raj 10164, India",
    phone: "+1910-000-5555",
    email: "didwana@koppee.com",
  },
];

// Main Component
export default function Contacts() {
  const textareaRef = useRef(null);
  const [selectedShopId, setSelectedShopId] = useState(1); // default selection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    person: '',
    date: '',
    time: '',
    message: '',
  });

  const handleChange = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = wordCount > 50;

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.date || !formData.time) {
        alert("Please fill in all required fields.");
        return;
      }

      await createReservation(formData);
      alert("Reservation Successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        person: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error("Reservation submission failed", error);
      alert("Failed to submit reservation. Try again.")
    }
  }

  const selectedContact = menualContacts.find(c => c.shopId === selectedShopId);

  return (
    <div className='Contact'>
      <div className='contact-container'>

        {/* Top Section */}
        <div className='contact-top-box'>
          <h2 className='contact-heading'>
            Contact Us
            <div className='heading-under-line'></div>
          </h2>
          <h5>HOW TO GET IN TOUCH?</h5>
          <p>This section only proves that you are approachable and ready to accept reviews and prior bookings. People love to be associated with businesses that are friendly and communicate well. Encourage them to get in touch with you.</p>
        </div>

        {/* Bottom Section */}
        <div className='contact-bottom-box'>

          {/* Left Column */}
          <div className='bottom-left'>

            <div className="control-btns">
              {shops.map((item) => (
                <div
                  key={item.id}
                  className={`control-btn ${selectedShopId === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedShopId(item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>

            <div className='manual-contacts-container'>
              <div>
                <h4>ADDRESS</h4>
                <p>{selectedContact?.address}</p>
              </div>
              <div>
                <h4>PHONE NUMBER</h4>
                <p>{selectedContact?.phone}</p>
              </div>
              <div>
                <h4>EMAIL ADDRESS</h4>
                <p>{selectedContact?.email}</p>
              </div>
            </div>

            <div className='social-media-btns-group'>
              <div className='social-media-btn'><FaYoutube /></div>
              <div className='social-media-btn'><FaInstagram /></div>
              <div className='social-media-btn'><FaFacebook /></div>
              <div className='social-media-btn'><FaWhatsapp /></div>
            </div>
          </div>

          {/* Right Column - Reservation */}
          <div className='bottom-right'>
            <div className='form'>
              <div className='input-group'>
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <input
                    type="phone"
                    name="phone"
                    placeholder='Phone'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <select
                    name="person"
                    value={formData.person}
                    onChange={handleChange}
                  >
                    <option value="Person">Person</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>

              <div className='input-group'>
                <div className="input-box">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="Time">Time</option>
                    <option value="09:00">09:00</option>
                  </select>
                </div>
              </div>

              <div className='message-container'>
                <div className='message-box'>
                  <textarea
                    ref={textareaRef}
                    name="message"
                    placeholder='Message'
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <p style={{ color: isOverLimit ? 'red' : 'white' }}>
                  {isOverLimit
                    ? 'You have exceeded the 50 word limit!'
                    : 'Write Your Message in 50 words only...'}
                </p>
              </div>

              <div
                className="btn orange-btn"
                onClick={handleSubmit}
              >
                BOOK A TABLE
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
