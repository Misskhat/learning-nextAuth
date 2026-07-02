import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "../../../../lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // Sign in with {name} button
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "xyz@email.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // My own logic
        try {
          const { email, password } = credentials;

          const user = await dbConnect("user").findOne({ email });

          if (!user) return null;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            console.error({ message: "someting happen" });
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
      try {
        const payload = {
          ...user,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          createdAt: new Date(),
          role: "user",
        };
        const isExist = await dbConnect("user").findOne({ email: user.email });
        if (!isExist) {
          await dbConnect("user").insertOne(payload);
          return true;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }

      // return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
