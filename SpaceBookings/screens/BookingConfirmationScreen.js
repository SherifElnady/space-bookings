import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

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
      date,
      time,
      paymentOption: selectedOption,
      status: "Confirmed",
    };

    addBooking(booking);

    // ✅ Simulate Google Calendar sync
    Alert.alert("Success", "Booking added to Google Calendar ✅");

    navigation.navigate("MainTabs", { screen: "MyBookings" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          🔔 Note: Full payments are refundable only if cancelled 8+ hours
          before booking time.
        </Text>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
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
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
