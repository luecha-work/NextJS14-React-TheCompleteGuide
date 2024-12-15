import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), "src", "data/feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This is the feedback" });
  }
}

export default handler;
