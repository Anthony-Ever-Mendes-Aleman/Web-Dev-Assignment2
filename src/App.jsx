import { useState, useEffect } from 'react';
import './App.css';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import Sidebar from './Sidebar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
const eventsServicePlugin = createEventsServicePlugin();

function App() {
  
  const [events, setEvents] = useState([]);
  const addEvent = (newEvent) => {
    setEvents(prevEvents => {
      eventsServicePlugin.set([...prevEvents, newEvent]); // Updates the calendar with the new event
      return [...prevEvents, newEvent];  // Also update local state for consistency
    });
    console.log("Event Added: ", newEvent);
  };
  

  const modifyEvent = (updatedEvent) => {
    setEvents(prevEvents => {
      const eventId = String(updatedEvent.id);  // Ensure id is a string
      const updatedEvents = {
        ...prevEvents,
        [eventId]: updatedEvent // Use stringified id as the key
      };
  
      eventsServicePlugin.update(updatedEvents);
      return updatedEvents;
    });
  };
  
  

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [createEventModalPlugin(), createDragAndDropPlugin(), eventsServicePlugin],
  });

  return (
    <div className="App">
      <div className="calendar-container">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <Sidebar addEvent={addEvent} modifyEvent={modifyEvent} events={events}/>
    </div>
  );
}
export default App;
