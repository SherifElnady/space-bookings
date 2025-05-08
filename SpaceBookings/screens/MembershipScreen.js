import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const plans = [
  {
    name: "Basic",
    monthly: 9.99,
    yearly: 99.99,
    features: ["Hot Desk Access", "1 Booking/Day"],
    color: "#d1e7dd",
  },
  {
    name: "Pro",
    monthly: 19.99,
    yearly: 179.99,
    features: ["Hot Desk", "Meeting Rooms", "Priority Support"],
    color: "#cff4fc",
  },
  {
    name: "Premium",
    monthly: 29.99,
    yearly: 249.99,
    features: [
      "Hot Desk",
      "Meeting Rooms",
      "Priority Support",
      "Private Office Access",
    ],
    color: "#fce5cd",
  },
];

export default function MembershipScreen() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSubscribe = () => {
    if (!selectedPlan) return Alert.alert("Please select a plan");
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() =>
      Alert.alert("Subscribed", `You're subscribed to ${selectedPlan}!`)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upgrade Your Experience</Text>

        {/* Billing Switcher */}
        <TouchableOpacity
          style={styles.billingToggle}
          onPress={() =>
            setBillingCycle((prev) =>
              prev === "monthly" ? "yearly" : "monthly"
            )
          }
        >
          <Text style={styles.billingText}>
            Billing: {billingCycle.toUpperCase()} (tap to switch)
          </Text>
        </TouchableOpacity>

        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.name}
            style={[
              styles.card,
              { backgroundColor: plan.color },
              selectedPlan === plan.name && styles.selectedCard,
            ]}
            onPress={() => setSelectedPlan(plan.name)}
          >
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planPrice}>
              £{billingCycle === "monthly" ? plan.monthly : plan.yearly} /{" "}
              {billingCycle}
            </Text>

            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color="#28a745" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeText}>Confirm Subscription</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <MaterialIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.toastText}>
            Success! Added membership to your profile.
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 60 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  billingToggle: {
    backgroundColor: "#efefef",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  billingText: { color: "#007BFF", fontWeight: "600" },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: { borderColor: "#007BFF" },
  planName: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  planPrice: { fontSize: 16, color: "#007BFF", marginBottom: 10 },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  featureText: { fontSize: 14, color: "#333" },
  subscribeButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  subscribeText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    gap: 8,
    alignSelf: "center",
  },
  toastText: { color: "#fff" },
});
