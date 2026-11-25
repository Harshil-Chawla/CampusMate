import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack } from "expo-router";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen options={{ title: `Task #${id}`, headerShown: true }} />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.label}>Task ID</Text>
            <Text style={styles.value}>{id}</Text>
          </View>
          <Text style={styles.placeholder}>
            Task details will be available after Day 2 when CRUD and AsyncStorage are implemented.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  placeholder: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: Spacing.lg,
    lineHeight: 20,
  },
});
