import sql from "better-sqlite3";
import { unstable_cache as nextCache } from "next/cache";
import { cache } from "react";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message: string) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export const getMessages = nextCache(
  cache(async function getMessages() {
    console.log("Fetching messages from db");
    const messages = db.prepare("SELECT * FROM messages").all() as Message[];
    return messages;
  }),
  ["messages"],
  { tags: ["msg"] }
);
