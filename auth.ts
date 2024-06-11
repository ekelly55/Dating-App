import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { prisma } from "./src/app/lib/prisma"
 
 
export const {
  auth,
  handlers: {GET, POST},
  // cant use signIn and signOut directly in login form b/c they're server sidej. so to use them we need export them from auth actions, which is a "use server" file
  signIn,
  signOut,
} = NextAuth({
  // Callbacks are asynchronous functions you can use to control what happens when an auth-related action is performed. Callbacks allow you to implement access controls without a database or to integrate with external databases or APIs.
  callbacks: {
    async session({token, session}){
      if(token.sub && session.user){
        //but why? wasn't this already true?
        session.user.id = token.sub
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})