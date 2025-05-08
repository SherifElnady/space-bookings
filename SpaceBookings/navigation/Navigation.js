import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";

// Screens
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AdminPanel from "../screens/AdminPanel";
import WorkSpace from "../screens/WorkSpace";
import DateTimePickerScreen from "../screens/DateTimePickerScreen";
import BookingConfirmationScreen from "../screens/BookingConfirmationScreen";
import LoginScreen from "../screens/LoginScreen";
import MembershipScreen from "../screens/MembershipScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            case "Membership":
              iconName = focused ? "star" : "star-outline";
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
      <Tab.Screen name="Membership" component={MembershipScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Admin" component={AdminPanel} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="WorkSpace" component={WorkSpace} />
          <Stack.Screen
            name="DateTimePicker"
            component={DateTimePickerScreen}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmationScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
