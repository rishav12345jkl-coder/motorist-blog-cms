import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = '7d';
const COOKIE_NAME = '__motorist_admin_token';

function getJwtSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_SECRET is required in production environment');
    }
    // Fallback for local testing only
    return new TextEncoder().encode('motorist_dev_fallback_secret_32_characters_long');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Hash a plain text password with high-cost salt rounds
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

/**
 * Verify a plain text password against a bcrypt hash
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Sign an encrypted JWT session token
 */
export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);
}

/**
 * Verify and decode an encrypted JWT session token
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };

/**
 * Retrieve and verify the current admin session from Next.js cookies
 */
export async function getCurrentUserSession(): Promise<AdminSessionPayload | null> {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

