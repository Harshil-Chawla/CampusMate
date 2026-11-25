import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

interface TaskCardProps {
  title: string;
  completed: boolean;
  dueDate?: string;
  onToggle: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

export default function TaskCard({
  title,
  completed,
  dueDate,
  onToggle,
  onDelete,
  onPress,
}: TaskCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, completed && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        <Text style={styles.checkboxIcon}>{completed ? "☑️" : "⬜"}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.titleCompleted]}>{title}</Text>
        {dueDate && <Text style={styles.dueDate}>📅 {dueDate}</Text>}
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  cardCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: Spacing.sm,
    padding: Spacing.xs,
  },
  checkboxIcon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: Colors.light.textSecondary,
  },
  dueDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  deleteIcon: {
    fontSize: 18,
  },
});
