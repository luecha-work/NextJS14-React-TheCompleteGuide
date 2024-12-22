import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
  }

  const client = await connectToDatabase();
  const db = client.db("local");

  try {
    const hashedPassword = await hashPassword(password);

    await db.collection("users").insertOne({ email, hashedPassword });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`Error creating user: ${error}`);

    return res.status(500).json({ message: "Could not create user" });
  } finally {
    await client.close();
  }
}

export default handler;
