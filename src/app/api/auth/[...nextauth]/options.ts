import dbConnection from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPayload } from "@/utils";
import type { NextAuthOptions, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
        const { username, password } = credentials

        try {

          await dbConnection()
          const existingUser = await User.findOne({ username });
          const validate_password = await verifyPayload(existingUser.password, password)

          if (!existingUser) {
            return null
          }

          if (!validate_password) {
            return null
          }

          return existingUser

        } catch (err) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let temp = user as AuthUser & { username?: string, _id?: string }
        token.username = temp.username
        token.id = temp._id
      }
      return token
    },
    async session({ session, token, user }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string
          session.user.username = token.username as string
        }
      }

      return session
    }
  }
};
