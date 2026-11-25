import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import Header from "@/components/Header";

export default function HomeScreen() {
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header title="CampusMate" subtitle="Your campus companion" />

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good {getGreeting()}! 👋</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard title="Tasks" value="0" color={Colors.light.primary} emoji="📋" />
          <StatCard title="Completed" value="0" color={Colors.light.success} emoji="✅" />
          <StatCard title="Notes" value="0" color={Colors.light.accent} emoji="📝" />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <ActionCard title="Add Task" emoji="➕" color={Colors.light.primary} />
          <ActionCard title="New Note" emoji="📄" color={Colors.light.accent} />
          <ActionCard title="My Profile" emoji="👤" color={Colors.light.success} />
        </View>

        {/* Today's Tasks Placeholder */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎯</Text>
          <Text style={styles.emptyText}>No tasks for today</Text>
          <Text style={styles.emptySubtext}>Tap "Add Task" to get started!</Text>
        </View>
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
}: {
  title: string;
  emoji: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color + "15" }]}>
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
