import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here  
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      // }
      console.log(user, account);
      return token;
    },
    async session(session, token) {
      console.log("session", session, token);
      return session;
    },
  }
}

export default NextAuth(authOptions)