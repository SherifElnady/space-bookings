import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}
