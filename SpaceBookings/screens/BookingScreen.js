import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../context/UserContext";

// Generates a unique ID for each booking
const generateId = () => Math.random().toString(36).substr(2, 9);

// Details for each workspace category
const spaceDetails = {
  Desk: { price: "$10/hour", description: "Comfortable desk in open area" },
  "Meeting Room": {
    price: "$25/hour",
    description: "Private room for meetings",
  },
  "Private Office": {
    price: "$40/hour",
    description: "Secluded private office",
  },
};

const BookingScreen = () => {
  const { addBooking } = useContext(UserContext); // Access the addBooking function from context
  const [workspaceName, setWorkspaceName] = useState(""); // State for workspace name
  const [category, setCategory] = useState("Desk"); // State for selected category
  const [notes, setNotes] = useState(""); // State for additional notes
  const [selectedSlot, setSelectedSlot] = useState(null); // State for selected time slot

  // List of available time slots
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // List of already booked time slots
  const bookedSlots = ["10:00", "13:00", "15:00"];

  // State for user's current location
  const [location, setLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Effect to request location permissions and fetch user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation((prev) => ({
        ...prev,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }));
    })();
  }, []);
  const confirmBooking = (paymentMethod) => {
    const newBooking = {
      id: generateId(),
      workspaceName,
      category,
      price: spaceDetails[category].price,
      description: spaceDetails[category].description,
      date: new Date().toISOString().split("T")[0],
      timeSlot: selectedSlot,
      notes,
      paymentMethod, // ✅ Save payment method too
    };

    addBooking(newBooking);

    Alert.alert(
      "Booking Confirmed",
      `${workspaceName} booked at ${selectedSlot}`,
      [
        {
          text: "Add to Google Calendar",
          onPress: () => Alert.alert("Google Calendar", "Booking added (Demo)"),
        },
        { text: "OK" },
      ]
    );

    // Reset fields
    setWorkspaceName("");
    setCategory("Desk");
    setNotes("");
    setSelectedSlot(null);
  };

  // Handles the booking process
  const handleBooking = () => {
    if (!workspaceName || !selectedSlot) {
      Alert.alert("Missing Info", "Please enter all required fields.");
      return;
    }

    // Create a new booking object
    const newBooking = {
      id: generateId(),
      workspaceName,
      category,
      price: spaceDetails[category].price,
      description: spaceDetails[category].description,
      date: new Date().toISOString().split("T")[0],
      timeSlot: selectedSlot,
      notes,
    };

    addBooking(newBooking); // Add the booking to the context

    // Show confirmation alert
    Alert.alert(
      "Booking Confirmed",
      `${workspaceName} booked at ${selectedSlot}`,
      [
        {
          text: "Add to Google Calendar",
          onPress: () => Alert.alert("Google Calendar", "Booking added (Demo)"),
        },
        { text: "OK" },
      ]
    );

    // Reset form fields
    setWorkspaceName("");
    setCategory("Desk");
    setNotes("");
    setSelectedSlot(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Book a Space</Text>

      {/* Map showing user's location */}
      <MapView style={styles.map} region={location} />

      {/* Input for workspace name */}
      <Text style={styles.label}>Workspace Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workspace name"
        value={workspaceName}
        onChangeText={setWorkspaceName}
      />

      {/* Picker for selecting category */}
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Desk" value="Desk" />
        <Picker.Item label="Meeting Room" value="Meeting Room" />
        <Picker.Item label="Private Office" value="Private Office" />
      </Picker>

      {/* Display price and description for the selected category */}
      <View style={styles.detailBox}>
        <Text style={styles.detailText}>
          Price: {spaceDetails[category].price}
        </Text>
        <Text style={styles.detailText}>
          Info: {spaceDetails[category].description}
        </Text>
      </View>

      {/* Input for additional notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Add any additional notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* Section for selecting a time slot */}
      <Text style={styles.sectionTitle}>Select a Time Slot</Text>
      <FlatList
        data={timeSlots}
        renderItem={({ item }) => {
          const isBooked = bookedSlots.includes(item); // Check if the slot is already booked
          const isSelected = selectedSlot === item; // Check if the slot is selected
          return (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                isBooked && styles.bookedSlot,
                isSelected && styles.selectedSlot,
              ]}
              onPress={() => {
                if (isBooked) {
                  Alert.alert("This slot is already booked");
                } else {
                  setSelectedSlot(item);
                }
              }}
              disabled={isBooked} // Disable button if the slot is booked
            >
              <Text
                style={[styles.timeSlotText, isBooked && styles.bookedSlotText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        horizontal
        contentContainerStyle={styles.timeSlotList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Button to confirm booking */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", paddingBottom: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  map: { height: 180, borderRadius: 10, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 5, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  picker: { backgroundColor: "#f9f9f9", borderRadius: 5 },
  detailBox: {
    backgroundColor: "#eef6fd",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailText: { fontSize: 14, color: "#555" },
  notesInput: { height: 80, textAlignVertical: "top", marginTop: 5 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  timeSlotList: { marginBottom: 20 },
  timeSlot: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  bookedSlot: { backgroundColor: "#ccc" },
  selectedSlot: { backgroundColor: "#007bff" },
  timeSlotText: { fontSize: 16, color: "#333" },
  bookedSlotText: { color: "#888", textDecorationLine: "line-through" },
  bookButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default BookingScreen;
