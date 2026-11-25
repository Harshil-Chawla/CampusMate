import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";

// Placeholder data for UI — will be replaced with state + AsyncStorage in Day 2
const SAMPLE_TASKS = [
  { id: "1", title: "Complete React Native assignment", completed: false, dueDate: "Today" },
  { id: "2", title: "Review lecture notes", completed: true, dueDate: "Today" },
  { id: "3", title: "Submit lab report", completed: false, dueDate: "Tomorrow" },
  { id: "4", title: "Group project meeting", completed: false, dueDate: "Wed" },
];

export default function TasksScreen() {
  const completedCount = SAMPLE_TASKS.filter((t) => t.completed).length;
  const totalCount = SAMPLE_TASKS.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Tasks" subtitle={`${completedCount}/${totalCount} completed`} />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>

      {/* Add Task Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="+ Add New Task"
          onPress={() => {}}
          variant="primary"
        />
      </View>

      {/* Task List */}
      <FlatList
        data={SAMPLE_TASKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            completed={item.completed}
            dueDate={item.dueDate}
            onToggle={() => {}}
            onDelete={() => {}}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubtext}>Tap the button above to add your first task.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function TaskCard({
  title,
  completed,
  dueDate,
  onToggle,
  onDelete,
}: {
  title: string;
  completed: boolean;
  dueDate: string;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={[styles.taskCard, completed && styles.taskCardCompleted]}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{completed ? "☑️" : "⬜"}</Text>
      </TouchableOpacity>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, completed && styles.taskTitleCompleted]}>
          {title}
        </Text>
        <Text style={styles.taskDue}>📅 {dueDate}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteBtnText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.light.border,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.success,
    borderRadius: BorderRadius.sm,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.success,
    minWidth: 40,
    textAlign: "right",
  },
  buttonContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  taskCard: {
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
  taskCardCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: Spacing.sm,
  },
  checkboxText: {
    fontSize: 22,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: Colors.light.textSecondary,
  },
  taskDue: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    padding: Spacing.xs,
  },
  deleteBtnText: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: "center",
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
    textAlign: "center",
  },
});
