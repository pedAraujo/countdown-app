import React, { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const updateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    };

    const deleteEvent = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
        );
    };

    return (
        <EventContext.Provider
            value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);
