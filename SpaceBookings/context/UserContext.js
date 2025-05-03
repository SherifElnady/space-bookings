import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info
  const [bookings, setBookings] = useState([]); // User bookings
  const [ownedSpaces, setOwnedSpaces] = useState([]); // Admin-owned coworking spaces

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addOwnedSpace = (space) => {
    setOwnedSpaces((prev) => [...prev, space]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        bookings,
        addBooking,
        removeBooking,
        ownedSpaces,
        addOwnedSpace,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
