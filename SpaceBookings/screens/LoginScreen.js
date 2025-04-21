import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleAuth = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSigningUp ? "Sign Up" : "Login"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isSigningUp ? "Sign Up" : "Login"} onPress={handleAuth} />

      <Button
        title={
          isSigningUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"
        }
        onPress={() => setIsSigningUp(!isSigningUp)}
        color="#666"
      />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default LoginScreen;
