/**
 * CampusMate Theme Configuration
 * Colors, spacing, and typography constants for the app.
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1a1a2e",
    textSecondary: "#6b7280",
    background: "#f8f9fa",
    card: "#ffffff",
    primary: "#4f46e5",
    primaryLight: "#e0e7ff",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "#e5e7eb",
    tabBar: "#ffffff",
    tabBarInactive: "#9ca3af",
  },
  dark: {
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    background: "#0f172a",
    card: "#1e293b",
    primary: "#818cf8",
    primaryLight: "#312e81",
    accent: "#22d3ee",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    border: "#334155",
    tabBar: "#1e293b",
    tabBarInactive: "#64748b",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "System",
    mono: "Menlo",
  },
  default: {
    sans: "normal",
    mono: "monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
