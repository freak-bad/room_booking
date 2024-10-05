import React, { useState } from "react";
import './BookingForm.css';
import logo from "../assets/logo.png"; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <a href="/" className="home-link">Home</a>
      </nav>
    </header>
  );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    userType: "ordinary",
    idImage: null,
    age: "",
    checkInDate: new Date(),
    checkOutDate: new Date()
  });

  const [showPayment, setShowPayment] = useState(false); // Toggle for payment form

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      idImage: e.target.files[0],
    });
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true); // Show payment form on submit
  };

  const handleRazorpayPayment = () => {
    const options = {
      key: "your_razorpay_key_id", // Replace with your Razorpay key
      amount: 50000, // 500 INR (amount in paise)
      currency: "INR",
      name: "Hotel Booking",
      description: "Room booking transaction",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: {
        color: "#61a7ee",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="bg-overlay"></div> {/* Background Image Overlay */}
      <Header />
      <div className="booking-form">
        {showPayment ? (
          <div className="payment-container">
            <h2>Proceed to Payment</h2>
            <button onClick={handleRazorpayPayment} className="btn-book-now">
              Pay with Razorpay
            </button>
          </div>
        ) : (
          <>
            <h2>Plan Your Stay With Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="date-container">
                <div className="form-group">
                  <label>Check-in Date:</label>
                  <DatePicker
                    selected={formData.checkInDate}
                    onChange={(date) => handleDateChange(date, 'checkInDate')}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="date-picker"
                  />
                </div>
                <div className="form-group">
                  <label>Check-out Date:</label>
                  <DatePicker
                    selected={formData.checkOutDate}
                    onChange={(date) => handleDateChange(date, 'checkOutDate')}
                    dateFormat="dd/MM/yyyy"
                    minDate={formData.checkInDate}
                    className="date-picker"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Type:</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="ordinary">Ordinary</option>
                  <option value="government">Government Official</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Upload {formData.userType === "ordinary" ? "Aadhar/PAN" : "Government ID"}:
                </label>
                <input
                  type="file"
                  name="idImage"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn-book-now">Book Now</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default BookingForm;
