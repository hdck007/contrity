/* eslint-disable no-param-reassign */
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
  secret: process.env.SECRET,
  callbacks: {
    async jwt({token , account, profile}) {
      if(profile){
        token.username = profile.login
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.username = token.username;
      return session
    }
  }
}

export default NextAuth(authOptions)