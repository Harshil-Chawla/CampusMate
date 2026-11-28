import { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import Header from "@/components/Header";
import { getTasks, getNotes, Task, Note } from "@/services/storage";

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const [loadedTasks, loadedNotes] = await Promise.all([
          getTasks(),
          getNotes(),
        ]);
        setTasks(loadedTasks);
        setNotes(loadedNotes);
      })();
    }, [])
  );

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const todayTasks = tasks.filter((t) => t.dueDate === "Today" && !t.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header title="CampusMate" subtitle="Your campus companion" />

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good {getGreeting()}! 👋</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>

        {/* Quick Stats — now live */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Tasks"
            value={String(tasks.length)}
            color={Colors.light.primary}
            emoji="📋"
          />
          <StatCard
            title="Completed"
            value={String(completedCount)}
            color={Colors.light.success}
            emoji="✅"
          />
          <StatCard
            title="Notes"
            value={String(notes.length)}
            color={Colors.light.accent}
            emoji="📝"
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <ActionCard
            title="Add Task"
            emoji="➕"
            color={Colors.light.primary}
            onPress={() => router.push("/tasks")}
          />
          <ActionCard
            title="New Note"
            emoji="📄"
            color={Colors.light.accent}
            onPress={() => router.push("/notes")}
          />
          <ActionCard
            title="My Profile"
            emoji="👤"
            color={Colors.light.success}
            onPress={() => router.push("/profile")}
          />
        </View>

        {/* Today's Tasks — now live */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <View key={task.id} style={styles.todayTaskCard}>
              <Text style={styles.todayTaskEmoji}>⬜</Text>
              <Text style={styles.todayTaskTitle}>{task.title}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>
              {tasks.length === 0 ? "No tasks yet" : "All caught up for today!"}
            </Text>
            <Text style={styles.emptySubtext}>
              {tasks.length === 0
                ? 'Go to Tasks to add your first one!'
                : "Great job completing your tasks!"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function StatCard({
  title,
  value,
  color,
  emoji,
}: {
  title: string;
  value: string;
  color: string;
  emoji: string;
}) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ActionCard({
  title,
  emoji,
  color,
  onPress,
}: {
  title: string;
  emoji: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor: color + "15" }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.actionEmoji}>{emoji}</Text>
      <Text style={[styles.actionTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
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
  greetingContainer: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  date: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  statsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  statTitle: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  todayTaskCard: {
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
  todayTaskEmoji: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  todayTaskTitle: {
    fontSize: 15,
    color: Colors.light.text,
    fontWeight: "500",
    flex: 1,
  },
  emptyState: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
});
