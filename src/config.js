import "dotenv/config";

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;

// SMTP Settings
export const SMTP_EMAIL = process.env.SMTP_EMAIL;
export const SMTP_EMAIL_PASSWORD = process.env.SMTP_EMAIL_PASSWORD;