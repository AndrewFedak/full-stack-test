import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise<boolean> - True if passwords match
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
