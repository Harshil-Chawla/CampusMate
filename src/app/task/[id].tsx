import { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import CustomButton from "@/components/CustomButton";
import { Task, getTasks, toggleTask, deleteTask } from "@/services/storage";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const tasks = await getTasks();
        const found = tasks.find((t) => t.id === id);
        setTask(found ?? null);
      })();
    }, [id])
  );

  async function handleToggle() {
    if (!task) return;
    const updated = await toggleTask(task.id);
    const found = updated.find((t) => t.id === task.id);
    setTask(found ?? null);
  }

  async function handleDelete() {
    if (!task) return;
    await deleteTask(task.id);
    setTask(null);
  }

  function formatDate(isoString: string) {
    return new Date(isoString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <Stack.Screen options={{ title: task?.title ?? "Task Details", headerShown: true }} />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <ScrollView style={styles.container}>
          {task ? (
            <>
              <View style={styles.card}>
                <View style={styles.statusRow}>
                  <Text style={styles.statusEmoji}>
                    {task.completed ? "✅" : "⬜"}
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      { color: task.completed ? Colors.light.success : Colors.light.warning },
                    ]}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </Text>
                </View>
                <Text style={styles.taskTitle}>{task.title}</Text>
              </View>

              <View style={styles.infoCard}>
                <InfoRow label="Due Date" value={`📅 ${task.dueDate}`} />
                <InfoRow label="Created" value={formatDate(task.createdAt)} />
                <InfoRow label="ID" value={task.id} />
              </View>

              <View style={styles.actions}>
                <CustomButton
                  title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                  onPress={handleToggle}
                  variant="secondary"
                />
                <View style={{ height: Spacing.sm }} />
                <CustomButton
                  title="Delete Task"
                  onPress={handleDelete}
                  variant="danger"
                />
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>Task not found</Text>
              <Text style={styles.emptySubtext}>
                This task may have been deleted.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statusEmoji: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
  },
  infoCard: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  actions: {
    gap: Spacing.sm,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: Spacing.xxl * 2,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
});
