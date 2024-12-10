"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(
  prevState: any,
  formData: FormData
): Promise<{ errors: SignupErrors }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: SignupErrors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const userId = createUser(email, hashedPassword);

    createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if ((error as any).code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email =
        "It seems link an account for the chosen email already exists.";

      return { errors: errors };
    }
    throw error;
  }
}
