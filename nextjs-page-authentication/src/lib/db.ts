import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await new MongoClient(
    "mongodb://admin:adminpassword@localhost:27017"
  );

  return client;
};
