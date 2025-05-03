// ✅ Step 1: Create a new file
// File: utils/timeSlots.js

export function generateTimeSlots() {
  const startHour = 8;
  const endHour = 20;
  const slots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const start = `${hour}:00`;
    const end = `${hour + 1}:00`;
    slots.push(`${start} - ${end}`);
  }

  return slots;
}
