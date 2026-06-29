import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { name: "hablu", password: "1234" },
  { name: "bablu", password: "5678" },
  { name: "dablu", password: "9012" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // Sign in with {name} button
      name: "Credentials",

      credentials: {
        // email: {
        //   label: "Email Id",
        //   type: "email",
        //   placeholder: "abc@email.com",
        // },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // My own logic
        const { username, password } = credentials;

        const user = userList.find((u) => u.name === username);

        if (!user) return null;

        const isPasswordCorrect = user.password === password;

        if (isPasswordCorrect) {
          return user;
        } else {
          console.error({ message: "someting happen" });
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
