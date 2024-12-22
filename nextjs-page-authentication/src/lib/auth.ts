import { compare, hash } from "bcryptjs";

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}
