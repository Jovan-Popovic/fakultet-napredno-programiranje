/**
 * Configuration for the sidebar component.
 */
export type SidebarConfigRecord = {
  cookieName: string;
  cookieMaxAge: number;
  width: string;
  widthMobile: string;
  widthIcon: string;
  keyboardShortcut: string;
};

export const SIDEBAR_CONFIG: SidebarConfigRecord = {
  cookieName: "sidebar_state",
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
  width: "16rem",
  widthMobile: "18rem",
  widthIcon: "3rem",
  keyboardShortcut: "b",
};
