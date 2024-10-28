import NextAuth, { NextAuthConfig } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { client, clientPromise } from "@/lib/mongodb/client";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthConfig = {
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const client = await clientPromise;
          const usersCollection = client.db("auth").collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });
          if (!user) return null;

          const pass = credentials.password as string;
          const isPasswordValid = compare(pass, user.password);
          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("error connecting to database: " + error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
