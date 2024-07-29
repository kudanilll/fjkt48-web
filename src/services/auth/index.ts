import NextAuth, { NextAuthConfig, User } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcrypt";
import clientPromise from "@/lib/mongodb/client";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          return null;
        }

        const pass = credentials.password as string;
        const isPasswordValid = compare(pass, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
