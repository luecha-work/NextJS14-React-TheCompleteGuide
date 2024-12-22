import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        const client = await connectToDatabase();

        try {
          const usersCollection = client.db("local").collection("users");

          const user = await usersCollection.findOne({ email });

          if (!user) {
            client.close();
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(password, user.hashedPassword);

          if (!isValid) {
            client.close();
            throw new Error("Invalid password!");
          }

          client.close();

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log(`Error authorizing user: ${error}`);

          client.close();
          throw new Error("Authentication failed!");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  //   secret: process.env.NEXT_PUBLIC_SECRET,
});
