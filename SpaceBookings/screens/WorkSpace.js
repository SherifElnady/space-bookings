import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function WorkSpace() {
  const navigation = useNavigation();
  const route = useRoute();
  const { space } = route.params;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: space.image }} style={styles.headerImage} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.locationText}>Inside {space.location}</Text>
        <Text style={styles.priceText}>Best Price</Text>
        <Text style={styles.titleText}>{space.name}</Text>
        <Text style={styles.closedText}>Today - Open</Text>

        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Ionicons
              key={index}
              name="star"
              size={16}
              color={index < Math.floor(space.rating) ? "gold" : "#ccc"}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.discountBox}>
          <Text style={styles.discountText}>
            Save when booking this listing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewingBox}>
          <Text style={styles.viewingText}>
            For monthly and annual bookings, request a workspace viewing
          </Text>
        </TouchableOpacity>

        {/* About */}
        <View style={{ marginTop: 16 }}>
          <Text style={styles.aboutTitle}>About the listing</Text>
          <Text style={styles.addressText}>
            22 Example Street, {space.location}. Shared workspace.
          </Text>
          <Text style={styles.distanceText}>1.2 KM away</Text>
        </View>

        <View style={styles.seatsRow}>
          <Ionicons name="person" size={20} color="gray" />
          <Text style={styles.seatsText}>20 Seats</Text>
        </View>

        {/* Amenities */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.amenitiesTitle}>Amenities</Text>

          <View style={styles.amenityRow}>
            <MaterialIcons name="print" size={20} color="gray" />
            <Text>Printer, Scanner, Photocopier</Text>
          </View>
          <View style={styles.amenityRow}>
            <Ionicons name="wifi" size={20} color="gray" />
            <Text>Wifi</Text>
          </View>
          <View style={styles.amenityRow}>
            <Entypo name="aircraft" size={20} color="gray" />
            <Text>Metro / Bus Access</Text>
          </View>
          <View style={styles.amenityRow}>
            <Ionicons name="people" size={20} color="gray" />
            <Text>Meeting room access</Text>
          </View>
          <View style={styles.amenityRow}>
            <MaterialIcons name="kitchen" size={20} color="gray" />
            <Text>Pantry</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.viewAllLink}>View all amenities (19)</Text>
          </TouchableOpacity>
        </View>

        {/* Availability Info */}
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Availability Today:
          </Text>
          <Text style={{ color: "#4caf50", marginTop: 4 }}>
            9 time slots available
          </Text>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={{ color: "#666" }}>[Google Map Placeholder]</Text>
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>94.6 USD/Month</Text>
        <TouchableOpacity
          style={styles.selectDateButton}
          onPress={() => navigation.navigate("DateTimePicker", { space })}
        >
          <Text style={styles.selectDateText}>Select Date</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: { position: "relative" },
  headerImage: { width: "100%", height: 250 },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 8,
  },
  contentContainer: { padding: 16 },
  locationText: { fontSize: 16, color: "#888" },
  priceText: { color: "green", fontWeight: "600" },
  titleText: { fontSize: 24, fontWeight: "bold", marginVertical: 6 },
  closedText: { color: "gray" },
  discountBox: {
    backgroundColor: "#ffe0b2",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  discountText: { color: "#e65100" },
  viewingBox: {
    backgroundColor: "#bbdefb",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  viewingText: { color: "#0d47a1" },
  aboutTitle: { fontSize: 18, fontWeight: "600" },
  addressText: { color: "#444", marginTop: 4 },
  distanceText: { color: "gray", marginTop: 2 },
  seatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  seatsText: { color: "#555" },
  amenitiesTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  viewAllLink: { color: "#1976d2", marginTop: 10 },
  mapContainer: {
    marginTop: 24,
    height: 150,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  bottomPrice: { color: "#007BFF", fontSize: 18, fontWeight: "bold" },
  selectDateButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectDateText: { color: "#fff", fontWeight: "600" },
});
