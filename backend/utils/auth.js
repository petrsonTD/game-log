import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const KEY = "supersecret";

export function createJSONToken(email) {
  return jsonwebtoken.sign({ email }, KEY, { expiresIn: '1h' });
}

export function validateJSONToken(token) {
  return jsonwebtoken.verify(token, KEY);
}

export function isValidPassword(password, storedPassword) {
  return bcryptjs.compare(password, storedPassword);
}
