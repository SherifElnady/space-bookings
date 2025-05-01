import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Contains user info
  const [bookings, setBookings] = useState([]); // Contains user bookings

  const addBooking = (booking) => {
    setBookings((prevBookings) => [...prevBookings, booking]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, bookings, addBooking }}>
      {children}
    </UserContext.Provider>
  );
};
