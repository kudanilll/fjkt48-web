import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb/client";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";

const options: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = {
          name: "Achmad Daniel Syahputra",
          email: "achmad24daniel@gmail.com",
        };
        if (email === "achmad24daniel@gmail.com" && password === "12345678") {
          return user;
        }
        // const user: any = null;
        // if (user) {
        //   const passwordConfirm = await bcrypt.compare(password, user.password);
        //   if (passwordConfirm) return user;
        // }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider == "credentials") {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) session.user.email = token.email;
      if ("fullname" in token) session.user.fullname = token.fullname;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
