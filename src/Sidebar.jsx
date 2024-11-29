import React, { useState } from 'react';
import { createEventsServicePlugin } from '@schedule-x/events-service'
const eventsServicePlugin = createEventsServicePlugin();
const Sidebar = ({ addEvent, modifyEvent, events}) => {
  const [eventData, setEventData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    description: '' 
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setEventData({
      ...eventData,
      [name]: value,
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    const newEvent = {
      ...eventData,        
      id: Math.floor(Math.random() * 1000000), 
    };
    addEvent(newEvent)
    alert('Event Added')
    console.log(newEvent);

    setEventData({
      id: '',
      title: '',
      start: '',
      end: '',
      description: '',
      date: '',
    });
  
    setShowAddForm(false);  
  }
  
  const handleClear = () => {
    setEventData({
      id: '',
      title: '',
      start: '',
      end: '',
      description: '' 
    })
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const [showModifyForm, setShowModifyForm] = useState(false);
  
  const handleAddNew = () =>{
    setShowModifyForm(false)
    setShowAddForm(true);
    
  }
  const handleModifyEvent = (id) => {
    setShowAddForm(false);
    setShowModifyForm(true);
  };
  

  const handleModifySubmit = (e) => {
    e.preventDefault();
  
    const updatedEvent = {
      ...eventData, // Retain the id and modify the rest of the data
    };
    modifyEvent(updatedEvent)
  
    alert('Event Updated');
    console.log(updatedEvent);
    setShowModifyForm(false);
    handleClear();
  };
  
  

  
  return (
    <div className="sidebar"> 
      <button type="button" onClick={handleAddNew}>Add New Event</button>
      <button type="button" onClick={handleModifyEvent}>Modify Event</button>
      <button type="button">Delete Event</button>
      <br />
      <br />

      {showAddForm && (
  <form className={showAddForm ? '' : 'hidden'}>
    <div>
      <h1>Add New Event</h1>
      <label htmlFor="title">Title: </label>
      <input 
        type="text" 
        name="title" 
        id="title" 
        value={eventData.title} 
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label htmlFor="description">Description: </label>
      <input 
        type="text" 
        name="description" 
        id="description" 
        value={eventData.description} 
        onChange={handleInputChange}
      />
       <br />
       <br />
      <label htmlFor="start">Start (YYYY-MM-DD HH:MM): </label>
      <input 
        type="text" 
        name="start" 
        id="start" 
        value={eventData.start} 
        onChange={handleInputChange} 
      />
       <br />
       <br />
      <label htmlFor="end">End (YYYY-MM-DD HH:MM): </label>
      <input 
        type="text" 
        name="end" 
        id="end" 
        value={eventData.end} 
        onChange={handleInputChange}
      />
       <br />
       <br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </div>
  </form>
)}


{showModifyForm && (
  <form className={showModifyForm ? '' : 'hidden'}>
    <div>
      <h1>Modify Event</h1>
    <label htmlFor="id">Event ID: </label>
      <input type="text" id="id" value={eventData.id} name="id" placeholder='012412412' required onChange={handleInputChange}/>
      <br />
      <br /> 
      <label htmlFor="title">Title: </label>
      <input 
        type="text" 
        name="title" 
        id="title" 
        value={eventData.title} 
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label htmlFor="description">Description: </label>
      <input 
        type="text" 
        name="description" 
        id="description" 
        value={eventData.description} 
        onChange={handleInputChange}
      />
       <br />
       <br />
      <label htmlFor="start">Start (YYYY-MM-DD HH:MM): </label>
      <input 
        type="text" 
        name="start" 
        id="start" 
        value={eventData.start} 
        onChange={handleInputChange} 
      />
       <br />
       <br />
      <label htmlFor="end">End (YYYY-MM-DD HH:MM): </label>
      <input 
        type="text" 
        name="end" 
        id="end" 
        value={eventData.end} 
        onChange={handleInputChange}
      />
       <br />
       <br />
      <button type="button" onClick={handleModifySubmit}>Submit</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </div>
  </form>
)}

    </div>
  );
};

export default Sidebar;
