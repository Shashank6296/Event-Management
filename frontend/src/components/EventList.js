import React from 'react';
import axios from 'axios';

const EventList = ({ events, setEvents }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dashboard.render.com/web/srv-cu4b89dds78s739qs2sg/deploys/dep-cu4b89lds78s739qs2vg/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = async (id) => {
    const eventToEdit = events.find((event) => event._id === id);
    const updatedName = prompt('Edit Event Name:', eventToEdit.name);
    const updatedLocation = prompt('Edit Event Location:', eventToEdit.location);
    const updatedDescription = prompt('Edit Event Description:', eventToEdit.description);

    if (updatedName || updatedLocation || updatedDescription) {
      try {
        const updatedEvent = {
          ...eventToEdit,
          name: updatedName || eventToEdit.name,
          location: updatedLocation || eventToEdit.location,
          description: updatedDescription || eventToEdit.description,
        };

        const response = await axios.put(`https://dashboard.render.com/web/srv-cu4b89dds78s739qs2sg/deploys/dep-cu4b89lds78s739qs2vg/${id}`, updatedEvent);
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === id ? response.data : event))
        );
      } catch (error) {
        console.error('Error editing event:', error);
      }
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No events available</p>
      ) : (
        <div className="row g-3">
          {events.map((event) => (
            <div className="col-12 col-md-6 col-lg-3" key={event._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text text-truncate">
                    <strong>Description:</strong> {event.description || 'No description'}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {event.category}
                  </p>
                  {event.reminder && (
                    <p className="card-text">
                      <strong>Reminder:</strong> {new Date(event.reminder).toLocaleString()}
                    </p>
                  )}
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
