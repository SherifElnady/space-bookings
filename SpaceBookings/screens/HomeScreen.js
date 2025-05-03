import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { featuredSpaces } from "../data/spaces";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const filteredSpaces = featuredSpaces.filter((space) =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text style={styles.welcome}>
          Welcome, {user?.firstName} {user?.lastName} 👋
        </Text>
        <Text style={styles.subtitle}>
          Book desks, offices or meeting rooms anywhere in England.
        </Text>
        <TextInput
          style={styles.searchBox}
          placeholder="🔍 Search workspaces..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Search Results Dropdown */}
      {searchQuery.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredSpaces.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultCard}
                onPress={() =>
                  navigation.navigate("WorkSpace", { space: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultText}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultSub}>
                    {item.category} · {item.location}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Quick Book Categories */}
      <Text style={styles.sectionLabel}>Quick Book</Text>
      <View style={styles.categories}>
        {[
          {
            label: "Desk",
            uri: "https://images.unsplash.com/photo-1593642634367-d91a135587b5", // ✅ new matching image
          },
          {
            label: "Meeting Room",
            uri: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
          },
          {
            label: "Private Office",
            uri: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
          },
        ].map((option) => (
          <TouchableOpacity
            key={option.label}
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate("Booking", { category: option.label })
            }
          >
            <Image source={{ uri: option.uri }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured Spaces */}
      <Text style={styles.sectionLabel}>Featured Spaces</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={featuredSpaces}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.featuredList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => navigation.navigate("WorkSpace", { space: item })}
          >
            <Image source={{ uri: item.image }} style={styles.featuredImage} />
            <Text style={styles.featuredName}>{item.name}</Text>
            <Text style={styles.featuredSub}>
              {item.category} · {item.location}
            </Text>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }, (_, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={14}
                  color={i < Math.floor(item.rating) ? "#FFD700" : "#ccc"}
                />
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  banner: {
    backgroundColor: "#3A7BD5",
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcome: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: { color: "#e6e6e6", fontSize: 14, marginBottom: 15 },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  dropdown: { backgroundColor: "#fff", paddingHorizontal: 20 },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  resultImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  resultText: { flex: 1 },
  resultName: { fontWeight: "600", fontSize: 15 },
  resultSub: { fontSize: 13, color: "#888" },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  categoryCard: { alignItems: "center", flex: 1, marginHorizontal: 5 },
  categoryImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  featuredList: { paddingHorizontal: 20 },
  featuredCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginRight: 15,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  featuredImage: { width: "100%", height: 100, borderRadius: 10 },
  featuredName: { fontSize: 16, fontWeight: "bold", marginTop: 6 },
  featuredSub: { fontSize: 13, color: "#777" },
  ratingRow: { flexDirection: "row", marginTop: 4 },
});

export default HomeScreen;
