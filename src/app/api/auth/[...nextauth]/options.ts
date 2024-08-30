import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
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
        const datastore = {
          id: 302,
          name: "somto",
          password: "password",
        };

        if (
          credentials?.password === datastore.password &&
          credentials?.username === datastore.name
        ) {
          return datastore;
        }

        return null;
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
};
