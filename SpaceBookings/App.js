import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/Navigation"; // ✅ Corrected path
import { UserProvider } from "./context/UserContext"; // ✅ Context is fine

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
