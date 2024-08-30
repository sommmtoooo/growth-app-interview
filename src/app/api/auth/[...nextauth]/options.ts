import dbConnection from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "sommmtoooo",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
          const res = await fetch(`${baseUrl}/api/users/sign-in`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const { user } = await res.json();

          if (res.ok && user) {
            return user;
          }


          return null;
        } catch (err) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
};
