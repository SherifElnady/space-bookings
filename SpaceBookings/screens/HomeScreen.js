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
      <View style={styles.heroBanner}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.firstName} {user?.lastName}!
        </Text>
        <Text style={styles.subText}>
          Find your perfect coworking space in England.
        </Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for workspaces..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <FlatList
            data={filteredSpaces.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.searchResultCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultCategory}>{item.category}</Text>
                  <Text style={styles.resultLocation}>{item.location}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.searchOptions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Booking", { category: "Desk" })}
        >
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/11/29/03/53/desk-1867761_1280.jpg",
            }}
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Desk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("Booking", { category: "Meeting Room" })
          }
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
            }}
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Meeting Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("Booking", { category: "Private Office" })
          }
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
            }}
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Private Office</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredSpaces}>
        <Text style={styles.sectionTitle}>Featured Spaces</Text>
        <FlatList
          data={featuredSpaces}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.spaceCard}>
              <Image source={{ uri: item.image }} style={styles.spaceImage} />
              <Text style={styles.spaceName}>{item.name}</Text>
              <Text style={styles.spaceCategory}>{item.category}</Text>
              <Text style={styles.spaceLocation}>{item.location}</Text>
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
    paddingTop: 60, // for iPhone notch
  },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subText: { fontSize: 16, color: "#fff", marginTop: 5 },
  searchBar: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchResultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultImage: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  resultTextContainer: { flex: 1 },
  resultName: { fontSize: 16, fontWeight: "bold" },
  resultCategory: { fontSize: 14, color: "#888" },
  searchOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  iconButton: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  iconImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  featuredSpaces: { padding: 20 },
  spaceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  spaceImage: { width: "100%", height: 100, borderRadius: 10 },
  spaceName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  spaceCategory: { fontSize: 14, color: "#888" },
  spaceLocation: { fontSize: 14, color: "#007BFF" },
  ratingContainer: { flexDirection: "row", marginTop: 5 },
});

export default HomeScreen;
