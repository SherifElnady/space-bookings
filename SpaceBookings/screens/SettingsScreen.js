import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext"; // ✅ Import User Context

// Screens
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login Screen</Text>
      <Button
        title="Login"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
          })
        }
      />
    </View>
  );
};

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home Screen</Text>
  </View>
);

const BookingScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Booking Screen</Text>
  </View>
);

const MyBookingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>My Bookings Screen</Text>
  </View>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext); // ✅ Access setUser from Context

  const handleLogout = () => {
    setUser(null); // ✅ Clears the user data (logs out)
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // ✅ Sends back to Login screen
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Booking" component={BookingScreen} />
    <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
