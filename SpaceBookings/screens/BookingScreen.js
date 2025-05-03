import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { featuredSpaces } from "../data/spaces";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialCategory = route?.params?.category || null;

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    initialCategory ? [initialCategory] : []
  );

  useEffect(() => {
    if (initialCategory) {
      setSelectedFilters([initialCategory]);
    }
  }, [initialCategory]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredWorkspaces = featuredSpaces.filter((workspace) =>
    selectedFilters.length > 0
      ? selectedFilters.includes(workspace.category)
      : true
  );

  const renderWorkspace = ({ item }) => (
    <TouchableOpacity
      style={styles.workspaceContainer}
      onPress={() => navigation.navigate("WorkSpace", { space: item })}
    >
      <Image source={{ uri: item.image }} style={styles.workspaceImage} />
      <View style={styles.workspaceInfo}>
        <Text style={styles.workspaceName}>{item.name}</Text>
        <Text style={styles.workspaceCategory}>{item.category}</Text>
        <Text style={styles.workspaceLocation}>{item.location}</Text>
        <Text style={styles.workspaceRating}>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="filter-list" size={20} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

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

      <FlatList
        data={filteredWorkspaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkspace}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  filterContainer: { marginBottom: 16, alignItems: "flex-end" },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  filterText: { color: "#fff", marginLeft: 8 },
  workspaceContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  workspaceImage: { width: 100, height: 100 },
  workspaceInfo: { flex: 1, padding: 8 },
  workspaceName: { fontSize: 16, fontWeight: "bold" },
  workspaceCategory: { fontSize: 14, color: "#666" },
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
