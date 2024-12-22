import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await new MongoClient("mongodb://localhost:27017");
  //   await client.connect();

  //   return client.db("local");

  return client;
};
