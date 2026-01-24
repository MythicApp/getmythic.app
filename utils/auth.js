import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-SET-A-PROPER-SECRET-KEY-BEFORE-USE';

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getUserFromToken(token) {
  const decoded = verifyToken(token);
  return decoded;
}