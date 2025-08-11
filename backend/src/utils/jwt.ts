import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '1d';

/**
 * Generates a JWT token for a user
 * @param userId - User ID to include in the token
 * @returns string - JWT token
 */
export function generateToken(userId: number): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return jwt.sign({ id: userId }, secret, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JWT token and returns the payload
 * @param token - JWT token to verify
 * @returns object - Decoded token payload
 */
export function verifyToken(token: string): { id: number } {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return jwt.verify(token, secret) as { id: number };
}
