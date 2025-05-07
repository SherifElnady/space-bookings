import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

const generateTimeSlots = () => {
  const slots = [];
  const start = 8; // 8 AM
  const end = 20; // 8 PM
  for (let i = start; i < end; i++) {
    slots.push(`${i}:00`);
    slots.push(`${i}:30`);
  }
  return slots;
};

export default function DateTimePickerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { space } = route.params;
  const { bookings } = useContext(UserContext);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = generateTimeSlots();

  const bookedTimes = bookings
    .filter(
      (b) =>
        b.spaceId === space.id &&
        new Date(b.date).toDateString() === date.toDateString()
    )
    .map((b) => b.time);

  const handleNext = () => {
    if (!selectedTime) return;
    navigation.navigate("BookingConfirmation", {
      space,
      date,
      time: selectedTime,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a Date and Time</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.subtitle}>Available Time Slots</Text>
      <View style={styles.slotContainer}>
        {timeSlots.map((slot, index) => {
          const isBooked = bookedTimes.includes(slot);
          return (
            <TouchableOpacity
              key={index}
              disabled={isBooked}
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.selectedSlot,
                isBooked && styles.bookedSlot,
              ]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text
                style={{
                  color: isBooked
                    ? "#999"
                    : selectedTime === slot
                    ? "#fff"
                    : "#000",
                }}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.bookButton, !selectedTime && { opacity: 0.5 }]}
        disabled={!selectedTime}
        onPress={handleNext}
      >
        <Text style={styles.bookButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "600", marginVertical: 12 },
  dateButton: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: { fontSize: 16 },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  timeSlot: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    minWidth: 70,
    alignItems: "center",
  },
  selectedSlot: { backgroundColor: "#007BFF" },
  bookedSlot: { backgroundColor: "#ddd" },
  bookButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: { color: "#fff", fontWeight: "bold" },
});
