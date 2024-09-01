import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
          const res = await fetch(`${baseUrl}/api/users/`, {
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let temp = user as User & { username?: string, _id?: string }
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
