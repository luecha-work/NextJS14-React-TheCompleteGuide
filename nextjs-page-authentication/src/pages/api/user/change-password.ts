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
}

export default changePassword;
