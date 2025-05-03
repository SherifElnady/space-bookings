import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { generateTimeSlots } from "../utils/timeSlots";
import { UserContext } from "../context/UserContext";

export default function DateTimePickerScreen() {
  const { addBooking, isTimeSlotAvailable } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { space } = route.params;

  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const onBook = () => {
    if (!selectedTime) return alert("Select a time");

    const booking = {
      id: Date.now().toString(),
      workspaceId: space.id,
      workspaceName: space.name,
      category: space.category,
      date: date.toISOString().split("T")[0],
      timeSlot: selectedTime,
    };

    addBooking(booking);
    navigation.navigate("MyBookings");
  };

  const slots = generateTimeSlots();
  const selectedDate = date.toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Date</Text>
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(e, d) => d && setDate(d)}
      />

      <Text style={styles.title}>Choose Time</Text>
      <FlatList
        data={slots}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isAvailable = isTimeSlotAvailable(space.id, selectedDate, item);
          return (
            <TouchableOpacity
              style={[
                styles.slot,
                {
                  backgroundColor: !isAvailable
                    ? "#ccc"
                    : selectedTime === item
                    ? "#4A90E2"
                    : "#eee",
                },
              ]}
              disabled={!isAvailable}
              onPress={() => setSelectedTime(item)}
            >
              <Text style={styles.slotText}>
                {item} {isAvailable ? "" : "(Booked)"}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <Button title="Book" onPress={onBook} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  slot: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  slotText: { fontSize: 16 },
});
