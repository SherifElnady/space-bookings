import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";

// Mock data for featuredSpaces (replace this with the actual import from HomeScreen)
const featuredSpaces = [
  {
    id: 1,
    name: "Modern Desk",
    category: "Desk",
    location: "New York",
    rating: 4.5,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Private Office",
    category: "Private Office",
    location: "San Francisco",
    rating: 4.8,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Coworking Space",
    category: "Coworking",
    location: "Los Angeles",
    rating: 4.2,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Meeting Room",
    category: "Meeting Room",
    location: "Chicago",
    rating: 4.7,
    image: "https://via.placeholder.com/100",
  },
];

const BookingScreen = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  // Filter workspaces based on selected filters
  const filteredWorkspaces = featuredSpaces.filter((workspace) =>
    selectedFilters.length > 0
      ? selectedFilters.includes(workspace.category)
      : true
  );

  const renderWorkspace = ({ item }) => (
    <View style={styles.workspaceContainer}>
      <Image source={{ uri: item.image }} style={styles.workspaceImage} />
      <View style={styles.workspaceInfo}>
        <Text style={styles.workspaceName}>{item.name}</Text>
        <Text style={styles.workspaceCategory}>{item.category}</Text>
        <Text style={styles.workspaceLocation}>{item.location}</Text>
        <Text style={styles.workspaceRating}>Rating: {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Button */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="filter-list" size={20} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filters</Text>
            {["Desk", "Meeting Room", "Private Office", "Coworking"].map(
              (filter) => (
                <View key={filter} style={styles.filterOption}>
                  <CheckBox
                    value={selectedFilters.includes(filter)}
                    onValueChange={() => toggleFilter(filter)}
                  />
                  <Text style={styles.filterLabel}>{filter}</Text>
                </View>
              )
            )}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filtered Workspaces */}
      <FlatList
        data={filteredWorkspaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkspace}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  filterContainer: {
    marginBottom: 16,
    alignItems: "flex-end",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    color: "#fff",
    marginLeft: 8,
  },
  workspaceContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  workspaceImage: {
    width: 100,
    height: 100,
  },
  workspaceInfo: {
    flex: 1,
    padding: 8,
  },
  workspaceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  workspaceCategory: {
    fontSize: 14,
    color: "#666",
  },
  workspaceLocation: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 4,
  },
  workspaceRating: {
    fontSize: 14,
    color: "#28a745",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  filterLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BookingScreen;
