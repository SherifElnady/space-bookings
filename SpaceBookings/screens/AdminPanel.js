import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../context/UserContext";

const AdminPanel = () => {
  const { ownedSpaces, addOwnedSpace, removeOwnedSpace } =
    useContext(UserContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!name || !category || !location || !rating || !image) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      Alert.alert("Invalid Rating", "Rating must be a number between 1 and 5.");
      return;
    }

    const newSpace = {
      id: Date.now().toString(),
      name,
      category,
      location,
      rating: parseFloat(rating),
      image,
    };

    addOwnedSpace(newSpace);
    setName("");
    setCategory("");
    setLocation("");
    setRating("");
    setImage("");
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Space", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeOwnedSpace(id),
      },
    ]);
  };

  const renderSpaceItem = ({ item }) => (
    <View style={styles.spaceCard}>
      <Image source={{ uri: item.image }} style={styles.spaceImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.spaceTitle}>{item.name}</Text>
        <Text style={styles.spaceDetail}>Category: {item.category}</Text>
        <Text style={styles.spaceDetail}>Location: {item.location}</Text>
        <Text style={styles.spaceDetail}>Rating: {item.rating}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Admin Panel</Text>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Add Coworking Space</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Category (Desk, Meeting Room, etc.)"
              value={category}
              onChangeText={setCategory}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating (1-5)"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={image}
              onChangeText={setImage}
            />

            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ) : null}

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add Space</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>My Spaces</Text>
          {ownedSpaces.length > 0 ? (
            <FlatList
              data={ownedSpaces}
              keyExtractor={(item) => item.id}
              renderItem={renderSpaceItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text style={styles.emptyText}>
              You haven’t added any spaces yet.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f8f8" },
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  formSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  spaceCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  spaceImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  spaceTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  spaceDetail: { fontSize: 14, color: "#555" },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default AdminPanel;
