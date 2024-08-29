import React, { useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ContactUs.css';

const ContactUs = () => {
  const formRef = useRef(null); // Create a ref for the form

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Display SweetAlert2 notification
    Swal.fire({
      title: 'Submitted!',
      text: 'Your message has been sent successfully.',
      icon: 'success',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'OK'
    }).then(() => {
      // Clear the form fields after the alert is confirmed
      if (formRef.current) {
        formRef.current.reset();
      }
    });
  };

  return (
    <div className="container">
      <section className="section">
        <div className="addressContainer">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1430267446765!2d-122.41941868468142!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cc9e4c0f1%3A0x6db9a52ed1f22715!2s1600%20California%20St%2C%20San%20Francisco%2C%20CA%2094131%2C%20USA!5e0!3m2!1sen!2sin!4v1603188100434!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="contactInfo">
            <h3 className="contactTitle">Company Details</h3>
<<<<<<< HEAD
            <p><FaMapMarkerAlt /> California</p>
            <p><FaPhone /> +1 9876543210</p>
            <p><FaEnvelope /> pawfect@gmail.com</p>
=======
            <p><FaMapMarkerAlt /> lorem ipsum</p>
            <p><FaPhone /> +91 9876543210</p>
            <p><FaEnvelope /> contact@company.com</p>
>>>>>>> 58efdabb15f517ec7dd0964f075b88ec020dd029
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2 className="sectionTitle">Contact Info</h2>
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
          <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" className="input" required />
          </div>
          <div className="formGroup">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Your Phone Number" className="input" required />
          </div>
          <div className="formGroup">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Your Address" className="input" required />
          </div>
          <div className="formGroup">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your Message" className="textarea" required></textarea>
          </div>
          <button type="submit" className="button">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
