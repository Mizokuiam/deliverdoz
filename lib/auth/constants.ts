export const AUTH_ERRORS = {
  FETCH_ERROR: "Failed to fetch authentication data",
  SESSION_ERROR: "Failed to fetch session",
  INVALID_CREDENTIALS: "Invalid credentials",
  SERVER_ERROR: "Internal authentication error",
} as const;

export const SESSION_CONFIG = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
} as const;