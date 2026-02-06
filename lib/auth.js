import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function extractTokenFromRequest(req) {
  const token = req.cookies?.get?.("token")?.value || 
               req.headers?.get?.("authorization")?.split(" ")[1] ||
               req.cookies?.token;
  return token;
}

export function verifyAuth(req) {
  const token = extractTokenFromRequest(req);
  if (!token) {
    return null;
  }
  return verifyToken(token);
}
