import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

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
    // ✅ If it's Sherif shortcut, bypass everything
    if (email.trim() === "Sherif" && password === "1234") {
      navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
      return;
    }

    if (isSigningUp) {
      // ✅ Normal Signup
      if (!firstName || !lastName || !email || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      setUser({ firstName, lastName, email, password });
      clearFields();
      navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
    } else {
      // ✅ Normal Login
      if (!user) {
        Alert.alert("Error", "No account found. Please sign up first.");
        return;
      }
      if (email === user.email && password === user.password) {
        clearFields();
        navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSigningUp ? "Sign Up" : "Login"}</Text>

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

      <Button
        title={isSigningUp ? "Sign Up" : "Login"}
        onPress={handleAuth}
        color="#4A90E2"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Button
          title={isSigningUp ? "Log In" : "Sign Up"}
          onPress={() => {
            setIsSigningUp(!isSigningUp);
            clearFields();
          }}
          color="#666"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
});

export default LoginScreen;
