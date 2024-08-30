import React, { useState } from 'react';
import {FaPaypal, FaCreditCard } from 'react-icons/fa';
import { IoIosPaw } from "react-icons/io";
import Swal from 'sweetalert2';
import './DonationPage.css';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleDonation = () => {
    if (!amount || !selectedPaymentMethod) {
      Swal.fire({
        title: 'Incomplete Information',
        text: 'Please enter an amount and select a payment method.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      title: 'Thank You!',
      text: `Your donation of $${amount} via ${selectedPaymentMethod} is greatly appreciated!`,
      icon: 'success',
      confirmButtonText: 'Continue',
    }).then(() => {
      setAmount('');
      setSelectedPaymentMethod('');
    });
  };

  return (
    <div className="donationContainer">
      <div className="donationHeader">
      <IoIosPaw className="Icon"/>
        <h1 className="donationTitle">Support Our Pet Adoption Center</h1>
        <p className="donationSubtitle">
          Your generosity helps us care for and find loving homes for our furry friends.
        </p>
      </div>
      <div className="donationForm">
        <h2 className="formTitle">Make a Donation</h2>
        <input
          type="number"
          className="donationInput"
          placeholder="Enter amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="paymentMethods">
          <h3 className="paymentTitle">Choose Payment Method</h3>
          <div className="paymentOptions">
            <label className={`paymentOption ${selectedPaymentMethod === 'PayPal' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="PayPal"
                onChange={() => setSelectedPaymentMethod('PayPal')}
              />
              <FaPaypal className="paymentIcon" /> UPI
            </label>
            <label className={`paymentOption ${selectedPaymentMethod === 'Credit Card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                onChange={() => setSelectedPaymentMethod('Credit Card')}
              />
              <FaCreditCard className="paymentIcon" /> Net Banking
            </label>
          </div>
        </div>
        <button onClick={handleDonation} className="donateButton">Donate Now</button>
      </div>
      <div className="thankYouMessage">
        <p>Thank you for making a difference in the lives of our pets!</p>
      </div>
    </div>
  );
};

export default DonationPage;
