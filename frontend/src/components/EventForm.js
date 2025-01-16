import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ setEvents, eventToEdit, setEventToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    reminder: '',
  });

  
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        name: eventToEdit.name,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        description: eventToEdit.description,
        category: eventToEdit.category,
        reminder: eventToEdit.reminder,
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setReminderNotification = () => {
    if (formData.reminder) {
      const reminderDate = new Date(formData.reminder);  
      const now = new Date();

      
      if (reminderDate > now) {
        const timeDifference = reminderDate - now;  

        setTimeout(() => {
          new Notification('Event Reminder', {
            body: `Reminder for event: ${formData.name} at ${formData.time}`,
          });
        }, timeDifference);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setReminderNotification();

    try {
      if (eventToEdit) {
        
        const response = await axios.put(`http://localhost:5000/api/events/${eventToEdit._id}`, formData);
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventToEdit._id ? response.data : event))
        );
      } else {
        
        const response = await axios.post('http://localhost:5000/api/events', formData);
        setEvents((prevEvents) => [...prevEvents, response.data]);
      }

      
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: '',
        reminder: '',
      });
      setEventToEdit(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="container-fluid px-3 my-4">
      {/* <h1 className="text-center mb-4">{eventToEdit ? 'Edit Event' : 'Create Event'}</h1> */}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Birthday">Birthday</option>
            {/* Add other categories as needed */}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="time" className="form-label">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="location" className="form-label">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">Event Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="col-md-6">
          <label htmlFor="reminder" className="form-label">Reminder</label>
          <input
            type="datetime-local"
            id="reminder"
            name="reminder"
            className="form-control"
            value={formData.reminder}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">{eventToEdit ? 'Update Event' : 'Add Event'}</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
