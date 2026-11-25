import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: CustomButtonProps) {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "danger" && styles.dangerButton,
    disabled && styles.disabledButton,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    variant === "primary" && styles.primaryText,
    variant === "secondary" && styles.secondaryText,
    variant === "danger" && styles.dangerText,
    disabled && styles.disabledText,
  ].filter(Boolean) as TextStyle[];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.primaryLight,
  },
  dangerButton: {
    backgroundColor: Colors.light.danger,
  },
  disabledButton: {
    backgroundColor: Colors.light.border,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: Colors.light.primary,
  },
  dangerText: {
    color: "#ffffff",
  },
  disabledText: {
    color: Colors.light.textSecondary,
  },
});
