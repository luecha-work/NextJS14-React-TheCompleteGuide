import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Message {
  email: string;
  name: string;
  message: string;
  id?: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage: Message = {
      email,
      name,
      message,
    };

    let client: MongoClient;
    try {
      client = await MongoClient.connect(process.env.MONGODB_URI as string);
    } catch (error) {
      console.error("Connection error:", error);
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db(process.env.MONGODB_DB as string);

    try {
      const result = await db
        .collection(process.env.MONGODB_COLLECTION as string)
        .insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (error) {
      console.error("Insert error:", error);
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    console.log(`Stored message with id: ${JSON.stringify(newMessage)}`);
    client.close();
    res.status(201).json({ message: "Successfully stored message!" });
  }
}

export default handler;
