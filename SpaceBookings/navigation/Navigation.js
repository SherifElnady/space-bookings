import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WorkSpace from "../screens/WorkSpace";
import AdminPanel from "../screens/AdminPanel";
import DateTimePickerScreen from "../screens/DateTimePickerScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom tab navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Booking":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "MyBookings":
              iconName = focused ? "bookmark" : "bookmark-outline";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
            case "Admin":
              iconName = focused ? "construct" : "construct-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Admin" component={AdminPanel} />
    </Tab.Navigator>
  );
}

// App navigation
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="WorkSpace" component={WorkSpace} />
        <Stack.Screen name="DateTimePicker" component={DateTimePickerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
