import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

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
    Alert.alert("Confirm", "Delete this coworking space?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => removeOwnedSpace(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      {/* Form */}
      <TextInput
        placeholder="Workspace Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Category (Desk, Meeting Room...)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Coworking Space</Text>
      </TouchableOpacity>

      {/* List */}
      <FlatList
        data={ownedSpaces}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.spaceItem}>
            <Text style={styles.spaceName}>{item.name}</Text>
            <Text style={styles.spaceInfo}>
              {item.category} - {item.location}
            </Text>
            <Text style={styles.spaceInfo}>Rating: {item.rating}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 30, color: "#777", textAlign: "center" }}>
            No coworking spaces added yet.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  spaceItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  spaceName: { fontSize: 18, fontWeight: "bold" },
  spaceInfo: { color: "#555", marginTop: 4 },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
});

export default AdminPanel;
