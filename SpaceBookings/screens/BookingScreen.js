import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [category, setCategory] = useState("Desk");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleBooking = () => {
    if (!workspaceName || !bookingDate || !startTime || !endTime) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      "Your booking has been successfully made."
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Workspace Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter workspace name"
          value={workspaceName}
          onChangeText={setWorkspaceName}
        />

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

        <Text style={styles.label}>Booking Date</Text>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={bookingDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Start Time</Text>
        <Button
          title="Select Start Time"
          onPress={() => setShowStartTimePicker(true)}
        />
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}

        <Text style={styles.label}>End Time</Text>
        <Button
          title="Select End Time"
          onPress={() => setShowEndTimePicker(true)}
        />
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Add any notes (optional)"
          value={notes}
          onChangeText={setNotes}
        />

        <Text style={styles.label}>Location</Text>
        <MapView
          style={styles.map}
          region={location}
          onPress={(e) =>
            setLocation({
              ...location,
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        >
          <Marker coordinate={location} />
        </MapView>

        <Button title="Confirm Booking" onPress={handleBooking} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
});

export default BookingScreen;
