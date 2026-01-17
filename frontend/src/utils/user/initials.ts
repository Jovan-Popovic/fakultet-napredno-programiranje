/**
 * Generate user initials from first and last name
 */
export const generateUserInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return "";

  const firstInitial = firstName?.[0]?.toUpperCase() || "";
  const lastInitial = lastName?.[0]?.toUpperCase() || "";

  return `${firstInitial}${lastInitial}`;
};
