import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleAuth = () => {
    if (email.trim() === "Sherif" && password === "1234") {
      setUser({ firstName: "Sherif", lastName: "Elnady", email });
      return;
    }

    if (isSigningUp) {
      if (!firstName || !lastName || !email || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      setUser({ firstName, lastName, email, password });
    } else {
      if (!user) {
        Alert.alert("Error", "No account found. Please sign up first.");
        return;
      }
      if (email === user.email && password === user.password) {
        clearFields();
        setUser(user);
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    }
  };

  const handleGuestAccess = () => {
    setUser({ firstName: "Guest", lastName: "", email: "guest@demo.com" });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>
          {isSigningUp ? "Create Account" : "Welcome Back"}
        </Text>

        {isSigningUp && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authText}>
            {isSigningUp ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSigningUp
              ? "Already have an account?"
              : "Don't have an account?"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsSigningUp(!isSigningUp);
              clearFields();
            }}
          >
            <Text style={styles.switchLink}>
              {isSigningUp ? "Log In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={handleGuestAccess}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  authButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  authText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 15,
    color: "#555",
  },
  switchLink: {
    marginTop: 6,
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "600",
  },
  guestButton: {
    marginTop: 40,
    alignItems: "center",
  },
  guestText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
