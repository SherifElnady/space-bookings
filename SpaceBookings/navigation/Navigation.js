import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

// Bottom tabs for main navigation
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Admin" component={AdminPanel} />
    </Tab.Navigator>
  );
}

// Full navigation including stack
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
