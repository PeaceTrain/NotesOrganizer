import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@inkforge/db/src";

const JWT_SECRET = process.env.JWT_SECRET ?? "inkforge-dev-secret";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "12h" });
}
