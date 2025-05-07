import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../context/UserContext";

const MyBookingsScreen = () => {
  const { bookings, removeBooking } = useContext(UserContext);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showQR, setShowQR] = useState(false);

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
      <Text style={styles.workspaceName}>{item.spaceName}</Text>
      <Text style={styles.details}>Category: {item.category}</Text>
      <Text style={styles.details}>
        Date: {new Date(item.date).toDateString()}
      </Text>
      <Text style={styles.details}>Time: {item.time}</Text>
      <Text style={styles.details}>Payment: {item.paymentOption}</Text>

      <TouchableOpacity
        style={styles.qrButton}
        onPress={() => {
          setSelectedBooking(item);
          setShowQR(true);
        }}
      >
        <Text style={styles.qrButtonText}>Show QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelBooking(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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

      <Modal visible={showQR} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.qrBox}>
            <Text style={styles.modalTitle}>Check-in QR Code</Text>
            <Image
              source={{
                uri: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DemoBooking",
              }}
              style={styles.qrImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowQR(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  qrButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  qrButtonText: { color: "#fff", fontWeight: "bold" },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { fontSize: 16, color: "#888", textAlign: "center" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  qrBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  qrImage: { width: 200, height: 200 },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});

export default MyBookingsScreen;
