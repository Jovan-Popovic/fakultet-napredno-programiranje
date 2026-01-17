import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// Light theme
const lightTheme = create({
  base: "light",

  // Colors - blue primary matching main app
  colorPrimary: "#2563eb", // blue-600
  colorSecondary: "#3b82f6", // blue-500

  // UI - clean whites with blue accents
  appBg: "#f8fafc", // slate-50
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e2e8f0", // slate-200
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // Text - crisp contrast
  textColor: "#0f172a", // slate-900
  textInverseColor: "#ffffff",
  textMutedColor: "#64748b", // slate-500

  // Toolbar - blue theme
  barTextColor: "#1e293b", // slate-800
  barSelectedColor: "#2563eb", // blue-600
  barHoverColor: "#3b82f6", // blue-500
  barBg: "#f1f5f9", // slate-100

  // Form
  inputBg: "#ffffff",
  inputBorder: "#cbd5e1", // slate-300
  inputTextColor: "#0f172a", // slate-900
  inputBorderRadius: 6,

  // Note: Sidebar colors are controlled by base theme
});

// Dark theme
const darkTheme = create({
  base: "dark",

  // Colors - matching app's blue theme
  colorPrimary: "#3b82f6", // blue-500
  colorSecondary: "#60a5fa", // blue-400

  // UI - using custom dark blue background
  appBg: "oklch(0.163 0.031 252.17)", // --custom-dark-blue
  appContentBg: "#1e293b", // slate-800
  appPreviewBg: "#1e293b", // slate-800
  appBorderColor: "#334155", // slate-700
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // Text - crisp contrast on dark
  textColor: "#f8fafc", // slate-50
  textInverseColor: "#0f172a", // slate-900
  textMutedColor: "#94a3b8", // slate-400

  // Toolbar - blue theme on dark
  barTextColor: "#cbd5e1", // slate-300
  barSelectedColor: "#3b82f6", // blue-500
  barHoverColor: "#60a5fa", // blue-400
  barBg: "#1e293b", // slate-800

  // Form
  inputBg: "#334155", // slate-700
  inputBorder: "#475569", // slate-600
  inputTextColor: "#f8fafc", // slate-50
  inputBorderRadius: 6,

  // Note: Sidebar colors are controlled by base theme
});

// Set theme based on user's browser preference
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
  enableShortcuts: true,
  showPanel: true,
  panelPosition: "bottom",
  selectedPanel: "controls",
  initialActive: "welcome--home",
});
