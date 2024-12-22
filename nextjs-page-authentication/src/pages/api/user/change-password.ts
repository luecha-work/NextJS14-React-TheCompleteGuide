import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function changePassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userEmail = session?.user?.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = await client.db("local").collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found" });
  }

  const currentPassword = user.password;

  const passwordsArequal = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsArequal) {
    client.close();
    return res.status(403).json({ message: "Invalid password" });
  }

  const hashedPassword = await hashPassword(newPassword);

  usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  return res.status(200).json({ message: "Password updated" });
}
export default changePassword;
