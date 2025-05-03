// utils/timeSlots.js

export const generateTimeSlots = () => {
  const startHour = 9;
  const endHour = 18;
  const interval = 60; // in minutes

  const slots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push(`${start} - ${end}`);
  }

  return slots;
};
