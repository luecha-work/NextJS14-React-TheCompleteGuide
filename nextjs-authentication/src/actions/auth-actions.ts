"use server";

import { createUser } from "@/lib/user";

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

  createUser(email, password);

  // Return an empty errors object if there are no errors
  return { errors: {} };
}
