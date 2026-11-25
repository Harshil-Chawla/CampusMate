import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import Header from "@/components/Header";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" subtitle="Your account" />

      <View style={styles.container}>
        {/* Avatar Placeholder */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.name}>Student</Text>
          <Text style={styles.email}>student@campus.edu</Text>
        </View>

        {/* Info Cards — will be functional on Day 3 (camera, location) */}
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>📸</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Profile Picture</Text>
            <Text style={styles.infoSubtext}>Tap to upload from camera or gallery</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>📍</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.infoSubtext}>Enable to show your campus location</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>🔔</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Notifications</Text>
            <Text style={styles.infoSubtext}>Manage task reminders</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>⚙️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Settings</Text>
            <Text style={styles.infoSubtext}>Theme, preferences, and more</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  email: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  infoSubtext: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: Colors.light.textSecondary,
    fontWeight: "300",
  },
});
