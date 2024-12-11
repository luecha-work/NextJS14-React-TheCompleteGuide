"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(
  prevState: any,
  formData: FormData
): Promise<{ errors: SignupErrors }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: SignupErrors = {};

  if (!email.includes("@") || !email.includes(".")) {
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
    await createAuthSession(userId);
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

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser: User | null = await getUserByEmail(email);

  let errors: SignupErrors = {};

  if (!existingUser) {
    errors.email =
      "Could not authenticate user, Please check your credentials.";
    return { errors: errors };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    errors.password =
      "Could not authenticate user, Please check your credentials.";
    return { errors: errors };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(
  mode: string,
  prevState: any,
  formData: FormData
): Promise<{ errors: SignupErrors } | undefined> {
  if (mode === "login") {
    return login(prevState, formData);
  } else {
    return signup(prevState, formData);
  }
}
