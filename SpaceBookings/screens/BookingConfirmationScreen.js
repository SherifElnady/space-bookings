import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function BookingConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { space, date, time } = route.params;
  const { addBooking } = useContext(UserContext);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleConfirm = () => {
    if (!selectedOption) {
      Alert.alert("Select Payment", "Please choose a payment option.");
      return;
    }

    const booking = {
      id: Date.now().toString(),
      spaceId: space.id,
      spaceName: space.name,
      location: space.location,
      category: space.category,
      date: date,
      time,
      paymentOption: selectedOption,
      status: "Confirmed",
    };

    addBooking(booking);
    Alert.alert("Booking Confirmed", "Your booking has been saved.");
    navigation.navigate("MainTabs", { screen: "MyBookings" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Your Booking</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Workspace:</Text>
        <Text style={styles.value}>{space.name}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{space.location}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(date).toDateString()}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>£100</Text>

        <Text style={styles.label}>Deposit:</Text>
        <Text style={styles.value}>£20 (non-refundable)</Text>

        <Text style={styles.label}>Choose Payment Option:</Text>
        {["Pay Deposit", "Pay in Full"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={{
                color: selectedOption === option ? "#fff" : "#333",
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.note}>
        🔔 Note: Full payments are refundable only if cancelled 8+ hours before
        booking time.
      </Text>

      <Image
        source={{
          uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BookingConfirmed",
        }}
        style={styles.qr}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { marginBottom: 6, color: "#333" },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginTop: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#007BFF",
  },
  note: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  qr: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
