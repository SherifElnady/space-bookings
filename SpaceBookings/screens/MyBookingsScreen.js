import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../context/UserContext"; // Access shared context

const MyBookingsScreen = () => {
  const { bookings, removeBooking } = useContext(UserContext); // Get bookings and remove function

  const handleCancelBooking = (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => removeBooking(id) },
      ]
    );
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.workspaceName}>{item.workspaceName}</Text>
      <Text style={styles.details}>Category: {item.category}</Text>
      <Text style={styles.details}>Date: {item.date}</Text>
      <Text style={styles.details}>Time Slot: {item.timeSlot}</Text>
      {item.notes ? (
        <Text style={styles.details}>Notes: {item.notes}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelBooking(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            You have no bookings yet. Book your space now!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  list: { paddingBottom: 20 },
  bookingItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  workspaceName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  details: { fontSize: 14, color: "#555", marginBottom: 3 },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: { color: "#fff", fontWeight: "bold" },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { fontSize: 16, color: "#888", textAlign: "center" },
});

export default MyBookingsScreen;
