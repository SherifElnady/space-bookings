import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const featuredSpaces = [
    {
      id: "1",
      name: "Downtown Desk",
      category: "Desk",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1581092917349-7c74c3d6f351",
    },
    {
      id: "2",
      name: "Ocean View Meeting",
      category: "Meeting Room",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    },
    {
      id: "3",
      name: "Startup Hub Office",
      category: "Private Office",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    },
  ];

  const announcements = [
    "Get 20% off on your first booking!",
    "New coworking spaces added in your area.",
    "Book a meeting room and get free coffee!",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroBanner}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.firstName} {user?.lastName}!
        </Text>
        <Text style={styles.subText}>
          Find your perfect coworking space today.
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.actionText}>Book a Space</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MyBookings")}
          >
            <Text style={styles.actionText}>My Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Spaces */}
      <View style={styles.featuredSpaces}>
        <Text style={styles.sectionTitle}>Featured Spaces</Text>
        <FlatList
          data={featuredSpaces}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.spaceCard}>
              <Image source={{ uri: item.image }} style={styles.spaceImage} />
              <Text style={styles.spaceName}>{item.name}</Text>
              <Text style={styles.spaceCategory}>{item.category}</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FontAwesome
                    key={index}
                    name="star"
                    size={16}
                    color={index < Math.floor(item.rating) ? "gold" : "#ccc"}
                  />
                ))}
              </View>
            </View>
          )}
        />
      </View>

      {/* Announcements */}
      <View style={styles.announcements}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <FlatList
          data={announcements}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.announcementCard}>
              <Text style={styles.announcementText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  heroBanner: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: { fontSize: 16, color: "#fff", marginTop: 5 },
  quickActions: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  actionText: { color: "#fff", fontWeight: "bold" },
  featuredSpaces: { padding: 20 },
  spaceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  spaceImage: { width: "100%", height: 100, borderRadius: 10 },
  spaceName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  spaceCategory: { fontSize: 14, color: "#888" },
  ratingContainer: { flexDirection: "row", marginTop: 5 },
  announcements: { padding: 20 },
  announcementCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  announcementText: { fontSize: 14, color: "#555" },
});

export default HomeScreen;
